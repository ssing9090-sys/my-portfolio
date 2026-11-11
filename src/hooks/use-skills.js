import { useMemo } from 'react';
import { ADDABLE_SKILLS } from '../data/skills-data.js';
import { usePortfolioActions, usePortfolioData } from './use-portfolio.js';

/**
 * useSkills 훅
 *
 * PortfolioContext 의 스킬 목록과 스킬 수정 함수를 함께 돌려준다.
 *
 * @returns {{ skills: Array, availableSkills: Array, addSkill: Function, removeSkill: Function, updateSkill: Function }}
 *
 * Example usage:
 * const { skills, updateSkill } = useSkills();
 * updateSkill(1, { level: 85 });
 */
function useSkills() {
  const { skills } = usePortfolioData();
  const { addSkill, removeSkill, updateSkill } = usePortfolioActions();

  /** 아직 추가하지 않은 기술만 후보로 보여준다. */
  const availableSkills = useMemo(
    () => ADDABLE_SKILLS.filter((candidate) => !skills.some((skill) => skill.name === candidate.name)),
    [skills],
  );

  return { skills, availableSkills, addSkill, removeSkill, updateSkill };
}

export default useSkills;
