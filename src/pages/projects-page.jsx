import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProjectGrid from '../components/projects/project-grid.jsx';
import useProjects from '../hooks/use-projects.js';

/**
 * ProjectsPage 컴포넌트
 *
 * Supabase 에 등록된 프로젝트를 카드 그리드로 보여주는 페이지.
 *
 * Props: 없음
 *
 * Example usage:
 * <ProjectsPage />
 */
function ProjectsPage() {
  const { projects, isLoading, error } = useProjects();

  return (
    <Box component="section">
      <Typography
        component="h1"
        sx={{
          fontSize: { xs: '2rem', md: '3rem' },
          fontWeight: 800,
          lineHeight: 1.2,
          color: 'text.primary',
          mb: { xs: 3, md: 4 },
        }}
      >
        Projects
      </Typography>
      <ProjectGrid projects={ projects } isLoading={ isLoading } error={ error } />
    </Box>
  );
}

export default ProjectsPage;
