import { skillsData } from './skills-data.js';

/** 홈 탭에 보여줄 주요 스킬 개수 */
export const HOME_SKILL_COUNT = 4;

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
    experience: '',
    photo: '',
  },
  sections: [
    {
      id: 'dev-story',
      title: '나의 개발 스토리',
      content: '다양한 디자인을 보면서, 그 좋은 경험을 다른 사람과 함께 나누고 싶었어요. 디자인을 직접 만지고 느낄 수 있는 화면으로 옮기는 방법이 코드라는 걸 알게 되면서 개발을 시작했어요.',
      showInHome: true,
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      content: '디자인의 의도를 존중하고, 사용자의 입장에서 생각해요. 디테일까지 완성도 있게 만들고, 디자이너와 같은 언어로 소통하며, 만든 것도 꾸준히 다시 보며 개선해요.',
      showInHome: true,
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      content: '',
      showInHome: false,
    },
  ],
  skills: skillsData,
};
