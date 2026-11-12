import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import useProjects from '../../hooks/use-projects.js';
import { SERIF_FONT, VIVID } from '../../theme.js';
import ProjectGrid from '../projects/project-grid.jsx';
import { DISPLAY_TITLE_SX, PILL_DARK_SX, SECTION_INNER_SX } from './landing-styles.js';

/** Home 에서 미리 보여줄 대표 프로젝트 수 */
const PREVIEW_COUNT = 3;

/**
 * ProjectsSection 컴포넌트
 *
 * Home 페이지의 Projects 섹션. 하늘색 배경 위 초대형 파란 제목 + 원색 프로젝트 카드 +
 * Projects 탭으로 가는 버튼.
 *
 * Props:
 * @param {string} id - 섹션 앵커 id [Optional, 기본값: 'projects']
 *
 * Example usage:
 * <ProjectsSection id="projects" />
 */
function ProjectsSection({ id = 'projects' }) {
  const { projects, isLoading, error } = useProjects();

  return (
    <Box
      id={ id }
      component="section"
      aria-labelledby={ `${id}-title` }
      tabIndex={ -1 }
      sx={{ bgcolor: VIVID.sky.main, py: { xs: 8, md: 14 }, outline: 'none' }}
    >
      <Box sx={ SECTION_INNER_SX }>
        <Typography sx={{ textAlign: 'center', fontFamily: SERIF_FONT, fontStyle: 'italic', fontSize: { xs: '1.3rem', md: '1.75rem' }, color: VIVID.blue.main, mb: 1 }}>
          things I&apos;ve built
        </Typography>
        <Typography id={ `${id}-title` } component="h2" sx={{ ...DISPLAY_TITLE_SX, color: VIVID.blue.main }}>
          My{ ' ' }
          <br />
          projects
        </Typography>

        <Box sx={{ mt: { xs: 5, md: 8 } }}>
          <ProjectGrid
            projects={ projects.slice(0, PREVIEW_COUNT) }
            isLoading={ isLoading }
            error={ error }
            headingComponent="h3"
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 6 } }}>
          <Button
            component={ Link }
            to="/projects"
            aria-describedby={ `${id}-title` }
            endIcon={ <ArrowForwardRoundedIcon /> }
            sx={ PILL_DARK_SX }
          >
            View more
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectsSection;
