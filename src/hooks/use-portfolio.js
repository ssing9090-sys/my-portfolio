import { useContext, useMemo } from 'react';
import {
  PortfolioActionsContext,
  PortfolioDataContext,
  PortfolioStatusContext,
} from '../contexts/portfolio-contexts.js';
import { SUMMARY_LENGTH } from '../data/about-me-data.js';
import { getHomeSkills } from '../utils/skills.js';
import { summarize } from '../utils/summarize.js';

/** Provider 밖에서 쓰면 바로 알 수 있도록 에러를 던진다. */
function useRequiredContext(context, hookName) {
  const value = useContext(context);
  if (value === null) {
    throw new Error(`${hookName} 는 <PortfolioProvider> 안에서만 사용할 수 있어요.`);
  }
  return value;
}

/**
 * About Me 데이터 { basicInfo, sections, skills } 를 읽는다.
 *
 * Example usage:
 * const { basicInfo, sections } = usePortfolioData();
 */
export const usePortfolioData = () => useRequiredContext(PortfolioDataContext, 'usePortfolioData');

/**
 * 수정 함수 모음을 읽는다. (값이 바뀌지 않아서 이것만 쓰는 컴포넌트는 다시 그려지지 않아요)
 *
 * Example usage:
 * const { updateSection, updateSkill } = usePortfolioActions();
 */
export const usePortfolioActions = () => useRequiredContext(PortfolioActionsContext, 'usePortfolioActions');

/**
 * 저장 상태 { saveStatus: 'idle' | 'saving' | 'saved' | 'error', loadError } 를 읽는다.
 *
 * Example usage:
 * const { saveStatus } = usePortfolioStatus();
 */
export const usePortfolioStatus = () => useRequiredContext(PortfolioStatusContext, 'usePortfolioStatus');

/**
 * 홈 탭용 데이터를 About Me 데이터에서 자동으로 만든다. (데이터가 바뀔 때만 다시 계산)
 *
 * @returns {{ content: Array<{ id, title, summary }>, skills: Array, basicInfo: object }}
 *
 * Example usage:
 * const { content, skills, basicInfo } = useHomeData();
 */
export function useHomeData() {
  const { basicInfo, sections, skills, homeSkillCount } = usePortfolioData();

  const content = useMemo(
    () => sections
      .filter((section) => section.showInHome)
      .map((section) => ({ id: section.id, title: section.title, summary: summarize(section.content, SUMMARY_LENGTH) })),
    [sections],
  );

  const topSkills = useMemo(() => getHomeSkills(skills, homeSkillCount), [skills, homeSkillCount]);

  return { content, skills: topSkills, basicInfo };
}
