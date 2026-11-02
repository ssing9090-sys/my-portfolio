import Stack from '@mui/material/Stack';
import ContactSection from '../components/landing/contact-section.jsx';
import SectionCard from '../components/landing/section-card.jsx';

const SECTIONS = [
  {
    id: 'hero',
    title: 'Hero',
    description: '여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.',
    isHighlighted: true,
  },
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
      { SECTIONS.map((section, index) => (
        <SectionCard
          key={ section.id }
          id={ section.id }
          order={ String(index + 1).padStart(2, '0') }
          title={ section.title }
          description={ section.description }
          isHighlighted={ section.isHighlighted }
        />
      )) }
      <ContactSection id="contact" order={ String(SECTIONS.length + 1).padStart(2, '0') } />
    </Stack>
  );
}

export default HomePage;
