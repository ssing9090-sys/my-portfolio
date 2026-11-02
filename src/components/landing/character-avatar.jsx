import Box from '@mui/material/Box';
import { getCharacter } from '../../utils/characters.js';

/**
 * CharacterAvatar 컴포넌트
 *
 * 방명록 작성자의 프로필 사진 자리에 랜덤 만화 캐릭터를 둥근 사각형(카카오톡 프로필 모양)으로 보여준다.
 *
 * Props:
 * @param {number} index - 캐릭터 번호 (guestbook.avatar_index) [Required]
 * @param {number} size - 아바타 크기(px) [Optional, 기본값: 44]
 *
 * Example usage:
 * <CharacterAvatar index={ entry.avatar_index } />
 */
function CharacterAvatar({ index, size = 44 }) {
  const character = getCharacter(index);

  return (
    <Box
      role="img"
      aria-label={ `${character.name} 프로필` }
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '38%',
        bgcolor: character.color,
        fontSize: size * 0.5,
        lineHeight: 1,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.12)',
      }}
    >
      { character.emoji }
    </Box>
  );
}

export default CharacterAvatar;
