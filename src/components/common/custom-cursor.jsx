import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

/** 커서 링이 마우스를 따라가는 정도 (0~1, 작을수록 더 느긋하게 따라와요) */
const FOLLOW_EASE = 0.18;
const DOT_SIZE = 8;
const RING_SIZE = 38;

/** 링이 커지는 대상 (누를 수 있는 것) */
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], [role="tab"], [role="option"], label, select, summary';
/** 글자를 입력하는 곳에서는 기본 I 커서를 그대로 써요. */
const TEXT_SELECTOR = 'input, textarea, [contenteditable="true"]';

/** 마우스가 있고 '동작 줄이기'를 켜지 않은 환경에서만 켜요. (터치 기기에서는 아예 그리지 않아요) */
const ENABLE_QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

const LAYER_SX = {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2000, // 대화상자·툴팁보다 위
  pointerEvents: 'none',
  // 흰색을 '차이(difference)' 로 섞어서 어떤 배경 위에서도 반전색으로 보여요.
  mixBlendMode: 'difference',
  opacity: 0,
  transition: 'opacity 0.2s',
  '&[data-visible="true"]': { opacity: 1 },
};

/**
 * CustomCursor 컴포넌트
 *
 * 기본 화살표 대신 '점 + 따라오는 링' 커서.
 * - 점은 마우스 위치에 바로, 링은 살짝 늦게 따라와요.
 * - 링크·버튼 위에서는 링이 커지며 꽉 찬 원이 되어 아래 색을 반전시켜요.
 * - 누르는 순간 링이 작아지고, 입력칸에서는 기본 I 커서로 돌아가요.
 * 화면을 다시 그리지 않도록 위치는 state 대신 ref 로 직접 옮긴다.
 *
 * Props: 없음
 *
 * Example usage:
 * <CustomCursor />
 */
function CustomCursor() {
  const isEnabled = useMediaQuery(ENABLE_QUERY, { noSsr: true });
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!isEnabled || !dot || !ring) {
      return undefined;
    }

    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const pointer = { x: 0, y: 0 };
    const ringPosition = { x: 0, y: 0 };
    let frame = 0;

    const setState = (name, value) => {
      dot.dataset[name] = value;
      ring.dataset[name] = value;
    };

    // 링이 마우스에 거의 닿으면 반복을 멈춰서 가만히 있을 때는 일을 하지 않아요.
    const followPointer = () => {
      ringPosition.x += (pointer.x - ringPosition.x) * FOLLOW_EASE;
      ringPosition.y += (pointer.y - ringPosition.y) * FOLLOW_EASE;
      ring.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0)`;
      const isSettled = Math.abs(pointer.x - ringPosition.x) < 0.1 && Math.abs(pointer.y - ringPosition.y) < 0.1;
      frame = isSettled ? 0 : requestAnimationFrame(followPointer);
    };

    const handleMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (dot.dataset.visible !== 'true') {
        // 처음 들어올 때는 링이 화면 구석에서 날아오지 않게 바로 그 자리에 둬요.
        ringPosition.x = pointer.x;
        ringPosition.y = pointer.y;
        setState('visible', 'true');
      }
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;

      const target = event.target instanceof Element ? event.target : null;
      const mode = target?.closest(TEXT_SELECTOR) ? 'text' : target?.closest(INTERACTIVE_SELECTOR) ? 'link' : 'default';
      setState('mode', mode);

      if (!frame) frame = requestAnimationFrame(followPointer);
    };
    const handleLeave = (event) => {
      if (!event.relatedTarget) setState('visible', 'false');
    };
    const handleDown = () => setState('pressed', 'true');
    const handleUp = () => setState('pressed', 'false');

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('pointerout', handleLeave);
    window.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointerup', handleUp);
    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerout', handleLeave);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <Box ref={ ringRef } aria-hidden="true" sx={ LAYER_SX }>
        <Box
          sx={{
            width: RING_SIZE,
            height: RING_SIZE,
            ml: `${-RING_SIZE / 2}px`,
            mt: `${-RING_SIZE / 2}px`,
            borderRadius: '50%',
            border: '2px solid #FFFFFF',
            bgcolor: 'transparent',
            transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s, opacity 0.2s',
            '[data-mode="link"] > &': { transform: 'scale(1.7)', bgcolor: '#FFFFFF' },
            '[data-mode="text"] > &': { opacity: 0 },
            '[data-pressed="true"] > &': { transform: 'scale(0.75)' },
            '[data-mode="link"][data-pressed="true"] > &': { transform: 'scale(1.4)' },
          }}
        />
      </Box>
      <Box ref={ dotRef } aria-hidden="true" sx={ LAYER_SX }>
        <Box
          sx={{
            width: DOT_SIZE,
            height: DOT_SIZE,
            ml: `${-DOT_SIZE / 2}px`,
            mt: `${-DOT_SIZE / 2}px`,
            borderRadius: '50%',
            bgcolor: '#FFFFFF',
            transition: 'opacity 0.2s',
            // 링이 꽉 찬 원이 되면 점은 숨겨요. (반전이 겹쳐 구멍처럼 보이지 않게)
            '[data-mode="link"] > &, [data-mode="text"] > &': { opacity: 0 },
          }}
        />
      </Box>
    </>
  );
}

export default CustomCursor;
