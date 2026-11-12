import { INK, VIVID } from '../../theme.js';

/**
 * 홈 섹션들이 함께 쓰는 스타일 모음 (sx 객체)
 */

/** 섹션 안쪽 폭 (풀폭 배경 안에서 내용은 이 폭으로 가운데 정렬) */
export const SECTION_INNER_SX = { width: '100%', maxWidth: 1360, mx: 'auto', px: { xs: 2, sm: 3, md: 5 } };

/** 화면을 가득 채우는 초대형 영문 제목 */
export const DISPLAY_TITLE_SX = {
  m: 0,
  fontWeight: 900,
  fontSize: { xs: 'clamp(2.75rem, 14vw, 4.5rem)', md: 'clamp(4.5rem, 9vw, 8.5rem)' },
  lineHeight: 0.92,
  letterSpacing: '-0.04em',
  textTransform: 'uppercase',
  textAlign: 'center',
  wordBreak: 'keep-all',
};

const PILL_BASE_SX = {
  minHeight: { xs: 48, md: 56 },
  px: { xs: 3, md: 4 },
  fontSize: { xs: '0.95rem', md: '1.05rem' },
  fontWeight: 800,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  transition: 'transform 0.2s, background-color 0.2s, color 0.2s',
  '@media (hover: hover)': { '&:hover': { transform: 'translateY(-2px)' } },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
};

/** 검정 알약 버튼 (밝은 배경 위) */
export const PILL_DARK_SX = {
  ...PILL_BASE_SX,
  bgcolor: INK,
  color: '#FFFFFF',
  '&:hover': { bgcolor: INK, color: VIVID.green.main },
};

/** 흰 알약 버튼 (어두운·원색 배경 위) */
export const PILL_LIGHT_SX = {
  ...PILL_BASE_SX,
  bgcolor: '#FFFFFF',
  color: INK,
  '&:hover': { bgcolor: VIVID.green.main, color: INK },
};

/** 테두리만 있는 작은 알약 배지 (예: 'LV 80%') */
export const OUTLINE_BADGE_SX = {
  display: 'inline-flex',
  alignItems: 'center',
  px: 1.5,
  py: 0.5,
  border: '2px solid currentColor',
  borderRadius: 999,
  fontSize: '0.8rem',
  fontWeight: 800,
  letterSpacing: '0.03em',
  lineHeight: 1.2,
  whiteSpace: 'nowrap',
};
