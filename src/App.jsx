import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CustomCursor from './components/common/custom-cursor.jsx';
import ErrorBoundary from './components/common/error-boundary.jsx';
import Footer from './components/common/footer.jsx';
import Navigation from './components/common/navigation.jsx';
import ScrollProgressButton from './components/common/scroll-progress-button.jsx';
import useRouteScroll from './hooks/use-route-scroll.js';
import AboutPage from './pages/about-page.jsx';
import HomePage from './pages/home-page.jsx';
import ProjectsPage from './pages/projects-page.jsx';

const MAIN_ID = 'main-content';

/** 키보드 사용자가 내비게이션을 건너뛰고 본문으로 바로 가는 버튼 (Tab 을 누르면 나타나요) */
function SkipToContent() {
  return (
    <Button
      variant="contained"
      onClick={ () => document.getElementById(MAIN_ID)?.focus() }
      sx={{
        position: 'fixed',
        top: 8,
        left: 8,
        zIndex: 'tooltip',
        transform: 'translateY(-200%)',
        '&:focus-visible': { transform: 'none' },
      }}
    >
      본문으로 건너뛰기
    </Button>
  );
}

/** Projects 처럼 가운데 정렬 폭이 필요한 페이지 틀 (홈·About 은 풀폭 섹션이라 쓰지 않아요) */
function ContainedPage({ children }) {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 7 }, px: { xs: 2, md: 3 } }}>
      { children }
    </Container>
  );
}

/** 경로가 바뀔 때마다 페이지를 부드럽게 페이드인하고, 오류는 페이지 단위로 가둔다. */
function AnimatedRoutes() {
  const location = useLocation();
  useRouteScroll();

  return (
    <ErrorBoundary key={ location.pathname }>
      <Box
        key={ location.pathname }
        sx={{
          '@keyframes pageFadeIn': {
            from: { opacity: 0, transform: 'translateY(8px)' },
            to: { opacity: 1, transform: 'none' },
          },
          animation: 'pageFadeIn 0.35s ease-out',
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      >
        <Routes location={ location }>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/about" element={ <AboutPage /> } />
          <Route path="/projects" element={ <ContainedPage><ProjectsPage /></ContainedPage> } />
          <Route path="*" element={ <Navigate to="/" replace /> } />
        </Routes>
      </Box>
    </ErrorBoundary>
  );
}

/**
 * App 컴포넌트
 *
 * GitHub Pages 새로고침 404 를 피하기 위해 HashRouter 사용.
 *
 * Props: 없음
 *
 * Example usage:
 * <App />
 */
function App() {
  return (
    <HashRouter>
      <SkipToContent />
      <Navigation />
      <Box id={ MAIN_ID } component="main" tabIndex={ -1 } sx={{ width: '100%', flexGrow: 1, outline: 'none' }}>
        <AnimatedRoutes />
      </Box>
      <Footer />
      <ScrollProgressButton />
      <CustomCursor />
    </HashRouter>
  );
}

export default App;
