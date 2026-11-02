/**
 * 카카오톡 말풍선 옆 시간처럼 표시
 * 오늘이면 '오후 3:24', 올해면 '11월 2일', 그 외는 '2025. 11. 2.'
 *
 * @param {string} isoString - 변환할 날짜 문자열
 * @returns {string} 포맷된 시간
 */
export function formatChatTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();

  if (date.toDateString() === now.toDateString()) {
    return new Intl.DateTimeFormat('ko-KR', { hour: 'numeric', minute: '2-digit' }).format(date);
  }
  if (date.getFullYear() === now.getFullYear()) {
    return new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric' }).format(date);
  }
  return new Intl.DateTimeFormat('ko-KR').format(date);
}
