import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { usePortfolioActions } from '../../hooks/use-portfolio.js';

/**
 * OwnerLoginDialog 컴포넌트
 *
 * 포트폴리오 주인 계정(Supabase 이메일·비밀번호)으로 로그인하는 창.
 * 로그인에 성공하면 About Me 탭의 '편집' 버튼이 나타난다.
 *
 * Props:
 * @param {boolean} open - 창 열림 여부 [Required]
 * @param {Function} onClose - 창 닫기 (로그인 성공 시에도 호출) [Required]
 *
 * Example usage:
 * <OwnerLoginDialog open={ isOpen } onClose={ () => setIsOpen(false) } />
 */
function OwnerLoginDialog({ open, onClose }) {
  const { signIn } = usePortfolioActions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    if (isSubmitting) return;
    setPassword('');
    setError('');
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const message = await signIn(email.trim(), password);
    setIsSubmitting(false);

    if (message) {
      setError(message);
      return;
    }
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <Dialog
      open={ open }
      onClose={ handleClose }
      fullWidth
      maxWidth="xs"
      slotProps={{ paper: { component: 'form', onSubmit: handleSubmit } }}
    >
      <DialogTitle sx={{ fontWeight: 700 }}>관리자 로그인</DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 2, fontSize: '0.9rem', color: 'text.secondary', wordBreak: 'keep-all' }}>
          포트폴리오 주인 계정으로 로그인하면 About Me 내용을 고칠 수 있어요.
        </Typography>
        <Stack spacing={ 2 }>
          { error && <Alert severity="error">{ error }</Alert> }
          <TextField
            label="이메일"
            type="email"
            autoComplete="email"
            value={ email }
            onChange={ (event) => setEmail(event.target.value) }
            required
            autoFocus
            fullWidth
          />
          <TextField
            label="비밀번호"
            type="password"
            autoComplete="current-password"
            value={ password }
            onChange={ (event) => setPassword(event.target.value) }
            required
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={ handleClose } color="inherit" disabled={ isSubmitting }>취소</Button>
        <Button type="submit" variant="contained" disableElevation disabled={ isSubmitting || !email || !password }>
          { isSubmitting ? '로그인 중…' : '로그인' }
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default OwnerLoginDialog;
