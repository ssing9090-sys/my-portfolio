import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { usePortfolioStatus } from '../../hooks/use-portfolio.js';

const STATUS_TEXT = {
  idle: '',
  saving: '저장 중…',
  saved: '저장됨',
  error: '저장 실패',
};

/**
 * SaveStatus 컴포넌트
 *
 * 자동 저장 상태(저장 중 / 저장됨 / 저장 실패)를 보여준다.
 * role="status" 라서 스크린 리더가 상태 변화를 읽어줘요.
 *
 * Props: 없음
 *
 * Example usage:
 * <SaveStatus />
 */
function SaveStatus() {
  const { saveStatus } = usePortfolioStatus();

  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        minHeight: 24,
        fontSize: '0.85rem',
        fontWeight: 700,
        color: saveStatus === 'error' ? 'error.main' : 'text.secondary',
      }}
    >
      { saveStatus === 'saving' && <CircularProgress size={ 14 } color="inherit" aria-hidden="true" /> }
      { saveStatus === 'saved' && <CheckCircleRoundedIcon aria-hidden="true" sx={{ fontSize: 16, color: 'success.main' }} /> }
      { saveStatus === 'error' && <ErrorOutlineRoundedIcon aria-hidden="true" sx={{ fontSize: 16 }} /> }
      { STATUS_TEXT[saveStatus] }
    </Box>
  );
}

export default SaveStatus;
