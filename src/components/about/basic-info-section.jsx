import { memo, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import defaultPhoto from '../../assets/profile.jpg';
import { BASIC_INFO_FIELDS } from '../../data/about-me-data.js';
import { INK } from '../../theme.js';
import { OUTLINE_BADGE_SX } from '../landing/landing-styles.js';
import ProfileCard from './profile-card.jsx';
import ProfilePhotoUpload from './profile-photo-upload.jsx';

/** 올린 사진(data:image) 또는 http(s) 주소인지 확인 (비어 있으면 기본 사진을 쓰니 통과) */
const isValidPhotoUrl = (value) => value === ''
  || value.startsWith('data:image/')
  || /^https?:\/\/\S+$/i.test(value.trim());

/** 보기 모드 목록에 쓸 영문 꼬리표 */
const FIELD_TAGS = { education: 'EDUCATION', major: 'MAJOR', experience: 'EXPERIENCE' };
const DETAIL_FIELDS = BASIC_INFO_FIELDS.filter((field) => field.key !== 'name');

/**
 * ProfileShowcase: 보기 모드. 아치형 사진 + 큰 이름 + 학력·전공·경력 목록
 */
function ProfileShowcase({ basicInfo }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const photo = basicInfo.photo && basicInfo.photo !== failedSrc ? basicInfo.photo : defaultPhoto;
  const name = basicInfo.name.trim();
  const filledFields = DETAIL_FIELDS.filter((field) => basicInfo[field.key]?.trim());

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'auto 1fr' },
        alignItems: 'center',
        gap: { xs: 4, md: 8 },
        maxWidth: 1040,
        mx: 'auto',
      }}
    >
      <Box
        component="img"
        src={ photo }
        alt={ name ? `${name} 프로필 사진` : '프로필 사진' }
        onError={ () => setFailedSrc(basicInfo.photo) }
        width={ 340 }
        height={ 425 }
        loading="lazy"
        decoding="async"
        sx={{
          justifySelf: 'center',
          display: 'block',
          width: { xs: 'min(70vw, 280px)', md: 340 },
          height: 'auto',
          aspectRatio: '4 / 5',
          objectFit: 'cover',
          objectPosition: 'center top',
          borderRadius: '999px 999px 32px 32px',
          border: '6px solid #FFFFFF',
          bgcolor: 'rgba(255, 255, 255, 0.4)',
        }}
      />

      <Box sx={{ color: INK }}>
        <Box sx={ OUTLINE_BADGE_SX }>FRONTEND DEVELOPER</Box>
        <Typography
          component="h3"
          sx={{ mt: 1.5, fontWeight: 900, fontSize: { xs: '3rem', md: '4.5rem' }, lineHeight: 1, letterSpacing: '-0.04em', opacity: name ? 1 : 0.5 }}
        >
          { name || '이름 미입력' }
        </Typography>

        { filledFields.length > 0 ? (
          <Box component="dl" sx={{ m: 0, mt: { xs: 3, md: 4 } }}>
            { filledFields.map((field) => (
              <Box
                key={ field.key }
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '180px 1fr' },
                  alignItems: 'baseline',
                  gap: { xs: 0.25, sm: 2 },
                  py: { xs: 1.5, md: 2 },
                  borderTop: `2px solid ${INK}`,
                  '&:last-of-type': { borderBottom: `2px solid ${INK}` },
                }}
              >
                <Box component="dt" sx={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.08em' }}>
                  { FIELD_TAGS[field.key] ?? field.label.toUpperCase() }
                  <Box component="span" sx={{ ml: 1, fontWeight: 600, opacity: 0.7 }}>{ field.label }</Box>
                </Box>
                <Box component="dd" sx={{ m: 0, fontSize: { xs: '1.35rem', md: '1.75rem' }, fontWeight: 800, letterSpacing: '-0.02em', wordBreak: 'keep-all' }}>
                  { basicInfo[field.key] }
                </Box>
              </Box>
            )) }
          </Box>
        ) : (
          <Typography sx={{ mt: 3, fontWeight: 600, opacity: 0.75, wordBreak: 'keep-all' }}>
            편집 모드에서 학력·전공·경력을 채워 주세요.
          </Typography>
        ) }
      </Box>
    </Box>
  );
}

/**
 * BasicInfoSection 컴포넌트 (React.memo: 기본 정보가 바뀔 때만 다시 그려져요)
 *
 * 보기 모드: 아치형 사진 + 큰 이름 + 정보 목록
 * 편집 모드: 흰 카드 안에 입력 폼 + 사진 업로드 영역 + 홈 탭 미리보기 카드
 * (섹션 제목은 감싸는 AboutBand 가 그려요)
 *
 * Props:
 * @param {object} basicInfo - { name, education, major, experience, photo } [Required]
 * @param {boolean} isEditing - 편집 모드 여부 [Required]
 * @param {Function} onChange - 입력 시 (field, value) 로 호출 [Required]
 *
 * Example usage:
 * <BasicInfoSection basicInfo={ basicInfo } isEditing={ isEditing } onChange={ updateBasicInfo } />
 */
function BasicInfoSection({ basicInfo, isEditing, onChange }) {
  const isPhotoValid = isValidPhotoUrl(basicInfo.photo);
  const handlePhotoChange = useCallback((value) => onChange('photo', value), [onChange]);
  const shownInfo = isPhotoValid ? basicInfo : { ...basicInfo, photo: '' };

  if (!isEditing) {
    return <ProfileShowcase basicInfo={ shownInfo } />;
  }

  return (
    <Box
      sx={{
        maxWidth: 1040,
        mx: 'auto',
        p: { xs: 2.5, md: 4 },
        borderRadius: '32px',
        bgcolor: '#FFFFFF',
        color: 'text.primary',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' },
        gap: 3,
        alignItems: 'start',
      }}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        { BASIC_INFO_FIELDS.map((field) => (
          <TextField
            key={ field.key }
            label={ field.label }
            placeholder={ field.placeholder }
            value={ basicInfo[field.key] }
            onChange={ (event) => onChange(field.key, event.target.value) }
            slotProps={{ htmlInput: { maxLength: 40 } }}
            size="small"
          />
        )) }
        <Box sx={{ gridColumn: '1 / -1' }}>
          <ProfilePhotoUpload photo={ basicInfo.photo } onChange={ handlePhotoChange } />
        </Box>
      </Box>
      <Box>
        <Typography sx={{ mb: 1, fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.04em', color: 'text.secondary' }}>
          홈 탭 미리보기
        </Typography>
        <ProfileCard basicInfo={ shownInfo } />
      </Box>
    </Box>
  );
}

export default memo(BasicInfoSection);
