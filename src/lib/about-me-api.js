import { supabase } from './supabase.js';

/**
 * About Me 데이터 Supabase 연동
 *
 * public.portfolio_about 테이블에 한 행(id = 1)만 있다.
 * - 읽기: 누구나 (RLS)
 * - 수정: owner_id 계정으로 로그인한 경우만 (RLS)
 */
const TABLE = 'portfolio_about';
const ROW_ID = 1;

/** 수정이 RLS 로 막혀서 바뀐 행이 없을 때 던지는 에러 코드 */
export const NO_PERMISSION = 'NO_PERMISSION';

/**
 * About Me 데이터를 불러온다.
 *
 * @returns {Promise<{ ownerId: string, saved: { basicInfo, sections, skills, homeSkillCount } }>}
 *
 * Example usage:
 * const { ownerId, saved } = await fetchAboutMe();
 */
export async function fetchAboutMe() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('owner_id, basic_info, sections, skills, home_skill_count')
    .eq('id', ROW_ID)
    .single();

  if (error) {
    throw error;
  }

  return {
    ownerId: data.owner_id,
    saved: {
      basicInfo: data.basic_info,
      sections: data.sections,
      skills: data.skills,
      homeSkillCount: data.home_skill_count,
    },
  };
}

/**
 * About Me 데이터를 통째로 저장한다. (주인 계정만 성공)
 *
 * @param {{ basicInfo, sections, skills, homeSkillCount }} aboutMe
 * @throws 권한이 없으면 Error(NO_PERMISSION), 네트워크·DB 오류면 Supabase 에러
 *
 * Example usage:
 * await saveAboutMe(aboutMeData);
 */
export async function saveAboutMe({ basicInfo, sections, skills, homeSkillCount }) {
  const { data, error } = await supabase
    .from(TABLE)
    .update({
      basic_info: basicInfo,
      sections,
      skills,
      home_skill_count: homeSkillCount,
    })
    .eq('id', ROW_ID)
    .select('id');

  if (error) {
    throw error;
  }
  // RLS 에 막히면 에러 없이 0행이 바뀐다.
  if (!data || data.length === 0) {
    throw new Error(NO_PERMISSION);
  }
}
