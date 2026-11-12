import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';

/**
 * ProjectCardSkeleton 컴포넌트
 *
 * 프로젝트 목록을 불러오는 동안 카드 자리를 표시한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ProjectCardSkeleton />
 */
function ProjectCardSkeleton() {
  return (
    <Card elevation={ 0 } aria-hidden="true" sx={{ borderRadius: '32px', p: 1.25 }}>
      <Skeleton variant="rectangular" sx={{ width: '100%', height: 'auto', aspectRatio: '16 / 9', borderRadius: '20px' }} />
      <Box sx={{ p: 2 }}>
        <Skeleton variant="text" sx={{ fontSize: '1.1rem' }} />
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="rounded" height={ 44 } sx={{ mt: 2 }} />
      </Box>
    </Card>
  );
}

export default ProjectCardSkeleton;
