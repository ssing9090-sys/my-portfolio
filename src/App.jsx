import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Navigation from './components/common/navigation.jsx';
import AboutPage from './pages/about-page.jsx';
import HomePage from './pages/home-page.jsx';
import ProjectsPage from './pages/projects-page.jsx';

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
      <Navigation />
      <Box
        component="main"
        sx={{
          width: '100%',
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="md" sx={{ py: 4, px: { xs: 2, md: 3 } }}>
          <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="/about" element={ <AboutPage /> } />
            <Route path="/projects" element={ <ProjectsPage /> } />
            <Route path="*" element={ <Navigate to="/" replace /> } />
          </Routes>
        </Container>
      </Box>
    </HashRouter>
  );
}

export default App;
