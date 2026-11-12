import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

/**
 * SkillIconListSkeleton 컴포넌트
 *
 * SkillIconList 와 같은 격자(모바일 2열, 그 이상 4열) 모양의 로딩 자리표시자.
 * 스크린 리더에는 숨기고, 감싸는 섹션의 aria-busy 로 로딩 중임을 알린다.
 *
 * Props:
 * @param {number} count - 자리표시자 개수 [Optional, 기본값: 4]
 *
 * Example usage:
 * <SkillIconListSkeleton count={ 4 } />
 */
function SkillIconListSkeleton({ count = 4 }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(4, minmax(0, 1fr))' },
        gap: 1.5,
      }}
    >
      { Array.from({ length: count }, (_, index) => (
        <Box
          key={ index }
          sx={{ display: 'flex', alignItems: 'center', gap: 1.25, p: 1.25, borderRadius: 2, border: 1, borderColor: 'divider' }}
        >
          <Skeleton variant="rounded" width={ 36 } height={ 36 } sx={{ flexShrink: 0, borderRadius: 1.5 }} />
          <Skeleton variant="text" sx={{ flexGrow: 1, fontSize: '0.95rem' }} />
        </Box>
      )) }
    </Box>
  );
}

export default SkillIconListSkeleton;
