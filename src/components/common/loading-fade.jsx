import { useState } from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * LoadingFade 컴포넌트
 *
 * 로딩 중에는 skeleton 을, 끝나면 children 을 보여준다.
 * 스켈레톤에서 넘어올 때만 내용을 페이드인하고, 처음부터 데이터가 있었으면 바로 보여준다.
 * (페이지 전환 페이드와 겹쳐서 두 번 깜빡이지 않도록)
 *
 * Props:
 * @param {boolean} isLoading - 로딩 중 여부 [Required]
 * @param {React.ReactNode} skeleton - 로딩 중에 보여줄 자리표시자 [Required]
 * @param {React.ReactNode} children - 로딩이 끝나면 보여줄 내용 [Required]
 *
 * Example usage:
 * <LoadingFade isLoading={ isPlaceholder } skeleton={ <SkillIconListSkeleton /> }>
 *   <SkillIconList skills={ skills } />
 * </LoadingFade>
 */
function LoadingFade({ isLoading, skeleton, children }) {
  // 처음 그려질 때 로딩 중이었는지 기억해 둔다. (그때만 페이드인)
  const [startedLoading] = useState(isLoading);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  if (isLoading) {
    return skeleton;
  }

  return (
    <Fade in appear={ startedLoading && !prefersReducedMotion } timeout={ 400 }>
      <Box>{ children }</Box>
    </Fade>
  );
}

export default LoadingFade;
