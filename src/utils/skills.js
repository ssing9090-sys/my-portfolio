import { CATEGORY_ORDER } from '../data/skills-data.js';

/**
 * 숙련도 높은 순으로 정렬한 새 배열을 돌려준다. (원본은 그대로, 같으면 id 순)
 * @param {Array} skills - 스킬 목록
 */
export const sortByLevel = (skills) => [...skills].sort((a, b) => b.level - a.level || a.id - b.id);

/**
 * 숙련도 상위 N개를 돌려준다. (홈 탭 미리보기용)
 * @param {Array} skills - 스킬 목록
 * @param {number} count - 가져올 개수
 */
export const getTopSkills = (skills, count) => sortByLevel(skills).slice(0, Math.max(0, count));

/**
 * CATEGORY_ORDER 순서대로 카테고리별 묶음을 만든다. (빈 카테고리는 제외)
 * @param {Array} skills - 스킬 목록 (넘겨준 순서가 묶음 안에서도 유지돼요)
 * @returns {Array<{ category: string, skills: Array }>}
 */
export const groupByCategory = (skills) => CATEGORY_ORDER
  .map((category) => ({ category, skills: skills.filter((skill) => skill.category === category) }))
  .filter((group) => group.skills.length > 0);
