import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_ABOUT_ME } from '../data/about-me-data.js';
import { fetchAboutMe, NO_PERMISSION, saveAboutMe } from '../lib/about-me-api.js';
import { supabase } from '../lib/supabase.js';
import { clampHomeSkillCount, normalizeAboutMe } from '../utils/normalize-about-me.js';
import { PortfolioActionsContext, PortfolioDataContext, PortfolioStatusContext } from './portfolio-contexts.js';

/** 서버에서 마지막으로 받은 내용 (다음 방문 때 기본값 대신 먼저 보여줘서 화면 깜빡임을 줄임) */
const CACHE_KEY = 'portfolio:about-me:cache';

/** 서버 저장 전, 이 브라우저에만 저장하던 시절의 키 (주인에게 서버로 옮길지 물어봐요) */
const LEGACY_KEY = 'portfolio:about-me';

/** 입력이 멈추고 이만큼(ms) 지나면 서버에 저장한다. (타자마다 요청하지 않도록) */
const SAVE_DELAY = 800;

const CONFIG_ERROR = 'Supabase 설정이 없어서 기본 내용을 보여주고 있어요. (편집 불가)';
const LOAD_ERROR = 'About Me 내용을 불러오지 못해서 임시 내용을 보여주고 있어요. 잠시 후 새로고침해 주세요.';

/** localStorage 는 막혀 있을 수 있어서(사생활 보호 모드 등) 항상 try 로 감싼다. */
function readStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? normalizeAboutMe(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch {
    // 캐시는 없어도 동작하니 무시
  }
}

/** Supabase 에러를 사용자용 문장으로 바꾼다. */
function toSaveErrorMessage(error) {
  if (error?.message === NO_PERMISSION) {
    return '편집 권한이 없는 계정이에요. 주인 계정으로 다시 로그인해 주세요.';
  }
  if (error?.code === '23514') {
    return '내용이 너무 커서 저장하지 못했어요. 사진을 더 작은 것으로 바꿔 주세요.';
  }
  return '서버에 저장하지 못했어요. 인터넷 연결을 확인해 주세요. (다음 수정 때 다시 시도해요)';
}

/**
 * PortfolioProvider 컴포넌트
 *
 * About Me 데이터(기본 정보·소개 섹션·스킬)를 앱 전체에 공유한다.
 * - 데이터는 Supabase(public.portfolio_about)에서 불러와 모든 방문자가 같은 내용을 본다.
 * - 주인 계정으로 로그인하면 About Me 탭에서 고친 내용이 서버에 자동 저장되고, 홈 탭에 바로 반영된다.
 *
 * Props:
 * @param {React.ReactNode} children - 데이터를 사용할 하위 컴포넌트 [Required]
 *
 * Example usage:
 * <PortfolioProvider><App /></PortfolioProvider>
 */
