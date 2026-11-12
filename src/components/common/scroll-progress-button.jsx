import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { INK, VIVID } from '../../theme.js';

/** 이만큼(px) 내려가면 버튼이 나타나요. */
const SHOW_AFTER = 400;
/** 진행 링 SVG 치수 (viewBox 기준) */
const RING_RADIUS = 24;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

/**
 * ScrollProgressButton 컴포넌트
 *
 * 오른쪽 아래에 떠 있는 '맨 위로' 버튼. 둘레의 초록 링이 페이지를 읽은 만큼 차올라요.
 * 링 길이는 state 대신 ref 로 직접 바꿔서 스크롤할 때 화면을 다시 그리지 않는다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ScrollProgressButton />
 */
function ScrollProgressButton() {
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      ringRef.current?.style.setProperty('stroke-dashoffset', String(RING_LENGTH * (1 - progress)));
      // 같은 값이면 React 가 다시 그리지 않아요.
      setIsVisible(window.scrollY > SHOW_AFTER);
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
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <Box
      component="button"
      type="button"
      onClick={ scrollToTop }
      aria-label="맨 위로 이동"
      sx={{
        position: 'fixed',
        right: { xs: 16, md: 28 },
        bottom: { xs: 16, md: 28 },
        zIndex: 'speedDial',
        width: { xs: 52, md: 60 },
        height: { xs: 52, md: 60 },
        p: 0,
        display: 'grid',
        placeItems: 'center',
        borderRadius: '50%',
        border: '2px solid #FFFFFF',
        bgcolor: INK,
        color: '#FFFFFF',
        cursor: 'pointer',
        boxShadow: '0 10px 24px -8px rgba(18, 18, 18, 0.45)',
        // 숨어 있을 때는 Tab 순서에서도 빠지도록 visibility 를 함께 바꿔요.
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transform: isVisible ? 'none' : 'translateY(16px) scale(0.8)',
        transition: 'opacity 0.25s, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), visibility 0.25s',
        '& .arrow': { transition: 'transform 0.25s' },
        '@media (hover: hover)': { '&:hover .arrow': { transform: 'translateY(-3px)', color: VIVID.green.main } },
        '@media (prefers-reduced-motion: reduce)': { transition: 'none', '& .arrow': { transition: 'none' } },
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 56 56"
        aria-hidden="true"
        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}
      >
        <circle cx="28" cy="28" r={ RING_RADIUS } fill="none" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="3" />
        <circle
          ref={ ringRef }
          cx="28"
          cy="28"
          r={ RING_RADIUS }
          fill="none"
          stroke={ VIVID.green.main }
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={ RING_LENGTH }
          strokeDashoffset={ RING_LENGTH }
        />
      </Box>
      <ArrowUpwardRoundedIcon className="arrow" sx={{ position: 'relative', fontSize: { xs: 22, md: 26 } }} />
    </Box>
  );
}

export default ScrollProgressButton;
