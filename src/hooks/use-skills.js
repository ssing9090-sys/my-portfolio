import { useMemo } from 'react';
import { ADDABLE_SKILLS } from '../data/skills-data.js';
import { getHomeSkills } from '../utils/skills.js';
import { usePortfolioActions, usePortfolioData } from './use-portfolio.js';

/**
 * useSkills 훅
 *
 * PortfolioContext 의 스킬 목록과 스킬 수정 함수를 함께 돌려준다.
 *
 * @returns {{ skills: Array, availableSkills: Array, homeSkillCount: number, homeSkillIds: Set,
 *   addSkill: Function, removeSkill: Function, updateSkill: Function, updateHomeSkillCount: Function }}
 *
 * Example usage:
 * const { skills, updateSkill } = useSkills();
 * updateSkill(1, { level: 85 });
 */
function useSkills() {
  const { skills, homeSkillCount } = usePortfolioData();
  const { addSkill, removeSkill, updateSkill, updateHomeSkillCount } = usePortfolioActions();

  /** 아직 추가하지 않은 기술만 후보로 보여준다. */
  const availableSkills = useMemo(
    () => ADDABLE_SKILLS.filter((candidate) => !skills.some((skill) => skill.name === candidate.name)),
    [skills],
  );

  /** 지금 홈 탭에 실제로 나가는 스킬 id (메인 스킬 중 숙련도 상위 N개) */
  const homeSkillIds = useMemo(
    () => new Set(getHomeSkills(skills, homeSkillCount).map((skill) => skill.id)),
    [skills, homeSkillCount],
  );

  return {
    skills,
    availableSkills,
    homeSkillCount,
    homeSkillIds,
    addSkill,
    removeSkill,
    updateSkill,
    updateHomeSkillCount,
  };
}

export default useSkills;
