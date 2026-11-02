import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { getCharacter } from '../../utils/characters.js';
import CharacterAvatar from './character-avatar.jsx';

const INITIAL_FORM = {
  name: '',
  message: '',
  rating: null,
  instagram: '',
  email: '',
  phone: '',
};

/** 폼 값을 검증하고 오류 메시지 객체를 반환 (DB check 제약과 동일한 기준) */
function validateForm(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = '이름을 입력해주세요.';
  if (!form.message.trim()) errors.message = '메시지를 입력해주세요.';
  if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errors.email = '이메일 형식이 올바르지 않아요.';
  if (form.phone && !/^[0-9+\- ]{7,20}$/.test(form.phone)) errors.phone = '숫자, +, - 만 입력해주세요.';
  if (form.instagram && !/^@?[A-Za-z0-9._]{1,30}$/.test(form.instagram)) errors.instagram = '영문, 숫자, ., _ 만 사용할 수 있어요.';
  return errors;
}

/** 폼 값을 guestbook 테이블 컬럼 형태로 변환 (빈 값은 null) */
function toEntry(form) {
  const orNull = (value) => value.trim() || null;
  return {
    name: form.name.trim(),
    message: form.message.trim(),
    rating: form.rating,
    instagram: orNull(form.instagram.replace(/^@/, '')),
    email: orNull(form.email),
    phone: orNull(form.phone),
  };
}

/** 비공개 입력칸 끝에 붙는 자물쇠 아이콘 */
const lockAdornment = {
  input: {
    endAdornment: (
      <InputAdornment position="end">
        <LockOutlinedIcon sx={{ fontSize: '1rem', color: 'text.disabled' }} />
      </InputAdornment>
    ),
  },
};

/** 핑크 포커스 색을 적용한 입력칸 스타일 */
const fieldSx = {
  '& .MuiOutlinedInput-root': { borderRadius: 3 },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'pink.main' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'pink.dark' },
};

/**
 * GuestbookForm 컴포넌트
 *
 * 방명록 작성 폼. 이름·메시지(필수) → 별점 → 연락처(선택) 순으로 배치하고,
 * 등록 후 서버가 랜덤으로 정해준 캐릭터를 알려준다.
 *
 * Props:
 * @param {function} onSubmit - 작성 데이터(entry)를 받아 저장하고 캐릭터 번호를 반환하는 비동기 함수 [Required]
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
      const avatarIndex = await onSubmit(toEntry(form));
      setForm(INITIAL_FORM);
      setFeedback({ severity: 'success', avatarIndex });
    } catch (submitError) {
      setFeedback({ severity: 'error', message: submitError.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const groupLabelSx = { fontSize: '0.8rem', fontWeight: 700, color: 'text.secondary', mb: 1 };

  return (
    <Box component="form" noValidate onSubmit={ handleSubmit }>
      <Stack spacing={ 2.5 }>
        <TextField
          label="이름"
          required
          size="small"
          value={ form.name }
          onChange={ handleChange('name') }
          error={ Boolean(errors.name) }
          helperText={ errors.name || '이름은 비공개! 방명록엔 랜덤 캐릭터로 표시돼요.' }
          slotProps={{ ...lockAdornment, htmlInput: { maxLength: 30 } }}
          sx={ fieldSx }
        />
        <TextField
          label="메시지"
          required
          multiline
          minRows={ 3 }
          placeholder="따뜻한 한마디를 남겨주세요 :)"
          value={ form.message }
          onChange={ handleChange('message') }
          error={ Boolean(errors.message) }
          helperText={ errors.message || `${form.message.length} / 500` }
          slotProps={{ htmlInput: { maxLength: 500 } }}
          sx={ fieldSx }
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            px: 2,
            py: 1.25,
            borderRadius: 3,
            bgcolor: 'pink.light',
          }}
        >
          <Box sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'pink.dark' }}>포트폴리오 별점</Box>
          <Rating
            name="guestbook-rating"
            value={ form.rating }
            onChange={ (event, value) => updateField('rating', value) }
            sx={{ color: 'pink.main' }}
          />
        </Box>

        <Box>
          <Box sx={ groupLabelSx }>연락처 (선택)</Box>
          <Stack spacing={ 1.5 }>
            <TextField
              label="인스타그램"
              size="small"
              placeholder="@username"
              value={ form.instagram }
              onChange={ handleChange('instagram') }
              error={ Boolean(errors.instagram) }
              helperText={ errors.instagram || '방명록에 함께 보여요.' }
              sx={ fieldSx }
            />
            <TextField
              label="이메일"
              type="email"
              size="small"
              value={ form.email }
              onChange={ handleChange('email') }
              error={ Boolean(errors.email) }
              helperText={ errors.email }
              slotProps={{ ...lockAdornment, htmlInput: { maxLength: 100 } }}
              sx={ fieldSx }
            />
            <TextField
              label="전화번호"
              type="tel"
              size="small"
              value={ form.phone }
              onChange={ handleChange('phone') }
              error={ Boolean(errors.phone) }
              helperText={ errors.phone }
              slotProps={{ ...lockAdornment, htmlInput: { maxLength: 20 } }}
              sx={ fieldSx }
            />
          </Stack>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1, fontSize: '0.75rem', color: 'text.secondary' }}>
            <LockOutlinedIcon sx={{ fontSize: '0.9rem' }} />
            자물쇠 표시 항목은 비공개로 저장되어 다른 사람에게 보이지 않아요.
          </Box>
        </Box>

        { feedback?.severity === 'success' && (
          <Alert
            icon={ <CharacterAvatar index={ feedback.avatarIndex } size={ 28 } /> }
            onClose={ () => setFeedback(null) }
            sx={{ alignItems: 'center', bgcolor: 'pink.light', color: 'text.primary', borderRadius: 3 }}
          >
            등록 완료! 이번엔 <strong>{ getCharacter(feedback.avatarIndex).name }</strong> 캐릭터가 뽑혔어요 🎉
          </Alert>
        ) }
        { feedback?.severity === 'error' && <Alert severity="error">{ feedback.message }</Alert> }

        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={ isSubmitting }
          endIcon={ <SendRoundedIcon /> }
          sx={{
            minHeight: 48,
            borderRadius: 3,
            bgcolor: 'pink.main',
            color: 'pink.contrastText',
            fontSize: '1rem',
            '&:hover': { bgcolor: 'pink.dark' },
          }}
        >
          { isSubmitting ? '보내는 중...' : '방명록 남기기' }
        </Button>
      </Stack>
    </Box>
  );
}

export default GuestbookForm;
