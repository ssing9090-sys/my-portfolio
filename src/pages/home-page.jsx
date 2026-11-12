import Box from '@mui/material/Box';
import AboutPreviewSection from '../components/landing/about-preview-section.jsx';
import ContactSection from '../components/landing/contact-section.jsx';
import HeroSection from '../components/landing/hero-section.jsx';
import ProjectsSection from '../components/landing/projects-section.jsx';
import SkillsPreviewSection from '../components/landing/skills-preview-section.jsx';

/**
 * HomePage 컴포넌트
 *
 * 화면 끝까지 꽉 찬 풀폭 섹션 5개 (Hero → About Me → Skills → Projects → Contact) 로 구성된 메인 페이지.
 * About Me·Skills 는 About Me 탭 데이터(PortfolioContext)에서 자동으로 만들어진다.
 *
 * Props: 없음
 *
 * Example usage:
 * <HomePage />
 */
function HomePage() {
  return (
    <Box>
      <HeroSection id="hero" contactId="contact" />
      <AboutPreviewSection id="about" />
      <SkillsPreviewSection id="skills" />
      <ProjectsSection id="projects" />
      <ContactSection id="contact" />
    </Box>
  );
}

export default HomePage;
