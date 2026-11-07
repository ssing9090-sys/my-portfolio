import { useState } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

/**
 * ProjectThumbnail 컴포넌트
 *
 * 16:9 비율의 썸네일. thum.io 가 이미지를 만드는 동안 스켈레톤을 보여주고,
 * 불러오기에 실패하면 안내 문구로 대체한다.
 *
 * Props:
 * @param {string} src - 썸네일 이미지 주소 [Required]
 * @param {string} alt - 이미지 대체 텍스트 [Required]
 *
 * Example usage:
 * <ProjectThumbnail src={ project.thumbnail_url } alt={ project.title } />
 */
function ProjectThumbnail({ src, alt }) {
  const [status, setStatus] = useState('loading');

  return (
    <Box sx={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', bgcolor: 'primary.light' }}>
      { status === 'loading' && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
      ) }
      { status === 'error' ? (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.875rem',
            color: 'text.secondary',
          }}
        >
          미리보기를 불러오지 못했어요
        </Box>
      ) : (
        <Box
          component="img"
          src={ src }
          alt={ alt }
          width={ 800 }
          height={ 450 }
          loading="lazy"
          onLoad={ () => setStatus('loaded') }
          onError={ () => setStatus('error') }
          sx={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
          }}
        />
      ) }
    </Box>
  );
}

export default ProjectThumbnail;
