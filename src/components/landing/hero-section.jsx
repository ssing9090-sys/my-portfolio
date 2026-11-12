import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import heroPhoto from '../../assets/hero-photo.jpg';
import { GITHUB_URL } from '../../data/profile-links.js';
import { SKILL_ICONS } from '../../data/skills-data.js';
import { useHomeData } from '../../hooks/use-portfolio.js';
import useProjects from '../../hooks/use-projects.js';
import { INK, SERIF_FONT, VIVID } from '../../theme.js';
import { OUTLINE_BADGE_SX, SECTION_INNER_SX } from './landing-styles.js';

/** Hero 문구 (이름·사진·경력은 About Me 탭의 기본 정보를 따라가요) */
const COPY = {
  valueProp: '디자인과 코드 사이의 간극을 메우는 프론트엔드 개발자',
  motto: 'I design it, then I build it.',
  intro: 'React로 사용자가 머무는 화면을 만들고, Supabase로 실제 데이터를 연결해요. 이 사이트도 그렇게 만들었어요.',
};

/** 이 포트폴리오를 만들며 실제로 사용한 기술 */
const TECH_STACK = ['React', 'JavaScript', 'MUI', 'Supabase'];

/** 사진 둘레 스킬 칩 자리 (최대 4개) */
const CHIP_SLOTS = [
  { top: '6%', left: 0 },
  { top: '30%', right: 0 },
  { bottom: '28%', left: 0 },
  { bottom: '6%', right: 0 },
];

/** 같은 페이지의 섹션으로 부드럽게 스크롤 (HashRouter 라서 #앵커 링크 대신 사용) */
function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  target?.focus({ preventScroll: true });
}

const PILL_SX = {
  minHeight: { xs: 52, md: 58 },
  px: { xs: 3, md: 4 },
  fontSize: { xs: '1rem', md: '1.05rem' },
  fontWeight: 800,
  transition: 'transform 0.2s, background-color 0.2s',
  '@media (hover: hover)': { '&:hover': { transform: 'translateY(-2px)' } },
};

/**
 * HeroSection 컴포넌트
 *
 * 홈 맨 위 풀폭 Hero (형광 파랑 배경).
 * 왼쪽: 경력 배지 · 인사 + 가치 제안(h1) · 한 줄 소개 · 증거 칩(기술 스택·배포한 프로젝트 수) · CTA 버튼
 * 오른쪽: 아치형 프로필 사진 + 이름이 보이는 주요 스킬 칩
 * 모바일은 글과 버튼이 먼저 나와 첫 화면 안에 CTA 가 보인다.
 *
 * Props:
 * @param {string} id - 섹션 앵커 id [Optional, 기본값: 'hero']
 * @param {string} contactId - '연락하기' 버튼이 이동할 섹션 id [Optional, 기본값: 'contact']
 *
 * Example usage:
 * <HeroSection id="hero" contactId="contact" />
 */
