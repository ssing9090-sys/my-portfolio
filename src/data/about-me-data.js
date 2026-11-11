import { skillsData } from './skills-data.js';

/** 홈 탭에 보여줄 주요 스킬 개수 (기본값) */
export const HOME_SKILL_COUNT = 4;

/** 홈 탭 스킬 개수로 고를 수 있는 범위 (홈 목록이 4열이라 최대 8개 = 2줄) */
export const HOME_SKILL_COUNT_MIN = 1;
export const HOME_SKILL_COUNT_MAX = 8;

/** 홈 탭 요약에 쓰는 최대 글자 수 */
export const SUMMARY_LENGTH = 100;

/** 기본 정보 입력 항목 (photo 는 따로 다뤄요) */
export const BASIC_INFO_FIELDS = [
  { key: 'name', label: '이름', placeholder: '예: 김현진' },
  { key: 'education', label: '학력', placeholder: '예: OO대학교 졸업' },
  { key: 'major', label: '전공', placeholder: '예: 시각디자인' },
  { key: 'experience', label: '경력', placeholder: '예: 신입 (프론트엔드 학습 1년)' },
];

/** About Me 탭의 처음 내용 (저장된 내용이 없을 때 사용) */
export const DEFAULT_ABOUT_ME = {
  basicInfo: {
    name: '김현진',
    education: '',
    major: '',
    experience: '신입',
    photo: '',
  },
  sections: [
    {
      id: 'dev-story',
      title: '나의 개발 스토리',
      content: '좋은 디자인을 보는 즐거움에서, 직접 구현하는 즐거움으로.',
      showInHome: true,
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      content: '좋은 코드는 화면을 만들고, 좋은 경험은 사람의 마음에 남습니다.',
      showInHome: true,
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      content: '일상에서 발견한 작은 영감을 새로운 아이디어로 연결합니다.',
      showInHome: true,
    },
  ],
  skills: skillsData,
  homeSkillCount: HOME_SKILL_COUNT,
};
