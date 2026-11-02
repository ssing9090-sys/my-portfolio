import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

/** 공개 조회 가능한 컬럼 (email, phone 은 비공개라 조회 권한 없음) */
const PUBLIC_COLUMNS = 'id, name, message, instagram, favorite_color, keyword, emoji, rating, created_at';
const PAGE_SIZE = 20;

/**
 * useGuestbook 훅
 *
 * Supabase guestbook 테이블의 목록 조회와 작성 기능을 제공한다.
 *
 * @returns {{ entries: Array, isLoading: boolean, error: string, addEntry: function }}
 *
 * Example usage:
 * const { entries, isLoading, error, addEntry } = useGuestbook();
 */
function useGuestbook() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEntries = useCallback(async () => {
    if (!supabase) {
      setError('방명록 서버 설정이 없습니다. 환경변수를 확인해주세요.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data, error: fetchError } = await supabase
      .from('guestbook')
      .select(PUBLIC_COLUMNS)
      .order('created_at', { ascending: false })
      .limit(PAGE_SIZE);

    if (fetchError) {
      setError('방명록을 불러오지 못했습니다.');
    } else {
      setEntries(data);
      setError('');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  /** 방명록 작성 후 목록 새로고침. 실패 시 Error 를 던진다. */
  const addEntry = useCallback(async (entry) => {
    if (!supabase) {
      throw new Error('방명록 서버 설정이 없습니다.');
    }

    const { error: insertError } = await supabase.from('guestbook').insert(entry);
    if (insertError) {
      throw new Error('방명록 등록에 실패했습니다. 입력값을 확인해주세요.');
    }
    await fetchEntries();
  }, [fetchEntries]);

  return { entries, isLoading, error, addEntry };
}

export default useGuestbook;
