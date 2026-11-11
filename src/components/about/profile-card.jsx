import { Fragment, memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BASIC_INFO_FIELDS } from '../../data/about-me-data.js';
import ProfilePhoto from './profile-photo.jsx';

/** 이름은 제목으로 쓰니 목록에서는 뺀다. */
const DETAIL_FIELDS = BASIC_INFO_FIELDS.filter((field) => field.key !== 'name');

/**
 * ProfileCard 컴포넌트 (React.memo)
 *
 * 프로필 사진 + 이름 + 기본 정보(학력·전공·경력)를 보여주는 카드.
 * 비어 있는 항목은 숨기고, 모두 비었으면 안내 문구를 보여준다.
 *
 * Props:
 * @param {object} basicInfo - { name, education, major, experience, photo } [Required]
 * @param {string} headingComponent - 이름에 쓸 제목 태그 [Optional, 기본값: 'h3']
 *
 * Example usage:
 * <ProfileCard basicInfo={ basicInfo } />
 */
function ProfileCard({ basicInfo, headingComponent = 'h3' }) {
  const filledFields = DETAIL_FIELDS.filter((field) => basicInfo[field.key]?.trim());
  const name = basicInfo.name.trim();

  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: 1,
        borderColor: 'primary.border',
        bgcolor: 'primary.light',
        textAlign: 'center',
      }}
    >
      <ProfilePhoto src={ basicInfo.photo } alt={ name ? `${name} 프로필 사진` : '프로필 사진' } size={ 104 } />
      <Typography
        component={ headingComponent }
        sx={{ mt: 1.5, fontSize: '1.15rem', fontWeight: 700, color: name ? 'text.primary' : 'text.secondary' }}
      >
        { name || '이름 미입력' }
      </Typography>
      <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'primary.dark' }}>
        Frontend Developer
      </Typography>

      { filledFields.length > 0 ? (
        <Box
          component="dl"
          sx={{
            m: 0,
            mt: 2,
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            columnGap: 1.5,
            rowGap: 0.75,
            textAlign: 'left',
            fontSize: '0.9rem',
          }}
        >
          { filledFields.map((field) => (
            <Fragment key={ field.key }>
              <Box component="dt" sx={{ fontWeight: 700, color: 'text.secondary' }}>{ field.label }</Box>
              <Box component="dd" sx={{ m: 0, color: 'text.primary', wordBreak: 'keep-all' }}>{ basicInfo[field.key] }</Box>
            </Fragment>
          )) }
        </Box>
      ) : (
        <Typography sx={{ mt: 1.5, fontSize: '0.85rem', color: 'text.secondary', wordBreak: 'keep-all' }}>
          About Me 탭의 편집 모드에서 학력·전공·경력을 채워 주세요.
        </Typography>
      ) }
    </Box>
  );
}

export default memo(ProfileCard);
