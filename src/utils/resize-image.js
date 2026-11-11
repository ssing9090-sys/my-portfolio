/** 프로필 사진의 짧은 변 기준 최대 크기(px). 화면에는 최대 104px 로 보이니 고해상도 화면까지 넉넉해요. */
const MAX_SHORT_SIDE = 320;

/** JPEG 압축 품질 (0~1) */
const JPEG_QUALITY = 0.85;

/**
 * 이미지 파일을 작게 줄여 data URL(문자열)로 바꾼다.
 * 원본 사진(수 MB)을 그대로 저장하면 브라우저 저장 공간(localStorage, 약 5MB)을 금방 넘기 때문에,
 * 짧은 변을 320px 로 줄이고 JPEG 로 압축해 수십 KB 로 만든다.
 *
 * @param {File} file - 사용자가 고른 이미지 파일
 * @returns {Promise<string>} 'data:image/jpeg;base64,...' 형태의 문자열
 * @throws 브라우저가 읽을 수 없는 형식(예: 일부 HEIC)이면 에러
 *
 * Example usage:
 * const photo = await resizeImageToDataUrl(file);
 */
export async function resizeImageToDataUrl(file) {
  // createImageBitmap 은 휴대폰 사진의 회전 정보(EXIF)도 반영해서 읽어요.
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SHORT_SIDE / Math.min(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  // 투명한 PNG 가 JPEG 로 바뀌며 검게 되지 않도록 흰 배경을 먼저 칠한다.
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, width, height);
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  return canvas.toDataURL('image/jpeg', JPEG_QUALITY);
}
