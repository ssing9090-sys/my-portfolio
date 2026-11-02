import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { getCharacter } from '../../utils/characters.js';
import { formatChatTime } from '../../utils/format-date.js';
import CharacterAvatar from './character-avatar.jsx';

/**
 * GuestbookEntry 컴포넌트
 *
 * 방명록 한 건을 카카오톡 채팅 메시지처럼 보여준다.
 * (캐릭터 프로필 + "익명의 캐릭터" 닉네임 + 말풍선 + 옆에 작은 시간)
 *
 * Props:
 * @param {object} entry - guestbook 테이블의 공개 컬럼 데이터 [Required]
 *
 * Example usage:
 * <GuestbookEntry entry={ entry } />
 */
function GuestbookEntry({ entry }) {
  const character = getCharacter(entry.avatar_index);

  return (
    <Box
      component="li"
      sx={{
        display: 'flex',
        gap: 1.25,
        animation: 'guestbookPop 0.3s ease-out',
        '@keyframes guestbookPop': {
          from: { opacity: 0, transform: 'translateY(6px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <CharacterAvatar index={ entry.avatar_index } />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 0.75, mb: 0.5 }}>
          <Box component="span" sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'text.primary' }}>
            익명의 { character.name }
          </Box>
          { entry.instagram && (
            <Box
              component="a"
              href={ `https://www.instagram.com/${entry.instagram}` }
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontSize: '0.75rem', color: 'primary.dark', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              @{ entry.instagram }
            </Box>
          ) }
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.75 }}>
          <Box
            sx={{
              position: 'relative',
              maxWidth: 'calc(100% - 56px)',
              px: 1.5,
              py: 1,
              borderRadius: '4px 16px 16px 16px',
              bgcolor: 'background.paper',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
              fontSize: { xs: '0.9rem', md: '0.92rem' },
              lineHeight: 1.55,
              color: 'text.primary',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            { entry.rating && (
              <Rating
                value={ entry.rating }
                readOnly
                size="small"
                sx={{ display: 'flex', mb: 0.25, color: 'primary.main', fontSize: '0.95rem' }}
              />
            ) }
            { entry.message }
          </Box>
          <Box
            component="time"
            dateTime={ entry.created_at }
            sx={{ flexShrink: 0, fontSize: '0.7rem', color: 'text.secondary', whiteSpace: 'nowrap' }}
          >
            { formatChatTime(entry.created_at) }
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default GuestbookEntry;
