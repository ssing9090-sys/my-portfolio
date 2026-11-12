import { useHomeData, usePortfolioStatus } from '../../hooks/use-portfolio.js';
import LoadingFade from '../common/loading-fade.jsx';
import SkillIconList from '../skills/skill-icon-list.jsx';
import SkillIconListSkeleton from '../skills/skill-icon-list-skeleton.jsx';
import HomeSection from './home-section.jsx';

/** About Me 탭으로 이동한 뒤 스킬 섹션까지 스크롤 */
const SKILLS_ACTION = { label: '전체 스킬 보기', to: '/about', state: { scrollTo: 'skills' } };

/**
 * SkillsPreviewSection 컴포넌트
 *
 * 홈 탭의 Skills 섹션. 메인 스킬 중 숙련도 상위 N개(기본 4개, About Me 탭에서 변경)를
 * 아이콘 + 이름 + 숙련도로 보여준다. 첫 방문에 데이터를 불러오는 동안은 스켈레톤을 보여준다.
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
  const { isPlaceholder } = usePortfolioStatus();

  return (
    <HomeSection
      id={ id }
      order={ order }
      title="Skills"
      description={ !isPlaceholder && skills.length > 0 ? `숙련도가 가장 높은 기술 ${skills.length}가지예요.` : undefined }
      action={ SKILLS_ACTION }
      isBusy={ isPlaceholder }
    >
      <LoadingFade isLoading={ isPlaceholder } skeleton={ <SkillIconListSkeleton count={ skills.length || 4 } /> }>
        <SkillIconList skills={ skills } label="숙련도 상위 스킬" showLevel />
      </LoadingFade>
    </HomeSection>
  );
}

export default SkillsPreviewSection;
