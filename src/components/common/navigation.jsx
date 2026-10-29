import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

/**
 * Navigation 컴포넌트
 *
 * 상단 고정 내비게이션 바. 현재 경로에 맞는 탭을 활성화한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <Navigation />
 */
function Navigation() {
  const { pathname } = useLocation();
  const currentTab = NAV_ITEMS.some((item) => item.path === pathname) ? pathname : false;

  return (
    <AppBar
      position="sticky"
      elevation={ 0 }
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="md">
        <Toolbar
          disableGutters
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            gap: { xs: 0.5, sm: 2 },
            py: { xs: 1, sm: 0 },
          }}
        >
          <Box
            component={ Link }
            to="/"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              fontWeight: 800,
              color: 'primary.dark',
              textDecoration: 'none',
            }}
          >
            My Portfolio
          </Box>
          <Tabs
            value={ currentTab }
            textColor="inherit"
            sx={{
              '& .MuiTabs-indicator': { bgcolor: 'primary.main', height: 3 },
              '& .MuiTab-root': {
                minWidth: { xs: 80, md: 100 },
                fontSize: { xs: '0.85rem', md: '0.95rem' },
                color: 'text.secondary',
              },
              '& .MuiTab-root.Mui-selected': { color: 'primary.dark' },
            }}
          >
            { NAV_ITEMS.map((item) => (
              <Tab
                key={ item.path }
                label={ item.label }
                value={ item.path }
                component={ Link }
                to={ item.path }
              />
            )) }
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
