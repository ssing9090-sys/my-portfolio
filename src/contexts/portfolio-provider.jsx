import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_ABOUT_ME } from '../data/about-me-data.js';
import { PortfolioActionsContext, PortfolioDataContext, PortfolioStatusContext } from './portfolio-contexts.js';

const STORAGE_KEY = 'portfolio:about-me';

/** 입력이 멈추고 이만큼(ms) 지나면 저장한다. (타자마다 저장하지 않도록) */
const SAVE_DELAY = 400;

const isObject = (value) => typeof value === 'object' && value !== null;

const isValidSkill = (skill) => isObject(skill)
  && typeof skill.name === 'string'
  && typeof skill.category === 'string'
  && Number.isFinite(skill.level);

/** 저장된 값 중 형식이 맞는 것만 기본값 위에 덮어쓴다. (오래되거나 망가진 데이터 대비) */
function mergeWithDefaults(saved) {
  if (!isObject(saved)) {
    return DEFAULT_ABOUT_ME;
  }

  const savedBasicInfo = isObject(saved.basicInfo) ? saved.basicInfo : {};
  const basicInfo = Object.fromEntries(
    Object.entries(DEFAULT_ABOUT_ME.basicInfo).map(([key, fallback]) => [
      key,
      typeof savedBasicInfo[key] === 'string' ? savedBasicInfo[key] : fallback,
    ]),
  );

  const savedSections = Array.isArray(saved.sections) ? saved.sections.filter(isObject) : [];
  const sections = DEFAULT_ABOUT_ME.sections.map((section) => {
    const found = savedSections.find((item) => item.id === section.id);
    return {
      ...section,
      content: typeof found?.content === 'string' ? found.content : section.content,
      showInHome: typeof found?.showInHome === 'boolean' ? found.showInHome : section.showInHome,
    };
  });

  const skills = Array.isArray(saved.skills) ? saved.skills.filter(isValidSkill) : DEFAULT_ABOUT_ME.skills;

  return { basicInfo, sections, skills };
}

/** 처음 한 번 저장된 데이터를 읽는다. */
function loadAboutMe() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? mergeWithDefaults(JSON.parse(raw)) : DEFAULT_ABOUT_ME;
    return { data, json: JSON.stringify(data), loadError: '' };
  } catch {
    return {
      data: DEFAULT_ABOUT_ME,
      json: JSON.stringify(DEFAULT_ABOUT_ME),
      loadError: '저장된 About Me 내용을 읽지 못해서 기본 내용으로 시작했어요.',
    };
  }
}

/**
 * PortfolioProvider 컴포넌트
 *
 * About Me 데이터(기본 정보·소개 섹션·스킬)를 앱 전체에 공유한다.
 * About Me 탭에서 고친 내용이 홈 탭에 바로 반영되고, 이 브라우저(localStorage)에 자동 저장된다.
 *
 * Props:
 * @param {React.ReactNode} children - 데이터를 사용할 하위 컴포넌트 [Required]
 *
 * Example usage:
 * <PortfolioProvider><App /></PortfolioProvider>
 */
function PortfolioProvider({ children }) {
  const [initial] = useState(loadAboutMe);
  const [aboutMeData, setAboutMeData] = useState(initial.data);
  const [loadError, setLoadError] = useState(initial.loadError);
  const [saveStatus, setSaveStatus] = useState('idle');
  const lastSavedJsonRef = useRef(initial.json);

  // 내용이 바뀌면 잠시 기다렸다가 저장한다. (저장된 내용과 같으면 건너뜀)
  useEffect(() => {
    const json = JSON.stringify(aboutMeData);
    if (json === lastSavedJsonRef.current) {
      return undefined;
    }

    setSaveStatus('saving');
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, json);
        lastSavedJsonRef.current = json;
        setSaveStatus('saved');
      } catch {
        setSaveStatus('error');
      }
    }, SAVE_DELAY);

    return () => clearTimeout(timer);
  }, [aboutMeData]);

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
      skills: [...prev.skills, { ...skill, id: Date.now(), isCustom: true }],
    }));
  }, []);

  const removeSkill = useCallback((id) => {
    setAboutMeData((prev) => ({ ...prev, skills: prev.skills.filter((skill) => skill.id !== id) }));
  }, []);

  const resetAboutMe = useCallback(() => setAboutMeData(DEFAULT_ABOUT_ME), []);
  const dismissLoadError = useCallback(() => setLoadError(''), []);

  const actions = useMemo(
    () => ({ updateBasicInfo, updateSection, updateSkill, addSkill, removeSkill, resetAboutMe, dismissLoadError }),
    [updateBasicInfo, updateSection, updateSkill, addSkill, removeSkill, resetAboutMe, dismissLoadError],
  );

  const status = useMemo(() => ({ saveStatus, loadError }), [saveStatus, loadError]);

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
