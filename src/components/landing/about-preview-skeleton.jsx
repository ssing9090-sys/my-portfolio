import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const STORY_KEYS = [1, 2, 3];

/**
 * AboutPreviewSkeleton 컴포넌트
 *
 * 홈 About Me 섹션(소개 글 요약 + 프로필 카드)과 같은 배치의 로딩 자리표시자.
 * 스크린 리더에는 숨기고, 감싸는 섹션의 aria-busy 로 로딩 중임을 알린다.
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutPreviewSkeleton />
 */
function AboutPreviewSkeleton() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.6fr) minmax(0, 1fr)' },
        gap: { xs: 3, md: 4 },
        alignItems: 'start',
      }}
    >
      <Stack spacing={ 2.5 } sx={{ order: { xs: 2, md: 1 } }}>
        { STORY_KEYS.map((key) => (
          <Box key={ key }>
            <Skeleton variant="text" width="40%" sx={{ fontSize: '1.15rem' }} />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="85%" />
          </Box>
        )) }
      </Stack>
      <Box
        sx={{
          order: { xs: 1, md: 2 },
          p: 2.5,
          borderRadius: 3,
          border: 1,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Skeleton variant="circular" width={ 104 } height={ 104 } />
        <Skeleton variant="text" width="50%" sx={{ mt: 1.5, fontSize: '1.15rem' }} />
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="80%" />
      </Box>
    </Box>
  );
}

export default AboutPreviewSkeleton;
