/**
 * 긴 글을 maxLength 글자까지 자르고, 실제로 잘렸을 때만 '…' 를 붙인다.
 * 줄바꿈·연속 공백은 공백 하나로 합친다.
 *
 * @param {string} text - 원문
 * @param {number} maxLength - 최대 글자 수
 *
 * Example usage:
 * summarize('아주 긴 글...', 100);
 */
export function summarize(text, maxLength) {
  const singleLine = text.replace(/\s+/g, ' ').trim();
  if (singleLine.length <= maxLength) {
    return singleLine;
  }
  return `${singleLine.slice(0, maxLength).trimEnd()}…`;
}
