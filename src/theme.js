import { createTheme } from '@mui/material/styles';

/**
 * 사이트 전체 디자인 토큰 — '볼드 팝' 스타일
 * (검정·크림 바탕 위에 원색 블록, 아주 굵은 영문 헤드라인, 알약 버튼)
 * index.css 의 :root 변수와 값을 같게 유지해요.
 *
 * VIVID : 섹션 배경·카드·카테고리에 쓰는 원색 (글자색은 각 항목의 on 값)
 */
export const VIVID = {
  green: { main: '#19E05A', on: '#121212' },
  blue: { main: '#0A6CFF', on: '#FFFFFF' },
  pink: { main: '#FF3B7F', on: '#FFFFFF' },
  yellow: { main: '#FFD23F', on: '#121212' },
  coral: { main: '#FF6A6F', on: '#121212' },
  purple: { main: '#8B5CF6', on: '#FFFFFF' },
  sky: { main: '#DDF4FF', on: '#0A6CFF' },
};

export const INK = '#121212';
export const CREAM = '#FFFDF0';

/** 영문 헤드라인용 글꼴 (한글은 Pretendard 로 자연스럽게 넘어가요) */
export const DISPLAY_FONT = '"Poppins", "Pretendard Variable", Pretendard, -apple-system, "Malgun Gothic", sans-serif';
/** 포인트용 세리프 글꼴 (영문 한두 단어에만 사용) */
export const SERIF_FONT = '"DM Serif Display", Georgia, "Times New Roman", serif';

/** 키보드 포커스 표시: 검정 테두리 + 흰 여백이라 어떤 배경색 위에서도 보여요. */
const FOCUS_RING = {
  outline: `3px solid ${INK}`,
  outlineOffset: 2,
  boxShadow: '0 0 0 7px #FFFFFF',
};

/**
 * primary.main  : 검정 알약 버튼 배경
 * primary.dark  : 흰 바탕 위 강조 글자·링크
 * primary.light : 옅은 회베이지 배경 (태그, 채팅방, 강조 박스)
 * primary.border: 옅은 테두리
 * primary.hover : 채워진 버튼의 hover 배경
 */
const palette = {
  primary: { main: INK, light: '#F3F2EA', dark: INK, contrastText: '#FFFFFF', border: '#E3E1D6', hover: '#2E2E2E' },
  secondary: { main: VIVID.blue.main },
  error: { main: '#D92D20' },
  success: { main: '#12A150' },
  background: { default: CREAM, paper: '#FFFFFF' },
  text: { primary: INK, secondary: '#55534C', disabled: '#8A877D' },
  divider: '#E8E6DC',
};

const theme = createTheme({
  cssVariables: true,
  palette,
  typography: {
    fontFamily: DISPLAY_FONT,
    allVariants: { letterSpacing: '-0.01em' },
    h1: { fontSize: '2.125rem', fontWeight: 800 },
    button: { fontWeight: 700, letterSpacing: '0.02em' },
  },
  shape: { borderRadius: 12 },
  spacing: 8,
  components: {
    // 키보드로 이동할 때만(마우스 클릭 제외) 포커스 링을 보여준다.
    MuiButtonBase: {
      styleOverrides: { root: { '&.Mui-focusVisible': FOCUS_RING } },
    },
    // 탭은 스크롤 영역 안에 있어서 바깥 테두리가 잘리므로 안쪽으로 그린다.
    MuiTab: {
      styleOverrides: { root: { '&.Mui-focusVisible': { outlineOffset: -4, boxShadow: 'none' } } },
    },
    // 모든 버튼은 알약 모양
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, textTransform: 'none', paddingInline: 20 },
        outlined: { borderWidth: 2, '&:hover': { borderWidth: 2 } },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 700 } },
    },
    MuiCard: {
      styleOverrides: { root: { borderRadius: 24 } },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { borderRadius: 14 } },
    },
  },
});

export default theme;
