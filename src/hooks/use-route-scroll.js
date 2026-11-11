import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useRouteScroll 훅
 *
 * 탭(경로)이 바뀌면 맨 위로 스크롤한다.
 * Link 의 state 에 { scrollTo: '요소 id' } 를 넘기면 그 요소로 스크롤하고 포커스를 옮긴다.
 * (HashRouter 라서 #앵커 대신 state 를 사용)
 *
 * Example usage:
 * useRouteScroll();
 * <Link to="/about" state={{ scrollTo: 'skills' }}>전체 스킬 보기</Link>
 */
function useRouteScroll() {
  const { pathname, state } = useLocation();
  const targetId = state?.scrollTo;

  useEffect(() => {
    // 새 화면이 그려진 다음 프레임에 스크롤
    const frame = requestAnimationFrame(() => {
      const target = targetId ? document.getElementById(targetId) : null;
      if (!target) {
        window.scrollTo(0, 0);
        return;
      }
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      target.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, targetId]);
}

export default useRouteScroll;
