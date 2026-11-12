import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import useProjects from '../../hooks/use-projects.js';
import ProjectGrid from '../projects/project-grid.jsx';

/** Home 에서 미리 보여줄 대표 프로젝트 수 */
const PREVIEW_COUNT = 3;

/**
 * ProjectsSection 컴포넌트
 *
 * Home 페이지의 Projects 섹션. 대표 프로젝트 카드와 Projects 탭으로 가는 버튼을 보여준다.
 *
 * Props:
 * @param {string} id - 섹션 앵커 id [Optional, 기본값: 'projects']
 * @param {string} order - 섹션 순번 표시 [Optional, 기본값: '04']
 *
 * Example usage:
 * <ProjectsSection id="projects" order="04" />
 */
function ProjectsSection({ id = 'projects', order = '04' }) {
  const { projects, isLoading, error } = useProjects();

  return (
    <Box
      id={ id }
      component="section"
      aria-labelledby={ `${id}-title` }
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: 'divider',
        borderLeft: 6,
        borderLeftColor: 'primary.main',
        bgcolor: 'background.paper',
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 4 },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: { xs: 2, md: 3 } }}>
        <Chip label={ order } size="small" sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 700 }} />
        <Typography
          id={ `${id}-title` }
          component="h2"
          sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, lineHeight: 1.2, color: 'text.primary' }}
        >
          Projects
        </Typography>
      </Box>
      <ProjectGrid projects={ projects.slice(0, PREVIEW_COUNT) } isLoading={ isLoading } error={ error } headingComponent="h3" />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 2, md: 3 } }}>
        <Button
          component={ Link }
          to="/projects"
          aria-describedby={ `${id}-title` }
          variant="outlined"
          endIcon={ <ArrowForwardRoundedIcon /> }
          sx={{
            minHeight: 44,
            px: 3,
            textTransform: 'none',
            borderColor: 'primary.border',
            color: 'primary.dark',
            '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.light' },
          }}
        >
          더 보기
        </Button>
      </Box>
    </Box>
  );
}

export default ProjectsSection;
