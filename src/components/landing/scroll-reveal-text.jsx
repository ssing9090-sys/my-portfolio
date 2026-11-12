import { useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * ScrollRevealText 컴포넌트
 *
 * 스크롤을 내릴수록 단어가 앞에서부터 하나씩 흐린 색 → 선명한 색으로 차오르는 문장.
 * 글자는 처음부터 모두 DOM 에 있어서 스크린 리더는 문장 전체를 그대로 읽어요.
 * '동작 줄이기' 설정이면 처음부터 모두 선명하게 보여준다.
 *
 * Props:
 * @param {string} text - 보여줄 문장 [Required]
 * @param {string} color - 차오른 단어 색 [Optional, 기본값: '#FFFFFF']
 * @param {string} dimColor - 아직 차오르지 않은 단어 색 [Optional, 기본값: 'rgba(255, 255, 255, 0.25)']
 * @param {string} component - 감쌀 태그 [Optional, 기본값: 'p']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ScrollRevealText text="좋은 디자인을 보는 즐거움에서, 직접 구현하는 즐거움으로." />
 */
function ScrollRevealText({ text, color = '#FFFFFF', dimColor = 'rgba(255, 255, 255, 0.25)', component = 'p', sx }) {
  const ref = useRef(null);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      // 문장 윗부분이 화면 아래 85% 지점에 닿을 때 시작 → 문장 아래가 화면 40% 지점에 오면 끝
      const start = viewport * 0.85;
      const end = viewport * 0.4 - rect.height;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      // 같은 값이면 React 가 다시 그리지 않아요.
      setRevealedCount(Math.round(progress * words.length));
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [prefersReducedMotion, words.length]);

  const shownCount = prefersReducedMotion ? words.length : revealedCount;

  return (
    <Box ref={ ref } component={ component } sx={ sx }>
      { words.map((word, index) => (
        <Box
          // 같은 단어가 반복될 수 있어 위치를 key 로 쓴다. (순서가 바뀌지 않는 목록)
          // eslint-disable-next-line react/no-array-index-key
          key={ index }
          component="span"
          sx={{ color: index < shownCount ? color : dimColor, transition: 'color 0.3s ease' }}
        >
          { word }{ index < words.length - 1 ? ' ' : '' }
        </Box>
      )) }
    </Box>
  );
}

export default ScrollRevealText;
