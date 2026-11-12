import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import { INK, SERIF_FONT, VIVID } from '../../theme.js';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

const CONTACT_ID = 'contact';

/**
 * Navigation 컴포넌트
 *
 * 화면 맨 위에 붙어 있는 검정 내비게이션 바.
 * 왼쪽 로고 · 가운데 탭(현재 경로 강조) · 오른쪽 CONTACT 알약 버튼(홈 Contact 섹션으로 이동).
 *
 * Props: 없음
 *
 * Example usage:
 * <Navigation />
 */
function Navigation() {
  const { pathname } = useLocation();
  const currentTab = NAV_ITEMS.some((item) => item.path === pathname) ? pathname : false;

  // 이미 홈이면 바로 스크롤 (경로가 같으면 useRouteScroll 이 다시 동작하지 않아서)
  const handleContactClick = (event) => {
    if (pathname !== '/') return;
    event.preventDefault();
    const target = document.getElementById(CONTACT_ID);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    target?.focus({ preventScroll: true });
  };

  return (
    <AppBar position="sticky" elevation={ 0 } sx={{ bgcolor: INK, color: '#FFFFFF' }}>
      <Toolbar
        sx={{
          minHeight: { xs: 60, md: 76 },
          px: { xs: 2, md: 5 },
          gap: { xs: 1, md: 3 },
          justifyContent: 'space-between',
        }}
      >
        <Box
          component={ Link }
          to="/"
          aria-label="홈으로"
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 0.5,
            color: '#FFFFFF',
            textDecoration: 'none',
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          <Box component="span" sx={{ fontFamily: SERIF_FONT, fontStyle: 'italic', fontSize: { xs: '1.15rem', md: '1.5rem' } }}>
            hj.
          </Box>
          <Box component="span" sx={{ fontWeight: 900, fontSize: { xs: '1.15rem', md: '1.5rem' }, letterSpacing: '-0.03em' }}>
            PORTFOLIO
          </Box>
        </Box>

        <Tabs
          value={ currentTab }
          textColor="inherit"
          aria-label="페이지 이동"
          sx={{
            minHeight: 0,
            '& .MuiTabs-indicator': { bgcolor: VIVID.green.main, height: 3, borderRadius: 2 },
            '& .MuiTab-root': {
              minHeight: { xs: 60, md: 76 },
              minWidth: 0,
              px: { xs: 1, md: 2 },
              fontSize: { xs: '0.85rem', md: '1rem' },
              fontWeight: 600,
              textTransform: 'none',
              color: 'rgba(255, 255, 255, 0.72)',
            },
            '& .MuiTab-root.Mui-selected': { color: '#FFFFFF' },
          }}
        >
          { NAV_ITEMS.map((item) => (
            <Tab key={ item.path } label={ item.label } value={ item.path } component={ Link } to={ item.path } />
          )) }
        </Tabs>

        <Button
          component={ Link }
          to="/"
          state={{ scrollTo: CONTACT_ID }}
          onClick={ handleContactClick }
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            minHeight: 44,
            px: 3,
            bgcolor: '#FFFFFF',
            color: INK,
            fontWeight: 800,
            letterSpacing: '0.04em',
            '&:hover': { bgcolor: VIVID.green.main },
          }}
        >
          CONTACT
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
