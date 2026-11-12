import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import GuestbookEntry from './guestbook-entry.jsx';

/**
 * GuestbookList 컴포넌트
 *
 * 방명록 목록을 카카오톡 채팅방처럼 옅은 배경 위에 최신순으로 나열한다.
 * 로딩·오류·빈 상태를 함께 처리하고, 길어지면 내부 스크롤된다.
 *
 * Props:
 * @param {Array} entries - 방명록 목록 [Required]
 * @param {boolean} isLoading - 로딩 중 여부 [Optional, 기본값: false]
 * @param {string} error - 오류 메시지 [Optional, 기본값: '']
 *
 * Example usage:
 * <GuestbookList entries={ entries } isLoading={ isLoading } error={ error } />
 */
function GuestbookList({ entries, isLoading = false, error = '' }) {
  const renderContent = () => {
    if (error) {
      return <Alert severity="error">{ error }</Alert>;
    }

    if (isLoading && entries.length === 0) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress size={ 28 } sx={{ color: 'primary.main' }} />
        </Box>
      );
    }

    if (entries.length === 0) {
      return (
        <Box sx={{ py: 6, textAlign: 'center', fontSize: '0.9rem', color: 'text.secondary' }}>
          아직 방명록이 없어요.<br />첫 번째 메시지의 주인공이 되어주세요 💕
        </Box>
      );
    }

    return (
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        { entries.map((entry) => (
          <GuestbookEntry key={ entry.id } entry={ entry } />
        )) }
      </Box>
    );
  };

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 320,
        maxHeight: { xs: 480, md: 640 },
        overflowY: 'auto',
        p: { xs: 1.5, md: 2 },
        borderRadius: 3,
        bgcolor: 'primary.light',
      }}
    >
      { renderContent() }
    </Box>
  );
}

export default GuestbookList;
