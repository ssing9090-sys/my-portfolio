import { useEffect, useRef, useState } from 'react';

/**
 * useInView 훅
 *
 * 요소가 화면에 처음 들어오는 순간을 알려준다. (한 번 true 가 되면 계속 유지)
 *
 * @param {number} threshold - 요소가 얼마나 보여야 true 가 될지 (0~1) [Optional, 기본값: 0.3]
 * @returns {[React.RefObject, boolean]} [요소에 연결할 ref, 화면에 들어왔는지 여부]
 *
 * Example usage:
 * const [ref, isInView] = useInView();
 * <div ref={ ref }>{ isInView ? '보여요' : '' }</div>
 */
function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const node = ref.current;
    if (!node || isInView) {
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold });

    observer.observe(node);
    return () => observer.disconnect();
  }, [isInView, threshold]);

  return [ref, isInView];
}

export default useInView;
