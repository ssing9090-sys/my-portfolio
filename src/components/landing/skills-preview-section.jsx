import { useHomeData } from '../../hooks/use-portfolio.js';
import SkillIconList from '../skills/skill-icon-list.jsx';
import HomeSection from './home-section.jsx';

/** About Me 탭으로 이동한 뒤 스킬 섹션까지 스크롤 */
const SKILLS_ACTION = { label: '전체 스킬 보기', to: '/about', state: { scrollTo: 'skills' } };

/**
 * SkillsPreviewSection 컴포넌트
 *
 * 홈 탭의 Skills 섹션. 숙련도 상위 4개 스킬을 아이콘 + 이름 + 숙련도로 보여준다.
 *
 * Props:
 * @param {string} id - 섹션 앵커 id [Optional, 기본값: 'skills']
 * @param {string} order - 섹션 순번 [Optional, 기본값: '03']
 *
 * Example usage:
 * <SkillsPreviewSection id="skills" order="03" />
 */
function SkillsPreviewSection({ id = 'skills', order = '03' }) {
  const { skills } = useHomeData();

  return (
    <HomeSection
      id={ id }
      order={ order }
      title="Skills"
      description="숙련도가 가장 높은 기술 4가지예요."
      action={ SKILLS_ACTION }
    >
      <SkillIconList skills={ skills } label="숙련도 상위 스킬" showLevel />
    </HomeSection>
  );
}

export default SkillsPreviewSection;
