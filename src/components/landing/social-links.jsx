import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

/**
 * SocialLinks 컴포넌트
 *
 * SNS 링크를 동그란 아이콘 버튼으로 나란히 보여준다.
 *
 * Props:
 * @param {Array<{ id: string, icon: element, label: string, href: string }>} links - SNS 링크 목록 [Required]
 *
 * Example usage:
 * <SocialLinks links={ SOCIAL_LINKS } />
 */
function SocialLinks({ links }) {
  return (
    <Stack direction="row" spacing={ 1.5 }>
      { links.map((link) => (
        <Tooltip key={ link.id } title={ link.label }>
          <IconButton
            component="a"
            href={ link.href }
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ link.label }
            sx={{
              width: 48,
              height: 48,
              border: 1,
              borderColor: 'text.primary',
              color: 'text.primary',
              transition: 'background-color 0.2s, color 0.2s',
              '&:hover': { bgcolor: 'text.primary', color: 'background.paper' },
            }}
          >
            { link.icon }
          </IconButton>
        </Tooltip>
      )) }
    </Stack>
  );
}

export default SocialLinks;
