import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';

/**
 * ContactEmailButton 컴포넌트
 *
 * 이메일을 눈에 띄는 큰 검정 알약 버튼으로 보여준다. 주소는 화면에 표시하지 않고, 누르면 메일 앱이 열리며 아래 버튼으로 주소를 복사할 수 있다.
 *
 * Props:
 * @param {string} email - 연락받을 이메일 주소 [Required]
 *
 * Example usage:
 * <ContactEmailButton email="hello@example.com" />
 */
function ContactEmailButton({ email }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flex: 1, justifyContent: 'center' }}>
      <Button
        href={ `mailto:${email}` }
        variant="contained"
        disableElevation
        startIcon={ <MailRoundedIcon sx={{ fontSize: '1.6rem !important' }} /> }
        sx={{
          minHeight: 72,
          px: 3,
          borderRadius: 4,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          fontSize: { xs: '1rem', md: '1.15rem' },
          fontWeight: 700,
          textTransform: 'none',
          wordBreak: 'break-all',
          '&:hover': { bgcolor: 'primary.hover' },
        }}
      >
        메일 보내기
      </Button>
      <Button
        onClick={ handleCopy }
        variant="outlined"
        startIcon={ <ContentCopyRoundedIcon /> }
        sx={{
          minHeight: 48,
          borderRadius: 4,
          borderColor: 'primary.border',
          color: 'primary.dark',
          textTransform: 'none',
          wordBreak: 'break-all',
          '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.light' },
        }}
      >
        이메일 주소 복사하기
      </Button>
      <Snackbar
        open={ isCopied }
        autoHideDuration={ 2000 }
        onClose={ () => setIsCopied(false) }
        message="이메일 주소를 복사했어요 💌"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}

export default ContactEmailButton;
