import { createContext } from 'react';

/**
 * 포트폴리오 Context 3종
 *
 * 자주 바뀌는 값과 바뀌지 않는 값을 나눠서, 필요한 것만 구독한 컴포넌트만 다시 그려지게 한다.
 * - PortfolioDataContext    : aboutMeData { basicInfo, sections, skills } (내용이 바뀔 때마다 변경)
 * - PortfolioActionsContext : 수정 함수 모음 (처음 한 번 만들어지고 바뀌지 않음)
 * - PortfolioStatusContext  : 저장·로그인 상태 { saveStatus, saveError, loadError, isLoading, isLoggedIn, isOwner, hasLegacyData }
 */
export const PortfolioDataContext = createContext(null);
export const PortfolioActionsContext = createContext(null);
export const PortfolioStatusContext = createContext(null);
