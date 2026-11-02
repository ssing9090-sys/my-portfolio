import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import profilePhoto from '../../assets/profile.jpg';

const PROFILE = {
  name: '김현진',
  photo: profilePhoto,
  role: '하나씩 배우며 성장 중인 웹 개발자 지망생',
  description: 'React 로 따뜻하고 친근한 화면을 만드는 연습을 하고 있어요. 매일 배운 것을 이 포트폴리오에 차곡차곡 기록하고 있습니다.',
};

/** 이 포트폴리오를 만들며 실제로 사용한 기술 */
const TECH_TAGS = ['React', 'JavaScript', 'MUI', 'Supabase'];

/** 프로필 주변에 떠 있는 카카오톡 스타일 말풍선 */
const FLOATING_BUBBLES = [
  { id: 'hello', text: '반가워요! 👋', position: { top: -8, left: { xs: -72, md: -84 } }, delay: '0s' },
  { id: 'study', text: '오늘도 공부 중 📚', position: { top: '44%', right: { xs: -104, md: -108 } }, delay: '0.8s' },
  { id: 'guestbook', text: '방명록 남겨주세요 💌', position: { bottom: -12, left: { xs: -80, md: -96 } }, delay: '1.6s' },
];

/** 같은 페이지의 섹션으로 부드럽게 스크롤 (HashRouter 라서 #앵커 링크 대신 사용) */
function scrollToSection(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * HeroSection 컴포넌트
 *
 * Home 페이지 맨 위 Hero 섹션. 인사말·이름·소개·기술 태그·CTA 버튼(왼쪽)과
 * 말풍선이 떠 있는 프로필 사진(오른쪽)를 좌우로 배치한다. (모바일은 세로 배치)
 *
 * Props:
 * @param {string} id - 섹션 앵커 id [Optional, 기본값: 'hero']
 * @param {string} contactId - '연락하기' 버튼이 이동할 섹션 id [Optional, 기본값: 'contact']
 *
 * Example usage:
 * <HeroSection id="hero" contactId="contact" />
 */
function HeroSection({ id = 'hero', contactId = 'contact' }) {
  return (
    <Box
      id={ id }
      component="section"
      aria-labelledby={ `${id}-title` }
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 3,
        border: 1,
        borderColor: 'primary.border',
        borderLeft: 6,
        borderLeftColor: 'primary.main',
        background: (theme) => `linear-gradient(135deg, ${theme.vars.palette.primary.light} 0%, ${theme.vars.palette.background.paper} 70%)`,
        px: { xs: 2.5, md: 6 },
        py: { xs: 5, md: 8 },
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1.3fr 1fr' },
        alignItems: 'center',
        gap: { xs: 5, md: 4 },
        '@keyframes heroFloat': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        '@keyframes heroFadeUp': {
          from: { opacity: 0, transform: 'translateY(12px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        '@media (prefers-reduced-motion: reduce)': {
          '& *': { animation: 'none !important' },
        },
      }}
    >
      { /* 왼쪽: 소개 글 */ }
      <Box sx={{ order: { xs: 2, md: 1 }, animation: 'heroFadeUp 0.6s ease-out' }}>
        <Chip
          label="👋 안녕하세요!"
          sx={{
            mb: 2,
            bgcolor: 'background.paper',
            color: 'primary.dark',
            fontWeight: 700,
            border: 1,
            borderColor: 'primary.border',
          }}
        />
        <Typography
          id={ `${id}-title` }
          component="h1"
          sx={{
            fontSize: { xs: '2rem', md: '2.75rem' },
            fontWeight: 800,
            lineHeight: 1.25,
            color: 'text.primary',
            wordBreak: 'keep-all',
          }}
        >
          저는{ ' ' }
          <Box
            component="span"
            sx={{
              color: 'primary.dark',
              background: (theme) => `linear-gradient(transparent 62%, ${theme.vars.palette.primary.border} 62%)`,
            }}
          >
            { PROFILE.name }
          </Box>
          입니다
        </Typography>
        <Typography
          sx={{ mt: 1.5, fontSize: { xs: '1.05rem', md: '1.25rem' }, fontWeight: 700, color: 'text.primary', wordBreak: 'keep-all' }}
        >
          { PROFILE.role }
        </Typography>
        <Typography
          sx={{ mt: 1.5, fontSize: { xs: '0.95rem', md: '1.05rem' }, lineHeight: 1.7, color: 'text.secondary', wordBreak: 'keep-all' }}
        >
          { PROFILE.description }
        </Typography>

        <Box component="ul" aria-label="사용 기술" sx={{ listStyle: 'none', m: 0, p: 0, mt: 2.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          { TECH_TAGS.map((tag) => (
            <Box
              component="li"
              key={ tag }
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 5,
                bgcolor: 'primary.light',
                color: 'primary.dark',
                fontSize: '0.85rem',
                fontWeight: 700,
              }}
            >
              # { tag }
            </Box>
          )) }
        </Box>

        <Box sx={{ mt: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5 }}>
          <Button
            component={ Link }
            to="/projects"
            variant="contained"
            disableElevation
            endIcon={ <ArrowForwardRoundedIcon /> }
            sx={{
              minHeight: 52,
              px: 3.5,
              borderRadius: 4,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontSize: '1rem',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            프로젝트 보기
          </Button>
          <Button
            onClick={ () => scrollToSection(contactId) }
            variant="outlined"
            startIcon={ <ChatBubbleRoundedIcon /> }
            sx={{
              minHeight: 52,
              px: 3.5,
              borderRadius: 4,
              bgcolor: 'background.paper',
              borderColor: 'primary.border',
              color: 'primary.dark',
              fontSize: '1rem',
              '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.light' },
            }}
          >
            연락하기
          </Button>
        </Box>
      </Box>

      { /* 오른쪽: 프로필 사진 + 떠 있는 말풍선 */ }
      <Box
        sx={{
          order: { xs: 1, md: 2 },
          position: 'relative',
          justifySelf: 'center',
          width: { xs: 130, md: 160 },
          height: { xs: 130, md: 160 },
        }}
      >
        { /* 핑크 테두리 + 흰 여백 링 안에 사진을 둔다 */ }
        <Box
          sx={{
            width: '100%',
            height: '100%',
            p: { xs: 1, md: 1.25 },
            borderRadius: '50%',
            bgcolor: 'background.paper',
            border: 4,
            borderColor: 'primary.border',
            boxShadow: '0 12px 32px rgba(214, 58, 122, 0.18)',
            animation: 'heroFloat 4s ease-in-out infinite',
          }}
        >
          <Box
            component="img"
            src={ PROFILE.photo }
            alt={ `${PROFILE.name} 프로필 사진` }
            width={ 160 }
            height={ 160 }
            sx={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              borderRadius: '50%',
            }}
          />
        </Box>

        { FLOATING_BUBBLES.map((bubble) => (
          <Box
            key={ bubble.id }
            aria-hidden
            sx={{
              position: 'absolute',
              ...bubble.position,
              px: 1.5,
              py: 0.75,
              borderRadius: '16px 16px 16px 4px',
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'primary.border',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              fontSize: { xs: '0.75rem', md: '0.85rem' },
              fontWeight: 700,
              color: 'text.primary',
              whiteSpace: 'nowrap',
              animation: 'heroFloat 3.5s ease-in-out infinite',
              animationDelay: bubble.delay,
            }}
          >
            { bubble.text }
          </Box>
        )) }
      </Box>
    </Box>
  );
}

export default HeroSection;
