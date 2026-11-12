import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import profilePhoto from '../../assets/profile.jpg';
import { INSTAGRAM_URL } from '../../data/profile-links.js';
import { SKILL_CATEGORIES, SKILL_ICONS } from '../../data/skills-data.js';
import { useHomeData } from '../../hooks/use-portfolio.js';
import { INK, SERIF_FONT, VIVID } from '../../theme.js';
import { OUTLINE_BADGE_SX, PILL_DARK_SX, SECTION_INNER_SX } from './landing-styles.js';

/** Hero 전용 문구 (이름·사진·경력은 About Me 탭의 기본 정보를 따라가요) */
const ROLE = '하나씩 배우며 성장 중인 웹 개발자 지망생';

/*
 * 반응형 기준 (theme.js 의 breakpoints)
 * - 모바일   xs     (~767px)   : 인사말 → 사진 → 소개 → HELLO 순서로 세로로 쌓아요
 * - 태블릿   tablet (768~1199) : 소개 · 사진 · HELLO 세 칸, 크기를 한 단계 줄여요
 * - 데스크톱 lg     (1200px~)  : 세 칸, 큰 인사말과 넉넉한 여백
 */

/** HELLO 버튼 지름(px). 스킬 방울 위치는 이 크기에 대한 비율이라 함께 커지고 작아져요. */
const HELLO_SIZE = { xs: 140, tablet: 120, lg: 150 };
/** 방울 지름과 부채꼴 반지름 (HELLO 지름 대비 비율) */
const BUBBLE_RATIO = 0.35;
const RADIUS_RATIO = 0.92;
/** 부채꼴 각도 범위(도): 왼쪽 아래 → 오른쪽 위 */
const ARC = { from: 200, to: 60 };

/** i 번째 방울의 위치(%): HELLO 버튼 중심 기준 원 둘레 위 한 점 */
function getBubblePosition(index, count) {
  const angle = count === 1 ? 90 : ARC.from + ((ARC.to - ARC.from) * index) / (count - 1);
  const radian = (angle * Math.PI) / 180;
  const toPercent = (value) => `${(value * 100).toFixed(2)}%`;
  return {
    left: toPercent(0.5 + RADIUS_RATIO * Math.cos(radian) - BUBBLE_RATIO / 2),
    top: toPercent(0.5 - RADIUS_RATIO * Math.sin(radian) - BUBBLE_RATIO / 2),
  };
}

/** 사진에 마우스를 올렸을 때 강조 */
const HOVER_HIGHLIGHT_SX = {
  borderColor: VIVID.green.main,
  boxShadow: '0 0 0 6px rgba(18, 18, 18, 0.85), 0 28px 56px -12px rgba(18, 18, 18, 0.55)',
  '& img': { transform: 'scale(1.04)' },
};

/** 같은 페이지의 섹션으로 부드럽게 스크롤 (HashRouter 라서 #앵커 링크 대신 사용) */
function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  target?.focus({ preventScroll: true });
}

/**
 * HeroSection 컴포넌트
 *
 * 홈 맨 위 풀폭 Hero. 세리프 + 초굵은 글씨를 섞은 큰 인사말, 가운데 아치형 프로필 사진,
 * 왼쪽 아래 소개(경력 배지·직무·프로젝트 버튼), 오른쪽 아래 주요 스킬 방울과 HELLO 원형 버튼.
 * 모바일은 세로로 쌓고, 프로젝트 버튼을 전체 너비로 키워 누르기 쉽게 해요.
 *
 * Props:
 * @param {string} id - 섹션 앵커 id [Optional, 기본값: 'hero']
 * @param {string} contactId - HELLO 버튼이 이동할 섹션 id [Optional, 기본값: 'contact']
 *
 * Example usage:
 * <HeroSection id="hero" contactId="contact" />
 */
