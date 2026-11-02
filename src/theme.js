import { createTheme } from '@mui/material/styles';

/**
 * 사이트 전체 컬러 팔레트 (메인 컬러: 핑크)
 * (index.css 의 :root 변수와 동일하게 유지)
 *
 * primary.main  : 버튼·강조 배경 (흰 굵은 글씨와 함께 사용)
 * primary.dark  : 흰 배경 위 핑크 텍스트·링크
 * primary.light : 연한 핑크 배경 (태그, 채팅방, 강조 박스)
 * primary.border: 연한 핑크 테두리
 */
const lightPalette = {
  primary: { main: '#D63A7A', light: '#FFE8F1', dark: '#AD1457', contrastText: '#FFFFFF', border: '#F8BBD0' },
  secondary: { main: '#333333' },
  error: { main: '#E53935' },
  background: { default: '#FFF8FB', paper: '#FFFFFF' },
  text: { primary: '#333333', secondary: '#666666', disabled: '#999999' },
  divider: '#F3E3EA',
};

const darkPalette = {
  primary: { main: '#F48FB1', light: '#33202A', dark: '#F8A5C2', contrastText: '#1B1C1E', border: '#5C3346' },
  secondary: { main: '#E5E5E5' },
  error: { main: '#FF6B6B' },
  background: { default: '#222326', paper: '#1B1C1E' },
  text: { primary: '#E5E5E5', secondary: '#B3B3B3', disabled: '#8A8F94' },
  divider: '#3A2E34',
};

const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'media' },
  colorSchemes: {
    light: { palette: lightPalette },
    dark: { palette: darkPalette },
  },
  typography: {
    fontFamily: '"Roboto", "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
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
});

export default theme;
