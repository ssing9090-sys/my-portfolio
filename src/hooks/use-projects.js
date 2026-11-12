import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

const PUBLIC_COLUMNS = 'id, title, description, tech_stack, detail_url, thumbnail_url';
const CONFIG_ERROR = '프로젝트 서버 설정이 없습니다. 환경변수를 확인해주세요.';

/** 지금 진행 중인 요청 (홈의 Hero·Projects 처럼 동시에 쓰는 곳이 한 요청을 같이 기다려요) */
let inFlight = null;

/** 게시된 프로젝트를 불러온다. 진행 중인 요청이 있으면 그것을 같이 쓴다. */
function fetchProjects() {
  if (!inFlight) {
    inFlight = Promise.resolve(
      supabase.from('projects').select(PUBLIC_COLUMNS).order('sort_order', { ascending: true }),
    ).finally(() => {
      inFlight = null;
    });
  }
  return inFlight;
}

/**
 * useProjects 훅
 *
 * Supabase projects 테이블에서 게시된 프로젝트를 표시 순서대로 조회한다.
 * (미게시 프로젝트는 RLS 정책으로 조회되지 않는다. 동시에 여러 곳에서 써도 요청은 한 번만 보낸다.)
 *
 * @returns {{ projects: Array, isLoading: boolean, error: string }}
 *
 * Example usage:
 * const { projects, isLoading, error } = useProjects();
 */
function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(Boolean(supabase));
  const [error, setError] = useState(supabase ? '' : CONFIG_ERROR);

  useEffect(() => {
    if (!supabase) return undefined;

    let isActive = true;
    fetchProjects()
      .then(({ data, error: fetchError }) => {
        if (!isActive) return;
        if (fetchError) {
          setError('프로젝트를 불러오지 못했습니다.');
        } else {
          setProjects(data);
        }
        setIsLoading(false);
      })
      .catch(() => {
        if (!isActive) return;
        setError('프로젝트를 불러오지 못했습니다.');
        setIsLoading(false);
      });
    return () => {
      isActive = false;
    };
  }, []);

  return { projects, isLoading, error };
}

export default useProjects;
