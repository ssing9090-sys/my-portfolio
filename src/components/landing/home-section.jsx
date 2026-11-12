import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

/**
 * HomeSection 컴포넌트
 *
 * 홈 탭 섹션의 공통 틀 (순번 칩 + 제목 + 내용 + 하단 이동 버튼).
 *
 * Props:
 * @param {string} id - 섹션 앵커 id [Required]
 * @param {string} order - 섹션 순번 (예: '02') [Required]
 * @param {string} title - 섹션 제목 [Required]
 * @param {string} description - 제목 아래 한 줄 설명 [Optional]
 * @param {object} action - 하단 버튼 { label, to, state } [Optional]
 * @param {boolean} isBusy - 내용을 불러오는 중인지 (스크린 리더에 aria-busy 로 알림) [Optional, 기본값: false]
 * @param {React.ReactNode} children - 섹션 내용 [Required]
 *
 * Example usage:
 * <HomeSection id="skills" order="03" title="Skills" action={{ label: '전체 스킬 보기', to: '/about' }}>...</HomeSection>
 */
function HomeSection({ id, order, title, description, action, isBusy = false, children }) {
  return (
    <Box
      id={ id }
      component="section"
      aria-labelledby={ `${id}-title` }
      aria-busy={ isBusy }
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: 'divider',
        borderLeft: 6,
        borderLeftColor: 'primary.main',
        bgcolor: 'background.paper',
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 4 },
        scrollMarginTop: { xs: 112, sm: 80 },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: description ? 0.75 : { xs: 2, md: 3 } }}>
        <Chip label={ order } size="small" sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 700 }} />
        <Typography
          id={ `${id}-title` }
          component="h2"
          sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, lineHeight: 1.2, color: 'text.primary' }}
        >
          { title }
        </Typography>
      </Box>
      { description && (
        <Typography sx={{ mb: { xs: 2, md: 3 }, fontSize: '0.95rem', color: 'text.secondary', wordBreak: 'keep-all' }}>
          { description }
        </Typography>
      ) }

      { children }

      { action && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 2.5, md: 3 } }}>
          <Button
            component={ Link }
            to={ action.to }
            state={ action.state }
            // '더 알아보기, About Me' 처럼 어느 섹션 버튼인지 함께 읽어줘요.
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
            { action.label }
          </Button>
        </Box>
      ) }
    </Box>
  );
}

export default HomeSection;
