import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import profilePhoto from '../../assets/profile.jpg';
import { SKILL_CATEGORIES, SKILL_ICONS } from '../../data/skills-data.js';
import { useHomeData } from '../../hooks/use-portfolio.js';
import { INK, SERIF_FONT } from '../../theme.js';
import { OUTLINE_BADGE_SX, PILL_DARK_SX, SECTION_INNER_SX } from './landing-styles.js';

/** Hero 전용 문구 (이름·사진·경력은 About Me 탭의 기본 정보를 따라가요) */
const ROLE = '하나씩 배우며 성장 중인 웹 개발자 지망생';

/** 스킬 방울을 HELLO 버튼 둘레에 부채꼴로 놓을 때의 반지름(px)과 각도 범위(도) */
const ARC = { radius: 138, from: 200, to: 60 };
const BUBBLE_SIZE = 52;
const HELLO_SIZE = 150;

/** i 번째 방울의 위치: HELLO 버튼 중심 기준 원 둘레 위 한 점 */
function getBubblePosition(index, count) {
  const angle = count === 1 ? 90 : ARC.from + ((ARC.to - ARC.from) * index) / (count - 1);
  const radian = (angle * Math.PI) / 180;
  return {
    left: HELLO_SIZE / 2 + ARC.radius * Math.cos(radian) - BUBBLE_SIZE / 2,
    top: HELLO_SIZE / 2 - ARC.radius * Math.sin(radian) - BUBBLE_SIZE / 2,
  };
}

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
 * (모바일은 세로로 쌓아요)
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
        pt: { xs: 5, md: 6 },
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
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            textShadow: '0 2px 24px rgba(18, 18, 18, 0.08)',
            animation: 'heroRise 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both',
          }}
        >
          <Box
            component="span"
            sx={{ fontFamily: SERIF_FONT, fontSize: { xs: 'clamp(2.5rem, 12vw, 4rem)', md: 'clamp(4rem, 8vw, 7.5rem)' }, mr: { md: 3 } }}
          >
            Hello, I&apos;m
          </Box>
          { ' ' }
          <Box component="br" sx={{ display: { md: 'none' } }} />
          <Box component="span" sx={{ fontWeight: 900, fontSize: { xs: 'clamp(3rem, 15vw, 5rem)', md: 'clamp(4.5rem, 9vw, 8.5rem)' } }}>
            { name }
          </Box>
        </Typography>

        <Box
          sx={{
            mt: { xs: 3, md: 2 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr' },
            alignItems: 'end',
            gap: { xs: 4, md: 3 },
          }}
        >
          { /* 왼쪽 아래: 소개 */ }
          <Box sx={{ order: { xs: 2, md: 1 }, pb: { md: 7 }, animation: 'heroRise 0.8s 0.25s cubic-bezier(0.2, 0.8, 0.2, 1) both' }}>
            <Box sx={{ ...OUTLINE_BADGE_SX, color: INK }}>
              { experience ? `${experience} · ` : '' }FRONTEND
            </Box>
            <Typography
              component="p"
              sx={{ mt: 1.5, fontWeight: 900, fontSize: { xs: '2.25rem', md: 'clamp(2rem, 3vw, 2.75rem)' }, lineHeight: 1, letterSpacing: '-0.03em', color: INK }}
            >
              FRONTEND{ ' ' }
              <br />
              DEVELOPER
            </Typography>
            <Typography sx={{ mt: 1.5, fontSize: { xs: '1rem', md: '1.1rem' }, fontWeight: 500, color: INK, wordBreak: 'keep-all' }}>
              { ROLE }
            </Typography>
            <Button component={ Link } to="/projects" endIcon={ <ArrowForwardRoundedIcon /> } sx={{ ...PILL_DARK_SX, mt: 3 }}>
              View projects
            </Button>
          </Box>

          { /* 가운데: 아치형 프로필 사진 (섹션 아래 끝에 붙어요) */ }
          <Box
            sx={{
              order: { xs: 1, md: 2 },
              justifySelf: 'center',
              width: { xs: 'min(72vw, 300px)', md: 'clamp(280px, 26vw, 380px)' },
              aspectRatio: '4 / 5',
              borderRadius: { xs: '999px 999px 32px 32px', md: '999px 999px 0 0' },
              overflow: 'hidden',
              bgcolor: 'rgba(255, 255, 255, 0.35)',
              border: '6px solid #FFFFFF',
              borderBottomWidth: { xs: 6, md: 0 },
              animation: 'heroRise 0.9s 0.1s cubic-bezier(0.2, 0.8, 0.2, 1) both',
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
              justifySelf: { xs: 'center', md: 'end' },
              position: 'relative',
              width: HELLO_SIZE,
              height: HELLO_SIZE,
              mt: { xs: 14, md: 0 },
              mb: { xs: 5, md: 6 },
              mr: { md: 2 },
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
                      width: BUBBLE_SIZE,
                      height: BUBBLE_SIZE,
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: '50%',
                      bgcolor: category.color,
                      border: '3px solid #FFFFFF',
                      fontSize: '1.4rem',
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
                fontSize: '1.6rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                boxShadow: '0 0 0 14px rgba(18, 18, 18, 0.18)',
                transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s',
                '@media (hover: hover)': { '&:hover': { transform: 'scale(1.06)', color: '#19E05A' } },
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
