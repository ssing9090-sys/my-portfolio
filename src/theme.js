import { createTheme } from '@mui/material/styles';

/**
 * 사이트 전체 컬러 팔레트 (메인 컬러: 오렌지)
 * (index.css 의 :root 변수와 동일하게 유지)
 *
 * primary.main  : 버튼·강조 배경 (파스텔이라 흰 글씨 대신 contrastText 사용)
 * primary.dark  : 흰 배경 위 오렌지 텍스트·링크
 * primary.light : 연한 오렌지 배경 (태그, 채팅방, 강조 박스)
 * primary.border: 연한 오렌지 테두리
 * primary.hover : 채워진 버튼의 hover 배경 (contrastText 대비 유지)
 */
const lightPalette = {
  primary: { main: '#F7A66F', light: '#FFEFE3', dark: '#A8500F', contrastText: '#4A2A14', border: '#FAD4B8', hover: '#F28F52' },
  secondary: { main: '#3D2E26' },
  error: { main: '#D32F2F' },
  background: { default: '#FFF9F4', paper: '#FFFFFF' },
  text: { primary: '#3D2E26', secondary: '#6E5A4E', disabled: '#8C7A6E' },
  divider: '#F5E6DA',
};

const darkPalette = {
  primary: { main: '#F9B98D', light: '#33261E', dark: '#FFC299', contrastText: '#1C1917', border: '#5C4232', hover: '#FFD2B3' },
  secondary: { main: '#EDE4DD' },
  error: { main: '#FF6B6B' },
  background: { default: '#24201D', paper: '#1C1917' },
  text: { primary: '#EDE4DD', secondary: '#BDAFA5', disabled: '#94867C' },
  divider: '#3D322B',
};

const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'media' },
  colorSchemes: {
    light: { palette: lightPalette },
    dark: { palette: darkPalette },
  },
  typography: {
    fontFamily: '"Pretendard Variable", Pretendard, -apple-system, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
    allVariants: {
      letterSpacing: '-0.012em',
    },
    h1: {
      fontSize: '2.125rem',
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    // 키보드로 이동할 때만(마우스 클릭 제외) 뚜렷한 포커스 테두리를 보여준다.
    // primary.dark 는 라이트·다크 모드 모두 배경과 대비가 충분한 색이에요.
    MuiButtonBase: {
      styleOverrides: {
        root: ({ theme: currentTheme }) => ({
          '&.Mui-focusVisible': {
            outline: `3px solid ${(currentTheme.vars ?? currentTheme).palette.primary.dark}`,
            outlineOffset: 2,
          },
        }),
      },
    },
    // 탭은 스크롤 영역 안에 있어서 바깥 테두리가 잘리므로 안쪽으로 그린다.
    MuiTab: {
      styleOverrides: {
        root: { '&.Mui-focusVisible': { outlineOffset: -3 } },
      },
    },
  },
});

export default theme;
