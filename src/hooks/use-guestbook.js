import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

/** 공개 조회 가능한 컬럼 (email, phone 은 비공개라 조회 권한 없음) */
const PUBLIC_COLUMNS = 'id, name, message, instagram, rating, avatar_index, created_at';
const PAGE_SIZE = 30;
const CONFIG_ERROR = '방명록 서버 설정이 없습니다. 환경변수를 확인해주세요.';

/** 최신순 방명록 목록을 조회한다. (상태를 건드리지 않는 순수 요청 함수) */
function requestEntries() {
  return supabase
    .from('guestbook')
    .select(PUBLIC_COLUMNS)
    .order('created_at', { ascending: false })
    .limit(PAGE_SIZE);
}

/**
 * useGuestbook 훅
 *
 * Supabase guestbook 테이블의 목록 조회(최신순)와 작성 기능을 제공한다.
 *
 * @returns {{ entries: Array, isLoading: boolean, error: string, addEntry: function }}
 *
 * Example usage:
 * const { entries, isLoading, error, addEntry } = useGuestbook();
 */
function useGuestbook() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(Boolean(supabase));
  const [error, setError] = useState(supabase ? '' : CONFIG_ERROR);

  /** 조회 결과를 상태에 반영한다. */
  const applyResult = useCallback(({ data, error: fetchError }) => {
    if (fetchError) {
      setError('방명록을 불러오지 못했습니다.');
    } else {
      setEntries(data);
      setError('');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!supabase) return undefined;

    let isActive = true;
    requestEntries().then((result) => {
      if (isActive) applyResult(result);
    });
    return () => {
      isActive = false;
    };
  }, [applyResult]);

  /**
   * 방명록 작성 후 목록 새로고침.
   * 서버가 랜덤 배정한 캐릭터 번호(avatar_index)를 반환하고, 실패 시 Error 를 던진다.
   */
  const addEntry = useCallback(async (entry) => {
    if (!supabase) {
      throw new Error(CONFIG_ERROR);
    }

    const { data, error: insertError } = await supabase
      .from('guestbook')
      .insert(entry)
      .select('avatar_index')
      .single();

    if (insertError) {
      throw new Error('방명록 등록에 실패했습니다. 입력값을 확인해주세요.');
    }
    applyResult(await requestEntries());
    return data.avatar_index;
  }, [applyResult]);

  return { entries, isLoading, error, addEntry };
}

export default useGuestbook;
