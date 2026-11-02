/**
 * 방명록 프로필 캐릭터 목록
 * guestbook.avatar_index(0~11, DB 에서 랜덤 배정) 와 순서가 1:1 로 대응한다.
 * 저작권 이미지 대신 캐릭터를 떠올리게 하는 이모지 + 대표 색상으로 표현한다.
 */
export const CHARACTERS = [
  { name: '피카츄', emoji: '⚡', color: '#FFE066' },
  { name: '도라에몽', emoji: '🔔', color: '#7CCBFF' },
  { name: '스누피', emoji: '🐶', color: '#EDEDED' },
  { name: '곰돌이 푸', emoji: '🍯', color: '#FFC857' },
  { name: '헬로키티', emoji: '🎀', color: '#FFC9DE' },
  { name: '짱구', emoji: '🍙', color: '#FFB4A2' },
  { name: '미키마우스', emoji: '🐭', color: '#FF8A80' },
  { name: '토토로', emoji: '🌳', color: '#B8D8A8' },
  { name: '스폰지밥', emoji: '🧽', color: '#FFF176' },
  { name: '뽀로로', emoji: '🐧', color: '#90CAF9' },
  { name: '케로로', emoji: '🐸', color: '#A5D6A7' },
  { name: '미니언', emoji: '🍌', color: '#FFE082' },
];

/**
 * 캐릭터 번호로 캐릭터 정보를 반환 (범위를 벗어나면 0번 캐릭터)
 *
 * @param {number} index - avatar_index 값
 * @returns {{ name: string, emoji: string, color: string }} 캐릭터 정보
 */
export function getCharacter(index) {
  return CHARACTERS[index] ?? CHARACTERS[0];
}
