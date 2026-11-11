import { DEFAULT_ABOUT_ME, HOME_SKILL_COUNT_MAX, HOME_SKILL_COUNT_MIN } from '../data/about-me-data.js';

const isObject = (value) => typeof value === 'object' && value !== null;

const isValidSkill = (skill) => isObject(skill)
  && typeof skill.name === 'string'
  && typeof skill.category === 'string'
  && Number.isFinite(skill.level);

/**
 * 홈 탭 스킬 개수를 허용 범위(1~8) 안으로 맞춘다.
 * @param {number} count
 */
export const clampHomeSkillCount = (count) => Math.min(HOME_SKILL_COUNT_MAX, Math.max(HOME_SKILL_COUNT_MIN, count));

/**
 * 저장된 값(서버·브라우저) 중 형식이 맞는 것만 기본값 위에 덮어쓴다. (오래되거나 망가진 데이터 대비)
 *
 * @param {object} saved - { basicInfo, sections, skills, homeSkillCount } 형태의 값
 * @returns {object} 화면에서 바로 쓸 수 있는 aboutMeData
 *
 * Example usage:
 * const data = normalizeAboutMe(JSON.parse(raw));
 */
export function normalizeAboutMe(saved) {
  if (!isObject(saved)) {
    return DEFAULT_ABOUT_ME;
  }

  const savedBasicInfo = isObject(saved.basicInfo) ? saved.basicInfo : {};
  const basicInfo = Object.fromEntries(
    Object.entries(DEFAULT_ABOUT_ME.basicInfo).map(([key, fallback]) => [
      key,
      typeof savedBasicInfo[key] === 'string' ? savedBasicInfo[key] : fallback,
    ]),
  );

  const savedSections = Array.isArray(saved.sections) ? saved.sections.filter(isObject) : [];
  const sections = DEFAULT_ABOUT_ME.sections.map((section) => {
    const found = savedSections.find((item) => item.id === section.id);
    return {
      ...section,
      content: typeof found?.content === 'string' ? found.content : section.content,
      showInHome: typeof found?.showInHome === 'boolean' ? found.showInHome : section.showInHome,
    };
  });

  // showInHome 이 없던 예전 저장본은 '메인 스킬'로 채워 준다.
  const skills = Array.isArray(saved.skills)
    ? saved.skills.filter(isValidSkill).map((skill) => ({
      ...skill,
      showInHome: typeof skill.showInHome === 'boolean' ? skill.showInHome : true,
    }))
    : DEFAULT_ABOUT_ME.skills;

  const homeSkillCount = Number.isInteger(saved.homeSkillCount)
    ? clampHomeSkillCount(saved.homeSkillCount)
    : DEFAULT_ABOUT_ME.homeSkillCount;

  return { basicInfo, sections, skills, homeSkillCount };
}
