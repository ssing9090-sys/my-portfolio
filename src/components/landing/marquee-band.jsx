import Box from '@mui/material/Box';
import { INK, VIVID } from '../../theme.js';

/**
 * MarqueeBand 컴포넌트
 *
 * 초대형 해시태그 문구가 옆으로 끝없이 흘러가는 원색 띠 (장식용이라 스크린 리더에는 숨김).
 * 같은 문구를 두 번 이어 붙이고 절반만큼 움직여서 끊김 없이 반복된다.
 * '동작 줄이기' 설정이면 멈춰 있다.
 *
 * Props:
 * @param {Array<string>} words - 흘려 보낼 단어들 [Required]
 * @param {string} color - 띠 배경색 [Optional, 기본값: VIVID.green.main]
 * @param {number} duration - 한 바퀴 시간(초) [Optional, 기본값: 28]
 *
 * Example usage:
 * <MarqueeBand words={ ['HYUNJIN', 'FRONTEND'] } />
 */
function MarqueeBand({ words, color = VIVID.green.main, duration = 28 }) {
  const line = words.map((word) => `#${word}`).join('  ');

  return (
    <Box
      aria-hidden="true"
      sx={{
        overflow: 'hidden',
        bgcolor: color,
        color: INK,
        borderRadius: { xs: '32px', md: '56px' },
        py: { xs: 1.5, md: 2.5 },
        '@keyframes marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: 'max-content',
          animation: `marquee ${duration}s linear infinite`,
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      >
        { [0, 1].map((copy) => (
          <Box
            key={ copy }
            component="span"
            sx={{
              pr: '0.5em',
              whiteSpace: 'nowrap',
              fontWeight: 900,
              fontSize: { xs: '3.5rem', md: 'clamp(5rem, 11vw, 10rem)' },
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            { line }
          </Box>
        )) }
      </Box>
    </Box>
  );
}

export default MarqueeBand;
