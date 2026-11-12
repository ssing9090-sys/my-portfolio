import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import { INK, VIVID } from '../../theme.js';
import toGithubUrl from '../../utils/to-github-url.js';
import ProjectLinkButton from './project-link-button.jsx';
import ProjectThumbnail from './project-thumbnail.jsx';

/** 호버 시 카드 배율 */
const HOVER_SCALE = 1.02;

/** 카드 배경을 순서대로 돌려 써요. (모두 흰 글씨와 대비가 충분한 색) */
const CARD_COLORS = [VIVID.blue.main, VIVID.pink.main, VIVID.purple.main, INK];

/**
 * ProjectCard 컴포넌트
 *
 * 원색으로 꽉 찬 둥근 카드. 둥근 썸네일 · 굵은 흰 제목 · 한 줄 설명 · 기술 스택 배지 · 링크 버튼.
 * 마우스 환경에서는 호버 확대, 터치 환경에서는 눌림 피드백을 보여준다.
 *
 * Props:
 * @param {object} project - projects 테이블 한 행 [Required]
 * @param {number} index - 목록 안 순서 (카드 색 결정) [Optional, 기본값: 0]
 * @param {string} headingComponent - 제목 태그 (홈 탭처럼 h2 섹션 안에서는 h3) [Optional, 기본값: 'h2']
 *
 * Example usage:
 * <ProjectCard project={ project } index={ 0 } />
 */
function ProjectCard({ project, index = 0, headingComponent = 'h2' }) {
  const { title, description, tech_stack: techStack, detail_url: detailUrl, thumbnail_url: thumbnailUrl } = project;
  const githubUrl = toGithubUrl(detailUrl);

  return (
    <Box
      component="article"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        p: 1.25,
        borderRadius: '32px',
        bgcolor: CARD_COLORS[index % CARD_COLORS.length],
        color: '#FFFFFF',
        transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease',
        '@media (hover: hover)': {
          '&:hover': {
            transform: `scale(${ HOVER_SCALE })`,
            boxShadow: '0 18px 36px -14px rgba(18, 18, 18, 0.35)',
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
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.5, px: 1.5, pt: 2, pb: 1.5 }}>
        <Typography
          component={ headingComponent }
          sx={{ fontSize: { xs: '1.3rem', md: '1.35rem' }, fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.03em', wordBreak: 'keep-all' }}
        >
          { title }
        </Typography>
        <Typography sx={{ fontSize: '0.92rem', lineHeight: 1.55, fontWeight: 500, color: 'rgba(255, 255, 255, 0.82)', wordBreak: 'keep-all' }}>
          { description }
        </Typography>
        <Box
          component="ul"
          aria-label="기술 스택"
          sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}
        >
          { techStack.map((tech) => (
            <Box
              component="li"
              key={ tech }
              sx={{
                px: 1.25,
                py: 0.25,
                border: '1.5px solid rgba(255, 255, 255, 0.7)',
                borderRadius: 999,
                fontSize: '0.78rem',
                fontWeight: 700,
              }}
            >
              { tech }
            </Box>
          )) }
        </Box>
        <Box
          sx={{
            mt: 'auto',
            pt: 1,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            '& > *': { flex: '1 1 112px', width: 'auto' },
          }}
        >
          <ProjectLinkButton
            href={ detailUrl }
            label="Live Demo"
            ariaLabel={ `${ title } 데모 사이트 새 탭으로 열기` }
            startIcon={ <LaunchIcon /> }
            onColor
          />
          { githubUrl && (
            <ProjectLinkButton
              href={ githubUrl }
              label="GitHub"
              ariaLabel={ `${ title } GitHub 저장소 새 탭으로 열기` }
              startIcon={ <GitHubIcon /> }
              variant="outlined"
              onColor
            />
          ) }
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectCard;
