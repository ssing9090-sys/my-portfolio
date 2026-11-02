import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import { formatDate } from '../../utils/format-date.js';

/**
 * GuestbookEntry 컴포넌트
 *
 * 방명록 한 건을 보여준다. 좋아하는 색깔은 이모지 아바타 테두리로 표현한다.
 *
 * Props:
 * @param {object} entry - guestbook 테이블의 공개 컬럼 데이터 [Required]
 *
 * Example usage:
 * <GuestbookEntry entry={ entry } />
 */
function GuestbookEntry({ entry }) {
  return (
    <Box component="li" sx={{ display: 'flex', gap: 2, py: 2.5, borderBottom: 1, borderColor: 'divider' }}>
      <Box
        aria-hidden
        sx={{
          width: 44,
          height: 44,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          fontSize: '1.3rem',
          bgcolor: 'background.default',
          border: 3,
          borderColor: entry.favorite_color || 'divider',
        }}
      >
        { entry.emoji || entry.name.charAt(0) }
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 1, rowGap: 0.5 }}>
          <Box component="strong" sx={{ fontSize: '0.95rem', color: 'text.primary' }}>
            { entry.name }
          </Box>
          { entry.keyword && (
            <Chip label={ `#${entry.keyword}` } size="small" variant="outlined" sx={{ height: 22, fontSize: '0.75rem' }} />
          ) }
          { entry.rating && (
            <Rating value={ entry.rating } readOnly size="small" sx={{ color: 'text.primary' }} />
          ) }
        </Box>

        <Box
          sx={{
            mt: 0.75,
            fontSize: { xs: '0.9rem', md: '0.95rem' },
            lineHeight: 1.6,
            color: 'text.primary',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          { entry.message }
        </Box>

        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1.5, fontSize: '0.8rem', color: 'text.disabled' }}>
          <Box component="time" dateTime={ entry.created_at }>{ formatDate(entry.created_at) }</Box>
          { entry.instagram && (
            <Box
              component="a"
              href={ `https://www.instagram.com/${entry.instagram}` }
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              @{ entry.instagram }
            </Box>
          ) }
        </Box>
      </Box>
    </Box>
  );
}

export default GuestbookEntry;