function HeroSection({ id = 'hero', contactId = 'contact' }) {
  const { basicInfo, skills } = useHomeData();
  const [failedPhoto, setFailedPhoto] = useState('');
  // 크기·간격은 sx 반응형 값(CSS)으로, 버튼 모양처럼 구조가 바뀌는 것만 useMediaQuery 로 나눠요.
  // noSsr: 첫 렌더부터 실제 화면 크기를 읽어서 버튼이 한 번 깜빡 바뀌지 않게 해요.
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('tablet'), { noSsr: true });
  const name = basicInfo.name.trim() || '프론트엔드 개발자';
  const experience = basicInfo.experience.trim();
  // 첫 화면 사진이라 lazy 로딩하지 않고, 주소가 비었거나 깨지면 기본 사진을 쓴다.
  const photo = basicInfo.photo && basicInfo.photo !== failedPhoto ? basicInfo.photo : profilePhoto;

  return (
    <Box
      id={ id }
      component="section"
      aria-labelledby={ `${id}-title` }
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #D5E8EA 0%, #A7C3C7 100%)',
        pt: { xs: 5, tablet: 5, lg: 6 },
        '@keyframes heroRise': {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'none' },
        },
        '@keyframes heroPop': {
          from: { opacity: 0, transform: 'scale(0.4)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
        '@media (prefers-reduced-motion: reduce)': { '& *': { animation: 'none !important' } },
      }}
    >
      <Box sx={ SECTION_INNER_SX }>
        { /* 큰 인사말 */ }
        <Typography
          id={ `${id}-title` }
          component="h1"
          sx={{
            m: 0,
            textAlign: 'center',
            color: '#FFFFFF',
            // 모바일은 두 줄로 쌓여서 줄 간격을 조금 띄워요.
            lineHeight: { xs: 1.08, tablet: 0.95 },
            letterSpacing: '-0.03em',
            textShadow: '0 2px 24px rgba(18, 18, 18, 0.08)',
            wordBreak: 'keep-all',
            animation: 'heroRise 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both',
          }}
        >
          <Box
            component="span"
            sx={{
              fontFamily: SERIF_FONT,
              fontSize: { xs: 'clamp(2rem, 9.5vw, 2.75rem)', tablet: 'clamp(3.25rem, 7.5vw, 5.5rem)', lg: 'clamp(5rem, 7.5vw, 7.5rem)' },
              mr: { tablet: 2, lg: 3 },
            }}
          >
            Hello, I&apos;m
          </Box>
          { ' ' }
          { /* 모바일만 이름을 다음 줄로 내려요 */ }
          <Box component="br" sx={{ display: { tablet: 'none' } }} />
          <Box
            component="span"
            sx={{
              fontWeight: 900,
              fontSize: { xs: 'clamp(2.5rem, 12vw, 3.25rem)', tablet: 'clamp(3.75rem, 8.5vw, 6.25rem)', lg: 'clamp(5.75rem, 8.5vw, 8.5rem)' },
            }}
          >
            { name }
          </Box>
        </Typography>

        <Box
          sx={{
            mt: { xs: 2.5, tablet: 2 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', tablet: 'minmax(0, 1fr) auto minmax(0, 1fr)' },
            alignItems: 'end',
            gap: { xs: 3, tablet: 2, lg: 3 },
          }}
        >
          { /* 왼쪽 아래: 소개 */ }
          <Box
            sx={{
              order: { xs: 2, tablet: 1 },
              pb: { tablet: 5, lg: 7 },
              animation: 'heroRise 0.8s 0.25s cubic-bezier(0.2, 0.8, 0.2, 1) both',
            }}
          >
            <Box sx={{ ...OUTLINE_BADGE_SX, color: INK }}>
              { experience ? `${experience} · ` : '' }FRONTEND
            </Box>
            <Typography
              component="p"
              sx={{
                mt: 1.5,
                fontWeight: 900,
                fontSize: { xs: '2.25rem', tablet: 'clamp(1.6rem, 3.2vw, 2.1rem)', lg: 'clamp(2.2rem, 3vw, 2.75rem)' },
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: INK,
              }}
            >
              FRONTEND{ ' ' }
              <br />
              DEVELOPER
            </Typography>
            <Typography
              sx={{
                mt: 1.5,
                fontSize: { xs: '1rem', tablet: '0.98rem', lg: '1.1rem' },
                lineHeight: 1.6,
                fontWeight: 500,
                color: INK,
                wordBreak: 'keep-all',
              }}
            >
              { ROLE }
            </Typography>
            <Button
              component={ Link }
              to="/projects"
              fullWidth={ isMobile }
              endIcon={ <ArrowForwardRoundedIcon /> }
              sx={{
                ...PILL_DARK_SX,
                mt: 3,
                // 터치 대상은 권장 최소 44px 보다 여유 있게
                minHeight: { xs: 52, lg: 56 },
                maxWidth: { xs: 480, tablet: 'none' },
                px: { xs: 3, tablet: 2.5, lg: 4 },
              }}
            >
              View projects
            </Button>
          </Box>

          { /* 가운데: 아치형 프로필 사진 = 인스타그램 링크 (태블릿 이상은 섹션 아래 끝에 붙어요) */ }
          <Box
            component="a"
            href={ INSTAGRAM_URL }
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ `${name} 인스타그램 새 탭으로 열기` }
            sx={{
              display: 'block',
              position: 'relative',
              order: { xs: 1, tablet: 2 },
              justifySelf: 'center',
              width: { xs: 'min(62vw, 260px)', tablet: 'clamp(220px, 28vw, 300px)', lg: 'clamp(300px, 26vw, 380px)' },
              aspectRatio: '4 / 5',
              borderRadius: { xs: '999px 999px 32px 32px', tablet: '999px 999px 0 0' },
              overflow: 'hidden',
              bgcolor: 'rgba(255, 255, 255, 0.35)',
              border: { xs: '5px solid #FFFFFF', lg: '6px solid #FFFFFF' },
              borderBottomWidth: { xs: 5, tablet: 0 },
              boxShadow: '0 0 0 0 rgba(18, 18, 18, 0)',
              cursor: 'pointer',
              animation: 'heroRise 0.9s 0.1s cubic-bezier(0.2, 0.8, 0.2, 1) both',
              transition: 'border-color 0.25s ease, box-shadow 0.3s ease',
              '& img': { transition: 'transform 0.4s ease' },
              // 마우스를 올리거나 키보드로 고르면: 초록 테두리 + 진한 그림자 + 사진 살짝 확대
              '@media (hover: hover)': { '&:hover': HOVER_HIGHLIGHT_SX },
              '&:focus-visible': HOVER_HIGHLIGHT_SX,
              '@media (prefers-reduced-motion: reduce)': { transition: 'none', '& img': { transition: 'none' } },
            }}
          >
            <Box
              component="img"
              src={ photo }
              alt={ `${name} 프로필 사진` }
              onError={ () => setFailedPhoto(basicInfo.photo) }
              width={ 380 }
              height={ 475 }
              // 첫 화면의 가장 큰 이미지라 lazy 대신 먼저 불러온다.
              fetchPriority="high"
              decoding="async"
              sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          </Box>

          { /* 오른쪽 아래: 주요 스킬 방울 + HELLO 버튼 */ }
          <Box
            sx={{
              order: 3,
              justifySelf: { xs: 'center', tablet: 'end' },
              position: 'relative',
              width: HELLO_SIZE,
              height: HELLO_SIZE,
              // 방울이 버튼 위로 솟아 있어서 그만큼 위 공간을 비워 둬요.
              mt: { xs: 13, tablet: 0 },
              mb: { xs: 5, tablet: 5, lg: 6 },
              mr: { tablet: 1, lg: 2 },
            }}
          >
            <Box component="ul" aria-label="주요 스킬" sx={{ listStyle: 'none', m: 0, p: 0 }}>
              { skills.map((skill, index) => {
                const category = SKILL_CATEGORIES[skill.category] ?? SKILL_CATEGORIES.Tools;
                return (
                  <Box
                    component="li"
                    key={ skill.id }
                    title={ `${skill.name} ${skill.level}%` }
                    sx={{
                      position: 'absolute',
                      ...getBubblePosition(index, skills.length),
                      width: `${BUBBLE_RATIO * 100}%`,
                      aspectRatio: '1',
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: '50%',
                      bgcolor: category.color,
                      border: '3px solid #FFFFFF',
                      fontSize: { xs: '1.3rem', tablet: '1.1rem', lg: '1.4rem' },
                      boxShadow: '0 6px 16px rgba(18, 18, 18, 0.15)',
                      animation: `heroPop 0.5s ${0.5 + index * 0.08}s cubic-bezier(0.34, 1.56, 0.64, 1) both`,
                      transition: 'transform 0.2s',
                      '@media (hover: hover)': { '&:hover': { transform: 'scale(1.15)' } },
                    }}
                  >
                    <span aria-hidden="true">{ SKILL_ICONS[skill.icon] ?? '✨' }</span>
                    <Box component="span" sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                      { skill.name }
                    </Box>
                  </Box>
                );
              }) }
            </Box>
            <Box
              component="button"
              type="button"
              onClick={ () => scrollToSection(contactId) }
              aria-label="연락하기: Contact 섹션으로 이동"
              sx={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: 'none',
                bgcolor: INK,
                color: '#FFFFFF',
                fontFamily: 'inherit',
                fontSize: { xs: '1.5rem', tablet: '1.3rem', lg: '1.6rem' },
                fontWeight: 800,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                boxShadow: { xs: '0 0 0 12px rgba(18, 18, 18, 0.18)', lg: '0 0 0 14px rgba(18, 18, 18, 0.18)' },
                transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s',
                '@media (hover: hover)': { '&:hover': { transform: 'scale(1.06)', color: VIVID.green.main } },
                '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
              }}
            >
              HELLO
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HeroSection;