function HeroSection({ id = 'hero', contactId = 'contact' }) {
  const { basicInfo, skills } = useHomeData();
  const { projects, isLoading: isProjectsLoading, error: projectsError } = useProjects();
  const name = basicInfo.name.trim() || '프론트엔드 개발자';
  const experience = basicInfo.experience.trim();
  const projectCount = !isProjectsLoading && !projectsError ? projects.length : 0;
  const chipSkills = skills.slice(0, CHIP_SLOTS.length);

  return (
    <Box
      id={ id }
      component="section"
      aria-labelledby={ `${id}-title` }
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(160deg, ${VIVID.blue.main} 0%, #0757D6 100%)`,
        color: '#FFFFFF',
        py: { xs: 5, md: 9 },
        minHeight: { md: 'calc(100svh - 76px)' },
        display: 'flex',
        alignItems: 'center',
        '@keyframes heroRise': {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'none' },
        },
        '@keyframes heroPop': {
          from: { opacity: 0, transform: 'scale(0.5)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
        '@keyframes heroFloat': {
          '0%, 100%': { translate: '0 0' },
          '50%': { translate: '0 -6px' },
        },
        '@media (prefers-reduced-motion: reduce)': { '& *': { animation: 'none !important' } },
      }}
    >
      <Box
        sx={{
          ...SECTION_INNER_SX,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.2fr) minmax(0, 0.8fr)' },
          alignItems: 'center',
          gap: { xs: 5, md: 6 },
        }}
      >
        { /* 왼쪽: 메시지 + CTA */ }
        <Box sx={{ animation: 'heroRise 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both' }}>
          <Box sx={{ ...OUTLINE_BADGE_SX, fontSize: '0.85rem' }}>
            { experience ? `${experience} ` : '' }프론트엔드 개발자
          </Box>

          <Typography id={ `${id}-title` } component="h1" sx={{ mt: 2.5, color: '#FFFFFF', wordBreak: 'keep-all' }}>
            <Box component="span" sx={{ display: 'block', fontSize: { xs: '1.75rem', md: '2.4rem' }, lineHeight: 1.2 }}>
              <Box component="span" sx={{ fontFamily: SERIF_FONT }}>Hello, I&apos;m</Box>
              { ' ' }
              <Box component="span" sx={{ fontWeight: 800 }}>{ name }</Box>
            </Box>
            { ' ' }
            <Box
              component="span"
              sx={{
                display: 'block',
                mt: { xs: 1.5, md: 2 },
                fontWeight: 900,
                fontSize: { xs: 'clamp(2.1rem, 9.5vw, 3rem)', md: 'clamp(2.75rem, 4.4vw, 4.4rem)' },
                lineHeight: 1.12,
                letterSpacing: '-0.04em',
              }}
            >
              { COPY.valueProp }
            </Box>
          </Typography>

          <Typography sx={{ mt: { xs: 2.5, md: 3 }, fontFamily: SERIF_FONT, fontStyle: 'italic', fontSize: { xs: '1.5rem', md: '1.6rem' }, color: VIVID.yellow.main }}>
            { COPY.motto }
          </Typography>
          <Typography sx={{ mt: 1, maxWidth: 560, fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.65, fontWeight: 500, color: 'rgba(255, 255, 255, 0.9)', wordBreak: 'keep-all' }}>
            { COPY.intro }
          </Typography>

          { /* 증거: 기술 스택 + 배포한 프로젝트 수 */ }
          <Box component="ul" aria-label="사용 기술과 성과" sx={{ listStyle: 'none', m: 0, p: 0, mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            { projectCount > 0 && (
              <Box
                component="li"
                sx={{ px: 1.75, py: 0.75, borderRadius: 999, bgcolor: '#FFFFFF', color: INK, fontSize: '0.9rem', fontWeight: 800 }}
              >
                🚀 배포한 프로젝트 { projectCount }개
              </Box>
            ) }
            { TECH_STACK.map((tech) => (
              <Box
                component="li"
                key={ tech }
                sx={{ px: 1.75, py: 0.6, borderRadius: 999, border: '2px solid rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', fontWeight: 700 }}
              >
                { tech }
              </Box>
            )) }
          </Box>

          { /* CTA: 주 버튼(프로젝트) > 보조(연락하기·GitHub) */ }
          <Box sx={{ mt: { xs: 3.5, md: 4.5 }, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
            <Button
              component={ Link }
              to="/projects"
              endIcon={ <ArrowForwardRoundedIcon /> }
              sx={{
                ...PILL_SX,
                flex: { xs: '1 1 100%', sm: '0 0 auto' },
                bgcolor: VIVID.yellow.main,
                color: INK,
                boxShadow: '0 10px 24px -10px rgba(0, 0, 0, 0.45)',
                '&:hover': { bgcolor: '#FFFFFF' },
              }}
            >
              프로젝트 보기
            </Button>
            <Button
              variant="outlined"
              onClick={ () => scrollToSection(contactId) }
              sx={{
                ...PILL_SX,
                flex: { xs: '1 1 auto', sm: '0 0 auto' },
                borderColor: 'rgba(255, 255, 255, 0.8)',
                color: '#FFFFFF',
                '&:hover': { borderColor: '#FFFFFF', bgcolor: 'rgba(255, 255, 255, 0.12)' },
              }}
            >
              연락하기
            </Button>
            <IconButton
              component="a"
              href={ GITHUB_URL }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub 프로필 새 탭으로 열기"
              sx={{
                width: { xs: 52, md: 58 },
                height: { xs: 52, md: 58 },
                border: '2px solid rgba(255, 255, 255, 0.8)',
                color: '#FFFFFF',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.12)', borderColor: '#FFFFFF' },
              }}
            >
              <GitHubIcon />
            </IconButton>
          </Box>
        </Box>

        { /* 오른쪽: 아치형 사진 + 이름이 보이는 스킬 칩 */ }
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: { xs: 380, md: 520 },
            mx: 'auto',
            py: 2,
            display: 'flex',
            justifyContent: 'center',
            animation: 'heroRise 0.9s 0.15s cubic-bezier(0.2, 0.8, 0.2, 1) both',
          }}
        >
          <Box
            component="img"
            // 첫 화면은 자연스러운 작업 사진으로 고정 (About 탭 프로필 사진과는 따로 관리)
            src={ heroPhoto }
            alt={ `노트북 앞에서 작업 중인 ${name}` }
            width={ 800 }
            height={ 1000 }
            // 첫 화면의 가장 큰 이미지라 lazy 대신 먼저 불러온다.
            fetchPriority="high"
            decoding="async"
            sx={{
              display: 'block',
              width: { xs: 'min(60vw, 250px)', md: 'clamp(260px, 24vw, 360px)' },
              height: 'auto',
              aspectRatio: '4 / 5',
              objectFit: 'cover',
              objectPosition: 'center 30%',
              borderRadius: '999px 999px 36px 36px',
              border: '6px solid #FFFFFF',
              bgcolor: VIVID.sky.main,
              boxShadow: '0 30px 60px -24px rgba(0, 0, 0, 0.5)',
            }}
          />

          { chipSkills.length > 0 && (
            <Box component="ul" aria-label="주요 스킬" sx={{ listStyle: 'none', m: 0, p: 0 }}>
              { chipSkills.map((skill, index) => (
                <Box
                  component="li"
                  key={ skill.id }
                  sx={{
                    position: 'absolute',
                    ...CHIP_SLOTS[index],
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    pl: 0.75,
                    pr: 1.5,
                    py: 0.6,
                    borderRadius: 999,
                    bgcolor: '#FFFFFF',
                    color: INK,
                    fontSize: { xs: '0.82rem', md: '0.92rem' },
                    fontWeight: 800,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 10px 24px -8px rgba(0, 0, 0, 0.35)',
                    animation: `heroPop 0.5s ${0.5 + index * 0.1}s cubic-bezier(0.34, 1.56, 0.64, 1) both, heroFloat 4s ${1 + index * 0.4}s ease-in-out infinite`,
                  }}
                >
                  <Box
                    component="span"
                    aria-hidden="true"
                    sx={{ width: 28, height: 28, display: 'grid', placeItems: 'center', borderRadius: '50%', bgcolor: VIVID.sky.main, fontSize: '0.95rem' }}
                  >
                    { SKILL_ICONS[skill.icon] ?? '✨' }
                  </Box>
                  { skill.name }
                  <Box component="span" sx={{ color: VIVID.blue.main, fontVariantNumeric: 'tabular-nums' }}>
                    { skill.level }%
                  </Box>
                </Box>
              )) }
            </Box>
          ) }
        </Box>
      </Box>
    </Box>
  );
}

export default HeroSection;
