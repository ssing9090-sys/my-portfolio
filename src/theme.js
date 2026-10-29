import { createTheme } from '@mui/material/styles';

/**
 * 컬러 팔레트 디자인 시스템.md 의 CSS 변수를 MUI 팔레트로 옮긴 값
 * (index.css 의 :root 변수와 동일하게 유지)
 */
const lightPalette = {
  primary: { main: '#03C75A', light: '#E2FAEA', dark: '#009F47', contrastText: '#FFFFFF' },
  secondary: { main: '#333333' },
  error: { main: '#FF4E59' },
  background: { default: '#F8F8F8', paper: '#FFFFFF' },
  text: { primary: '#333333', secondary: '#666666', disabled: '#999999' },
  divider: '#E5E5E5',
};

const darkPalette = {
  primary: { main: '#1FD171', light: '#0F3A24', dark: '#03C75A', contrastText: '#1B1C1E' },
  secondary: { main: '#E5E5E5' },
  error: { main: '#FF6B74' },
  background: { default: '#222326', paper: '#1B1C1E' },
  text: { primary: '#E5E5E5', secondary: '#B3B3B3', disabled: '#8A8F94' },
  divider: '#323232',
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
