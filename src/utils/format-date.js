/**
 * ISO 날짜 문자열을 'YYYY. MM. DD. HH:mm' 형태의 한국어 날짜로 변환
 *
 * @param {string} isoString - 변환할 날짜 문자열
 * @returns {string} 포맷된 날짜
 */
export function formatDate(isoString) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(isoString));
}
