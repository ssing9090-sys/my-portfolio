import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import toGithubUrl from '../../utils/to-github-url.js';
import ProjectLinkButton from './project-link-button.jsx';
import ProjectThumbnail from './project-thumbnail.jsx';

/** 호버 시 카드 배율 */
const HOVER_SCALE = 1.02;

/**
 * ProjectCard 컴포넌트
 *
 * 썸네일, 프로젝트 이름, 한 줄 설명, 기술 스택 뱃지, 링크 버튼으로 구성된 카드.
 * 마우스 환경에서는 호버 확대와 옅은 그림자, 터치 환경에서는 눌림 피드백을 보여준다.
 *
 * Props:
 * @param {object} project - projects 테이블 한 행 [Required]
 *
 * Example usage:
 * <ProjectCard project={ project } />
 */
function ProjectCard({ project }) {
  const { title, description, tech_stack: techStack, detail_url: detailUrl, thumbnail_url: thumbnailUrl } = project;
  const githubUrl = toGithubUrl(detailUrl);

  return (
    <Card
      component="article"
      elevation={ 0 }
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: 1,
        borderColor: 'primary.border',
        bgcolor: 'background.paper',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '@media (hover: hover)': {
          '&:hover': {
            transform: `scale(${ HOVER_SCALE })`,
            boxShadow: '0 10px 20px -8px rgba(0, 0, 0, 0.18)',
            zIndex: 1,
          },
        },
        '@media (hover: none)': {
          '&:active': { transform: 'scale(0.98)' },
        },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
        },
      }}
    >
      <ProjectThumbnail src={ thumbnailUrl } alt={ `${ title } 사이트 미리보기` } />
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          p: 2,
          '&:last-child': { pb: 2 },
        }}
      >
        <Typography
          component="h2"
          sx={{ fontSize: { xs: '1.1rem', md: '1.05rem' }, fontWeight: 700, lineHeight: 1.4, color: 'text.primary' }}
        >
          { title }
        </Typography>
        <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'text.secondary' }}>
          { description }
        </Typography>
        <Box
          component="ul"
          aria-label="기술 스택"
          sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}
        >
          { techStack.map((tech) => (
            <Box component="li" key={ tech }>
              <Chip
                label={ tech }
                size="small"
                sx={{ bgcolor: 'primary.light', color: 'primary.dark', fontWeight: 600 }}
              />
            </Box>
          )) }
        </Box>
        <Box sx={{ mt: 'auto', pt: 0.5, display: 'flex', gap: 1 }}>
          <ProjectLinkButton
            href={ detailUrl }
            label="Live Demo"
            ariaLabel={ `${ title } 데모 사이트 새 탭으로 열기` }
            startIcon={ <LaunchIcon /> }
          />
          { githubUrl && (
            <ProjectLinkButton
              href={ githubUrl }
              label="GitHub"
              ariaLabel={ `${ title } GitHub 저장소 새 탭으로 열기` }
              startIcon={ <GitHubIcon /> }
              variant="outlined"
            />
          ) }
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
