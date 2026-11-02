import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const EMOJI_OPTIONS = ['😀', '😍', '👍', '🎉', '🔥', '☕', '🌱', '✨'];
const COLOR_OPTIONS = ['#222222', '#FF4E59', '#FF9F43', '#FECA57', '#03C75A', '#2E86DE', '#8E44AD', '#F78FB3'];

const INITIAL_FORM = {
  name: '',
  message: '',
  email: '',
  phone: '',
  instagram: '',
  favoriteColor: '',
  keyword: '',
  emoji: '',
  rating: null,
};

/** 폼 값을 검증하고 오류 메시지 객체를 반환 (DB check 제약과 동일한 기준) */
function validateForm(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = '이름을 입력해주세요.';
  if (!form.message.trim()) errors.message = '메시지를 입력해주세요.';
  if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errors.email = '이메일 형식이 올바르지 않습니다.';
  if (form.phone && !/^[0-9+\- ]{7,20}$/.test(form.phone)) errors.phone = '숫자, +, - 만 입력해주세요.';
  if (form.instagram && !/^@?[A-Za-z0-9._]{1,30}$/.test(form.instagram)) errors.instagram = '영문, 숫자, ., _ 만 사용할 수 있습니다.';
  return errors;
}

/** 폼 값을 guestbook 테이블 컬럼 형태로 변환 (빈 값은 null) */
function toEntry(form) {
  const orNull = (value) => value.trim() || null;
  return {
    name: form.name.trim(),
    message: form.message.trim(),
    email: orNull(form.email),
    phone: orNull(form.phone),
    instagram: orNull(form.instagram.replace(/^@/, '')),
    favorite_color: form.favoriteColor || null,
    keyword: orNull(form.keyword),
    emoji: form.emoji || null,
    rating: form.rating,
  };
}

/**
 * GuestbookForm 컴포넌트
 *
 * 방명록 작성 폼. 필수(이름, 메시지)·재미 정보·비공개 연락처 순으로 세로 배치한다.
 *
 * Props:
 * @param {function} onSubmit - 작성 데이터(entry)를 받아 저장하는 비동기 함수 [Required]
 *
 * Example usage:
 * <GuestbookForm onSubmit={ addEntry } />
 */
function GuestbookForm({ onSubmit }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleChange = (field) => (event) => updateField(field, event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await onSubmit(toEntry(form));
      setForm(INITIAL_FORM);
      setFeedback({ severity: 'success', message: '방명록이 등록되었습니다. 감사합니다!' });
    } catch (submitError) {
      setFeedback({ severity: 'error', message: submitError.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionLabelSx = { fontSize: '0.85rem', fontWeight: 700, color: 'text.secondary', mb: 1 };
  const toggleSx = {
    '& .MuiToggleButton-root.Mui-selected': {
      bgcolor: 'text.primary',
      color: 'background.paper',
      '&:hover': { bgcolor: 'text.secondary' },
    },
  };

  return (
    <Box component="form" noValidate onSubmit={ handleSubmit }>
      <Stack spacing={ 3 }>
        <Stack spacing={ 2 }>
          <TextField
            label="이름"
            required
            size="small"
            value={ form.name }
            onChange={ handleChange('name') }
            error={ Boolean(errors.name) }
            helperText={ errors.name }
            slotProps={{ htmlInput: { maxLength: 30 } }}
          />
          <TextField
            label="메시지"
            required
            multiline
            minRows={ 3 }
            value={ form.message }
            onChange={ handleChange('message') }
            error={ Boolean(errors.message) }
            helperText={ errors.message || `${form.message.length} / 500` }
            slotProps={{ htmlInput: { maxLength: 500 } }}
          />
        </Stack>

        <Box>
          <Box sx={ sectionLabelSx }>이모지 선택</Box>
          <ToggleButtonGroup
            exclusive
            size="small"
            value={ form.emoji }
            onChange={ (event, value) => updateField('emoji', value ?? '') }
            sx={{ flexWrap: 'wrap', ...toggleSx }}
          >
            { EMOJI_OPTIONS.map((emoji) => (
              <ToggleButton key={ emoji } value={ emoji } aria-label={ emoji } sx={{ fontSize: '1.2rem', px: 1.5 }}>
                { emoji }
              </ToggleButton>
            )) }
          </ToggleButtonGroup>
        </Box>

        <Box>
          <Box sx={ sectionLabelSx }>좋아하는 색깔</Box>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
            { COLOR_OPTIONS.map((color) => {
              const isSelected = form.favoriteColor === color;
              return (
                <Box
                  key={ color }
                  component="button"
                  type="button"
                  aria-label={ `색상 ${color}` }
                  aria-pressed={ isSelected }
                  onClick={ () => updateField('favoriteColor', isSelected ? '' : color) }
                  sx={{
                    width: 32,
                    height: 32,
                    p: 0,
                    borderRadius: '50%',
                    bgcolor: color,
                    cursor: 'pointer',
                    border: 2,
                    borderColor: 'background.paper',
                    outline: 2,
                    outlineColor: isSelected ? 'text.primary' : 'transparent',
                    transition: 'outline-color 0.2s',
                  }}
                />
              );
            }) }
          </Stack>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={ 2 } sx={{ alignItems: { sm: 'center' } }}>
          <TextField
            label="한마디 키워드"
            size="small"
            placeholder="예: 화이팅"
            value={ form.keyword }
            onChange={ handleChange('keyword') }
            slotProps={{ htmlInput: { maxLength: 20 } }}
            sx={{ flex: 1 }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'text.secondary' }}>별점</Box>
            <Rating
              value={ form.rating }
              onChange={ (event, value) => updateField('rating', value) }
              sx={{ color: 'text.primary' }}
            />
          </Box>
        </Stack>

        <Box>
          <Box sx={ sectionLabelSx }>연락처 (선택)</Box>
          <Stack spacing={ 2 }>
            <TextField
              label="인스타그램 계정"
              size="small"
              placeholder="@username"
              value={ form.instagram }
              onChange={ handleChange('instagram') }
              error={ Boolean(errors.instagram) }
              helperText={ errors.instagram || '방명록에 공개됩니다.' }
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={ 2 }>
              <TextField
                label="이메일"
                type="email"
                size="small"
                fullWidth
                value={ form.email }
                onChange={ handleChange('email') }
                error={ Boolean(errors.email) }
                helperText={ errors.email }
                slotProps={{ htmlInput: { maxLength: 100 } }}
              />
              <TextField
                label="전화번호"
                type="tel"
                size="small"
                fullWidth
                value={ form.phone }
                onChange={ handleChange('phone') }
                error={ Boolean(errors.phone) }
                helperText={ errors.phone }
                slotProps={{ htmlInput: { maxLength: 20 } }}
              />
            </Stack>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.8rem', color: 'text.disabled' }}>
              <LockOutlinedIcon sx={{ fontSize: '1rem' }} />
              이메일과 전화번호는 비공개로 저장되며 방명록에 표시되지 않습니다.
            </Box>
          </Stack>
        </Box>

        { feedback && <Alert severity={ feedback.severity }>{ feedback.message }</Alert> }

        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={ isSubmitting }
          sx={{
            py: 1.25,
            bgcolor: 'text.primary',
            color: 'background.paper',
            '&:hover': { bgcolor: 'text.secondary' },
          }}
        >
          { isSubmitting ? '등록 중...' : '방명록 남기기' }
        </Button>
      </Stack>
    </Box>
  );
}

export default GuestbookForm;
