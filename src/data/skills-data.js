/**
 * 스킬 섹션 데이터
 *
 * - skillsData     : 기본으로 보여줄 스킬 5종
 * - ADDABLE_SKILLS : '스킬 추가' 버튼으로 고를 수 있는 기술 목록
 * - 실제 화면은 PortfolioContext 의 skills 를 사용해요 (about-me-data.js 의 기본값)
 */

/**
 * 카테고리별 표시 이름과 색상
 * color : 프로그레스 바·포인트 색 / soft : 아이콘 배경·바 트랙 색
 * (파스텔 계열이라 라이트·다크 모드 모두에서 무난하게 보여요)
 */
export const SKILL_CATEGORIES = {
  Frontend: { label: 'Frontend', color: '#F7A66F', soft: 'rgba(247, 166, 111, 0.2)' },
  Framework: { label: 'Framework', color: '#A78BDA', soft: 'rgba(167, 139, 218, 0.2)' },
  Backend: { label: 'Backend', color: '#5CC2A6', soft: 'rgba(92, 194, 166, 0.2)' },
  Design: { label: 'Design', color: '#F28CB1', soft: 'rgba(242, 140, 177, 0.2)' },
  Tools: { label: '도구 & 기타', color: '#6FAEE8', soft: 'rgba(111, 174, 232, 0.2)' },
};

/** 화면에 카테고리를 보여줄 순서 */
export const CATEGORY_ORDER = ['Frontend', 'Framework', 'Backend', 'Design', 'Tools'];

/** icon 키 → 이모지 (목록에 없는 키는 ✨ 로 표시) */
export const SKILL_ICONS = {
  'orange-diamond': '🔶',
  palette: '🎨',
  zap: '⚡',
  atom: '⚛️',
  target: '🎯',
  'green-heart': '💚',
  'red-triangle': '🔺',
  'blue-diamond': '🔷',
  gear: '⚙️',
  snake: '🐍',
  coffee: '☕',
  branch: '🌿',
  phone: '📱',
  leaf: '🍃',
};

export const skillsData = [
  {
    id: 1,
    icon: 'orange-diamond',
    name: 'HTML',
    level: 80,
    category: 'Frontend',
    showInHome: true,
    description: '시맨틱 마크업과 접근성 속성으로 탄탄한 구조를 만들어요.',
  },
  {
    id: 2,
    icon: 'palette',
    name: 'CSS',
    level: 75,
    category: 'Frontend',
    showInHome: true,
    description: '디자인 토큰·반응형·애니메이션으로 시안의 느낌을 그대로 옮겨요.',
  },
  {
    id: 3,
    icon: 'zap',
    name: 'JavaScript',
    level: 70,
    category: 'Frontend',
    showInHome: true,
    description: 'DOM 조작과 비동기 처리로 화면에 움직임과 데이터를 더해요.',
  },
  {
    id: 4,
    icon: 'atom',
    name: 'React',
    level: 60,
    category: 'Framework',
    showInHome: true,
    description: '컴포넌트를 나눠 재사용하고, 상태를 관리하며 화면을 구성해요.',
  },
  {
    id: 5,
    icon: 'target',
    name: 'Figma',
    level: 65,
    category: 'Design',
    showInHome: true,
    description: '시안의 의도를 읽고, 디자이너와 같은 파일을 보며 소통해요.',
  },
];

/** '스킬 추가'에서 고를 수 있는 기술 (숙련도는 추가할 때 정해요) */
export const ADDABLE_SKILLS = [
  { icon: 'green-heart', name: 'Vue.js', category: 'Frontend', description: '템플릿 문법과 반응형 데이터로 화면을 만들어요.' },
  { icon: 'red-triangle', name: 'Angular', category: 'Frontend', description: '구조가 정해진 프레임워크로 큰 화면을 설계해요.' },
  { icon: 'blue-diamond', name: 'TypeScript', category: 'Frontend', description: '타입으로 실수를 미리 막고 코드를 읽기 쉽게 만들어요.' },
  { icon: 'gear', name: 'Node.js', category: 'Backend', description: 'API 서버를 만들고 데이터를 주고받아요.' },
  { icon: 'snake', name: 'Python', category: 'Backend', description: '간단한 자동화와 데이터 처리에 활용해요.' },
  { icon: 'coffee', name: 'Java', category: 'Backend', description: '객체지향 설계를 바탕으로 서버 로직을 작성해요.' },
  { icon: 'branch', name: 'Git', category: 'Tools', description: '브랜치와 커밋으로 작업 기록을 깔끔하게 관리해요.' },
  { icon: 'phone', name: 'React Native', category: 'Tools', description: 'React 경험을 살려 모바일 앱 화면을 만들어요.' },
  { icon: 'leaf', name: 'MongoDB', category: 'Tools', description: '문서형 데이터베이스로 유연하게 데이터를 저장해요.' },
];
