import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';

/** 새 탭이 열리는 동안 로딩 표시를 유지하는 시간(ms) */
const LOADING_DURATION = 900;

/**
 * ProjectLinkButton 컴포넌트
 *
 * 외부 링크를 새 탭으로 여는 버튼. 클릭하면 잠시 로딩을 표시한다.
 *
 * Props:
 * @param {string} href - 이동할 주소 [Required]
 * @param {string} label - 버튼 문구 [Required]
 * @param {string} ariaLabel - 스크린리더용 설명 [Required]
 * @param {node} startIcon - 버튼 앞 아이콘 [Required]
 * @param {string} variant - MUI Button variant [Optional, 기본값: 'contained']
 * @param {boolean} onColor - 원색·검정 카드 위에 놓이는지 (흰색 버튼으로 바뀜) [Optional, 기본값: false]
 *
 * Example usage:
 * <ProjectLinkButton href={ url } label="Live Demo" ariaLabel="데모 열기" startIcon={ <LaunchIcon /> } />
 */
function ProjectLinkButton({ href, label, ariaLabel, startIcon, variant = 'contained', onColor = false }) {
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  /** 로딩 표시 후 일정 시간이 지나면 버튼을 되돌린다. */
  const handleClick = () => {
    setIsLoading(true);
    timerRef.current = setTimeout(() => setIsLoading(false), LOADING_DURATION);
  };

  const isContained = variant === 'contained';

  /** 밝은 배경용 / 원색 배경용 색 조합 */
  const colorSx = onColor
    ? (isContained
      ? { bgcolor: '#FFFFFF', color: '#121212', '&:hover': { bgcolor: '#FFFFFF', opacity: 0.88 } }
      : { borderColor: 'rgba(255, 255, 255, 0.7)', color: '#FFFFFF', '&:hover': { borderColor: '#FFFFFF', bgcolor: 'rgba(255, 255, 255, 0.12)' } })
    : (isContained
      ? { bgcolor: 'primary.main', color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.hover' } }
      : { borderColor: 'primary.border', color: 'primary.dark', '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.light' } });

  return (
    <Button
      component="a"
      href={ href }
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ ariaLabel }
      variant={ variant }
      disableElevation
      fullWidth
      loading={ isLoading }
      loadingPosition="start"
      startIcon={ startIcon }
      onClick={ handleClick }
      sx={{
        minHeight: 44,
        px: 1,
        whiteSpace: 'nowrap',
        textTransform: 'none',
        fontWeight: 700,
        ...colorSx,
      }}
    >
      { label }
    </Button>
  );
}

export default ProjectLinkButton;
