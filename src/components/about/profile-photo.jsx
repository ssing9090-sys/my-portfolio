import { memo, useState } from 'react';
import Box from '@mui/material/Box';
import defaultPhoto from '../../assets/profile.jpg';

/**
 * ProfilePhoto 컴포넌트 (React.memo)
 *
 * 동그란 프로필 사진. 주소가 비었거나 이미지를 불러오지 못하면 기본 사진을 보여준다.
 * 기본은 lazy loading 이라 화면 아래쪽에 있을 때 늦게 불러와요.
 *
 * Props:
 * @param {string} src - 사진 주소 (비우면 기본 사진) [Optional, 기본값: '']
 * @param {string} alt - 대체 텍스트 [Required]
 * @param {number} size - 지름(px) [Optional, 기본값: 96]
 *
 * Example usage:
 * <ProfilePhoto src={ basicInfo.photo } alt="김현진 프로필 사진" size={ 112 } />
 */
function ProfilePhoto({ src = '', alt, size = 96 }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const photoSrc = src && src !== failedSrc ? src : defaultPhoto;

  return (
    <Box
      component="img"
      src={ photoSrc }
      alt={ alt }
      width={ size }
      height={ size }
      loading="lazy"
      decoding="async"
      onError={ () => setFailedSrc(src) }
      sx={{
        display: 'block',
        width: size,
        height: size,
        mx: 'auto',
        borderRadius: '50%',
        objectFit: 'cover',
        objectPosition: 'center top',
        border: 3,
        borderColor: 'primary.border',
        bgcolor: 'primary.light',
      }}
    />
  );
}

export default memo(ProfilePhoto);
