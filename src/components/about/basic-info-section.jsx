import { memo, useCallback } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { BASIC_INFO_FIELDS } from '../../data/about-me-data.js';
import ProfileCard from './profile-card.jsx';
import ProfilePhotoUpload from './profile-photo-upload.jsx';

/** 올린 사진(data:image) 또는 http(s) 주소인지 확인 (비어 있으면 기본 사진을 쓰니 통과) */
const isValidPhotoUrl = (value) => value === ''
  || value.startsWith('data:image/')
  || /^https?:\/\/\S+$/i.test(value.trim());

/**
 * BasicInfoSection 컴포넌트 (React.memo: 기본 정보가 바뀔 때만 다시 그려져요)
 *
 * 보기 모드: 프로필 카드 / 편집 모드: 입력 폼 + 사진 업로드 영역 + 실시간 미리보기 카드
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

  return (
    <Card
      component="section"
      aria-labelledby="basic-info-title"
      elevation={ 0 }
      sx={{ border: 1, borderColor: 'divider', borderLeft: 6, borderLeftColor: 'primary.main' }}
    >
      <CardContent sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 4 } }}>
        <Typography id="basic-info-title" component="h2" sx={{ mb: 2.5, fontSize: '1.25rem', fontWeight: 700 }}>
          기본 정보
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: isEditing ? '1.4fr 1fr' : '1fr' },
            gap: 3,
            alignItems: 'start',
          }}
        >
          { isEditing && (
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
          ) }
          <Box sx={{ maxWidth: isEditing ? 'none' : 360, width: '100%', mx: isEditing ? 0 : 'auto' }}>
            { isEditing && (
              <Typography sx={{ mb: 1, fontSize: '0.85rem', fontWeight: 700, color: 'text.secondary' }}>
                홈 탭 미리보기
              </Typography>
            ) }
            <ProfileCard basicInfo={ isPhotoValid ? basicInfo : { ...basicInfo, photo: '' } } />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default memo(BasicInfoSection);
