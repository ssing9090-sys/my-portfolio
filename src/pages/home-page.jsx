import Stack from '@mui/material/Stack';
import AboutPreviewSection from '../components/landing/about-preview-section.jsx';
import ContactSection from '../components/landing/contact-section.jsx';
import HeroSection from '../components/landing/hero-section.jsx';
import ProjectsSection from '../components/landing/projects-section.jsx';
import SkillsPreviewSection from '../components/landing/skills-preview-section.jsx';

/**
 * HomePage 컴포넌트
 *
 * Hero, About Me, Skills, Projects, Contact 5개 섹션으로 구성된 메인 페이지.
 * About Me·Skills 는 About Me 탭 데이터(PortfolioContext)에서 자동으로 만들어진다.
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
      <AboutPreviewSection id="about" order="02" />
      <SkillsPreviewSection id="skills" order="03" />
      <ProjectsSection id="projects" order="04" />
      <ContactSection id="contact" order="05" />
    </Stack>
  );
}

export default HomePage;
