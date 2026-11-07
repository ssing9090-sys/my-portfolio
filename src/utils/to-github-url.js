/**
 * GitHub Pages 배포 주소에서 저장소 주소를 만든다.
 *
 * @param {string} detailUrl - 배포 주소 (예: https://user.github.io/repo)
 * @returns {string} 저장소 주소 (예: https://github.com/user/repo), GitHub Pages 주소가 아니면 빈 문자열
 *
 * Example usage:
 * toGithubUrl('https://user.github.io/repo'); // 'https://github.com/user/repo'
 */
function toGithubUrl(detailUrl) {
  const match = detailUrl.match(/^https:\/\/([^.]+)\.github\.io\/([^/]+)/);
  return match ? `https://github.com/${ match[1] }/${ match[2] }` : '';
}

export default toGithubUrl;
