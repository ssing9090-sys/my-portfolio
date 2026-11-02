import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import GuestbookEntry from './guestbook-entry.jsx';

/**
 * GuestbookList 컴포넌트
 *
 * 방명록 목록을 최신순으로 세로 나열한다. 로딩·오류·빈 상태를 함께 처리한다.
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
  if (error) {
    return <Alert severity="error">{ error }</Alert>;
  }

  if (isLoading && entries.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress size={ 28 } sx={{ color: 'text.secondary' }} />
      </Box>
    );
  }

  if (entries.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center', fontSize: '0.95rem', color: 'text.disabled' }}>
        아직 방명록이 없습니다. 첫 번째 메시지를 남겨주세요!
      </Box>
    );
  }

  return (
    <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, borderTop: 1, borderColor: 'divider' }}>
      { entries.map((entry) => (
        <GuestbookEntry key={ entry.id } entry={ entry } />
      )) }
    </Box>
  );
}

export default GuestbookList;