function PortfolioProvider({ children }) {
  /** 지난 방문 때 받아 둔 내용 (없으면 첫 방문이라 기본값을 임시로 보여줘요) */
  const [initialCache] = useState(() => readStorage(CACHE_KEY));
  const [aboutMeData, setAboutMeData] = useState(initialCache ?? DEFAULT_ABOUT_ME);
  const [isLoading, setIsLoading] = useState(Boolean(supabase));
  const [loadError, setLoadError] = useState(supabase ? '' : CONFIG_ERROR);
  const [saveStatus, setSaveStatus] = useState('idle');
  const [saveError, setSaveError] = useState('');
  const [ownerId, setOwnerId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [legacyData, setLegacyData] = useState(() => readStorage(LEGACY_KEY));

  /** 서버에 있는 내용(JSON). 이것과 다를 때만 저장한다. */
  const lastSavedJsonRef = useRef(null);
  /** 저장 요청을 한 줄로 세워서, 늦게 도착한 옛 요청이 새 내용을 덮어쓰지 않게 한다. */
  const saveQueueRef = useRef(Promise.resolve());

  const isOwner = Boolean(userId && ownerId && userId === ownerId);

  // 1) 처음 한 번 서버에서 불러온다.
  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    let isActive = true;
    fetchAboutMe()
      .then(({ ownerId: fetchedOwnerId, saved }) => {
        if (!isActive) return;
        const data = normalizeAboutMe(saved);
        lastSavedJsonRef.current = JSON.stringify(data);
        setAboutMeData(data);
        setOwnerId(fetchedOwnerId);
        writeStorage(CACHE_KEY, data);
      })
      .catch(() => {
        if (isActive) setLoadError(LOAD_ERROR);
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  // 2) 로그인 상태를 따라간다.
  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    supabase.auth.getSession().then(({ data }) => setUserId(data.session?.user.id ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 3) 주인이 내용을 바꾸면 잠시 기다렸다가 서버에 저장한다. (서버 내용과 같으면 건너뜀)
  useEffect(() => {
    if (!isOwner) {
      return undefined;
    }
    const json = JSON.stringify(aboutMeData);
    if (json === lastSavedJsonRef.current) {
      return undefined;
    }

    setSaveStatus('saving');
    const timer = setTimeout(() => {
      saveQueueRef.current = saveQueueRef.current.then(async () => {
        try {
          await saveAboutMe(aboutMeData);
          lastSavedJsonRef.current = json;
          writeStorage(CACHE_KEY, aboutMeData);
          setSaveError('');
          setSaveStatus('saved');
        } catch (error) {
          setSaveError(toSaveErrorMessage(error));
          setSaveStatus('error');
        }
      });
    }, SAVE_DELAY);

    return () => clearTimeout(timer);
  }, [aboutMeData, isOwner]);

  // 4) 저장 중에 창을 닫으려 하면 한 번 물어본다.
  useEffect(() => {
    if (saveStatus !== 'saving') {
      return undefined;
    }
    const handleBeforeUnload = (event) => event.preventDefault();
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [saveStatus]);

  const updateBasicInfo = useCallback((field, value) => {
    setAboutMeData((prev) => ({ ...prev, basicInfo: { ...prev.basicInfo, [field]: value } }));
  }, []);

  const updateSection = useCallback((id, patch) => {
    setAboutMeData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => (section.id === id ? { ...section, ...patch } : section)),
    }));
  }, []);

  const updateSkill = useCallback((id, patch) => {
    setAboutMeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, ...patch } : skill)),
    }));
  }, []);

  const addSkill = useCallback((skill) => {
    setAboutMeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { showInHome: true, ...skill, id: Date.now(), isCustom: true }],
    }));
  }, []);

  const removeSkill = useCallback((id) => {
    setAboutMeData((prev) => ({ ...prev, skills: prev.skills.filter((skill) => skill.id !== id) }));
  }, []);

  const updateHomeSkillCount = useCallback((count) => {
    setAboutMeData((prev) => ({ ...prev, homeSkillCount: clampHomeSkillCount(count) }));
  }, []);

  const resetAboutMe = useCallback(() => setAboutMeData(DEFAULT_ABOUT_ME), []);
  const dismissLoadError = useCallback(() => setLoadError(''), []);

  /** 이 브라우저에 남아 있던 예전 내용을 서버로 옮긴다. (저장은 3번 효과가 처리) */
  const importLegacyData = useCallback(() => {
    if (legacyData) {
      setAboutMeData(legacyData);
    }
    writeStorage(LEGACY_KEY, null);
    setLegacyData(null);
  }, [legacyData]);

  const discardLegacyData = useCallback(() => {
    writeStorage(LEGACY_KEY, null);
    setLegacyData(null);
  }, []);

  /**
   * 주인 계정 로그인. 실패하면 사용자용 문장을 돌려준다. (성공하면 '')
   * @param {string} email
   * @param {string} password
   */
  const signIn = useCallback(async (email, password) => {
    if (!supabase) return CONFIG_ERROR;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) return '';
    return error.message === 'Invalid login credentials'
      ? '이메일 또는 비밀번호가 맞지 않아요.'
      : '로그인하지 못했어요. 잠시 후 다시 시도해 주세요.';
  }, []);

  const signOut = useCallback(async () => {
    await supabase?.auth.signOut();
    setSaveStatus('idle');
    setSaveError('');
  }, []);

  const actions = useMemo(
    () => ({
      updateBasicInfo,
      updateSection,
      updateSkill,
      addSkill,
      removeSkill,
      updateHomeSkillCount,
      resetAboutMe,
      dismissLoadError,
      importLegacyData,
      discardLegacyData,
      signIn,
      signOut,
    }),
    [
      updateBasicInfo,
      updateSection,
      updateSkill,
      addSkill,
      removeSkill,
      updateHomeSkillCount,
      resetAboutMe,
      dismissLoadError,
      importLegacyData,
      discardLegacyData,
      signIn,
      signOut,
    ],
  );

  const status = useMemo(
    () => ({
      saveStatus,
      saveError,
      loadError,
      isLoading,
      // 서버 응답도 캐시도 없어서 기본값을 임시로 들고 있는 상태 (이때는 스켈레톤을 보여줘요)
      isPlaceholder: isLoading && !initialCache,
      isLoggedIn: Boolean(userId),
      isOwner,
      hasLegacyData: Boolean(legacyData),
    }),
    [saveStatus, saveError, loadError, isLoading, initialCache, userId, isOwner, legacyData],
  );

  return (
    <PortfolioActionsContext.Provider value={ actions }>
      <PortfolioStatusContext.Provider value={ status }>
        <PortfolioDataContext.Provider value={ aboutMeData }>
          { children }
        </PortfolioDataContext.Provider>
      </PortfolioStatusContext.Provider>
    </PortfolioActionsContext.Provider>
  );
}

export default PortfolioProvider;
