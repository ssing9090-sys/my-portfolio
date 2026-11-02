import Stack from '@mui/material/Stack';
import ContactSection from '../components/landing/contact-section.jsx';
import HeroSection from '../components/landing/hero-section.jsx';
import SectionCard from '../components/landing/section-card.jsx';

/** Hero 다음에 이어지는, 아직 개발 전인 섹션들 */
const SECTIONS = [
  {
    id: 'about',
    title: 'About Me',
    description: '여기는 About Me 섹션입니다. 간단한 자기소개와 \'더 알아보기\' 버튼이 들어갈 예정입니다.',
  },
  {
    id: 'skills',
    title: 'Skill Tree',
    description: '여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.',
  },
  {
    id: 'projects',
    title: 'Projects',
    description: '여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 \'더 보기\' 버튼이 들어갈 예정입니다.',
  },
];

/** 섹션 순번을 '02' 형태로 변환 (Hero 가 01 이라 2번부터 시작) */
const toOrder = (index) => String(index + 2).padStart(2, '0');

/**
 * HomePage 컴포넌트
 *
 * Hero, About Me, Skill Tree, Projects, Contact 5개 섹션으로 구성된 메인 페이지.
 *
 * Props: 없음
 *
 * Example usage:
 * <HomePage />
 */
function HomePage() {
  return (
    <Stack spacing={{ xs: 2, md: 3 }}>
      <HeroSection id="hero" contactId="contact" />
      { SECTIONS.map((section, index) => (
        <SectionCard
          key={ section.id }
          id={ section.id }
          order={ toOrder(index) }
          title={ section.title }
          description={ section.description }
        />
      )) }
      <ContactSection id="contact" order={ toOrder(SECTIONS.length) } />
    </Stack>
  );
}

export default HomePage;
