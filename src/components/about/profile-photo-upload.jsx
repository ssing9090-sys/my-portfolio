import { memo, useId, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { resizeImageToDataUrl } from '../../utils/resize-image.js';
import ProfilePhoto from './profile-photo.jsx';

/** 올릴 수 있는 원본 파일 최대 크기 (줄여서 저장하니 넉넉하게) */
const MAX_FILE_MB = 10;

/**
 * ProfilePhotoUpload 컴포넌트 (React.memo)
 *
 * 프로필 사진 업로드 영역. 클릭해서 고르거나 사진을 끌어다 놓으면
 * 작게 줄인 뒤 data URL 로 onChange 에 넘긴다. (이 브라우저에 자동 저장돼요)
 *
 * Props:
 * @param {string} photo - 현재 사진 (data URL 또는 http 주소, 비우면 기본 사진) [Required]
 * @param {Function} onChange - 사진이 바뀌면 새 값(문자열)으로 호출, 지우면 '' [Required]
 *
 * Example usage:
 * <ProfilePhotoUpload photo={ basicInfo.photo } onChange={ (value) => updateBasicInfo('photo', value) } />
 */
function ProfilePhotoUpload({ photo, onChange }) {
  const inputId = useId();
  const helpId = useId();
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file) => {
    if (!file) {
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 올릴 수 있어요.');
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`${MAX_FILE_MB}MB 이하의 사진을 골라 주세요.`);
      return;
    }

    setError('');
    setIsProcessing(true);
    try {
      onChange(await resizeImageToDataUrl(file));
    } catch {
      setError('이 형식은 읽을 수 없어요. JPG나 PNG로 올려 주세요.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (event) => {
    handleFile(event.target.files?.[0]);
    // 같은 파일을 다시 골라도 change 가 일어나도록 비운다.
    event.target.value = '';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  };

  return (
    <Box>
      <Box
        onDragOver={ (event) => {
          event.preventDefault();
          setIsDragging(true);
        } }
        onDragLeave={ () => setIsDragging(false) }
        onDrop={ handleDrop }
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: { xs: 1.5, sm: 2.5 },
          p: { xs: 2, sm: 2.5 },
          borderRadius: 3,
          border: 2,
          borderStyle: 'dashed',
          borderColor: isDragging ? 'primary.main' : 'primary.border',
          bgcolor: isDragging ? 'primary.light' : 'transparent',
          textAlign: { xs: 'center', sm: 'left' },
          transition: 'background-color 0.2s, border-color 0.2s',
        }}
      >
        <Box sx={{ position: 'relative', flexShrink: 0 }}>
          <ProfilePhoto src={ photo } alt="프로필 사진 미리보기" size={ 88 } />
          { isProcessing && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
                borderRadius: '50%',
                bgcolor: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              <CircularProgress size={ 24 } aria-label="사진 처리 중" />
            </Box>
          ) }
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700 }}>프로필 사진</Typography>
          <Typography id={ helpId } sx={{ mt: 0.25, fontSize: '0.85rem', color: 'text.secondary', wordBreak: 'keep-all' }}>
            사진을 끌어다 놓거나 버튼으로 골라 주세요. (JPG·PNG, { MAX_FILE_MB }MB 이하)
          </Typography>
          <Box sx={{ mt: 1.5, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <input
              ref={ inputRef }
              id={ inputId }
              type="file"
              accept="image/*"
              hidden
              onChange={ handleInputChange }
            />
            <Button
              variant="contained"
              size="small"
              disableElevation
              disabled={ isProcessing }
              startIcon={ <AddPhotoAlternateRoundedIcon /> }
              aria-describedby={ helpId }
              onClick={ () => inputRef.current?.click() }
            >
              { photo ? '사진 바꾸기' : '사진 올리기' }
            </Button>
            { photo && (
              <Button
                color="inherit"
                size="small"
                disabled={ isProcessing }
                startIcon={ <DeleteOutlineRoundedIcon /> }
                onClick={ () => {
                  setError('');
                  onChange('');
                } }
              >
                기본 사진으로
              </Button>
            ) }
          </Box>
        </Box>
      </Box>

      { error && (
        <Typography role="alert" sx={{ mt: 1, fontSize: '0.85rem', color: 'error.main' }}>
          { error }
        </Typography>
      ) }
    </Box>
  );
}

export default memo(ProfilePhotoUpload);
