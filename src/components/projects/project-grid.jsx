import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProjectCard from './project-card.jsx';
import ProjectCardSkeleton from './project-card-skeleton.jsx';

/** 모바일 1열, 태블릿 2열, 데스크톱 3열 */
const GRID_SIZE = { xs: 12, sm: 6, md: 4 };
const SKELETON_KEYS = [1, 2, 3];

/**
 * ProjectGrid 컴포넌트
 *
 * 프로젝트 카드를 바둑판 형태로 배치하고 로딩·오류·빈 상태를 처리한다.
 *
 * Props:
 * @param {Array} projects - 프로젝트 목록 [Required]
 * @param {boolean} isLoading - 로딩 중 여부 [Optional, 기본값: false]
 * @param {string} error - 오류 메시지 [Optional, 기본값: '']
 *
 * Example usage:
 * <ProjectGrid projects={ projects } isLoading={ isLoading } error={ error } />
 */
function ProjectGrid({ projects, isLoading = false, error = '' }) {
  if (error) {
    return <Alert severity="error">{ error }</Alert>;
  }

  if (!isLoading && projects.length === 0) {
    return (
      <Box sx={{ py: 6, textAlign: 'center', fontSize: '0.95rem', color: 'text.secondary' }}>
        아직 공개된 프로젝트가 없어요.
      </Box>
    );
  }

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      { isLoading
        ? SKELETON_KEYS.map((key) => (
          <Grid size={ GRID_SIZE } key={ key }>
            <ProjectCardSkeleton />
          </Grid>
        ))
        : projects.map((project) => (
          <Grid size={ GRID_SIZE } key={ project.id }>
            <ProjectCard project={ project } />
          </Grid>
        )) }
    </Grid>
  );
}

export default ProjectGrid;
