import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

/**
 * SocialLinks 컴포넌트
 *
 * SNS 링크를 동그란 핑크 아이콘 버튼으로 나란히 보여주고, 버튼 아래에 이름을 붙인다.
 *
 * Props:
 * @param {Array<{ id: string, icon: element, label: string, href: string }>} links - SNS 링크 목록 [Required]
 *
 * Example usage:
 * <SocialLinks links={ SOCIAL_LINKS } />
 */
function SocialLinks({ links }) {
  return (
    <Box
      component="ul"
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 2,
      }}
    >
      { links.map((link) => (
        <Box component="li" key={ link.id } sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <IconButton
            component="a"
            href={ link.href }
            target={ link.href.startsWith('mailto:') ? undefined : '_blank' }
            rel="noopener noreferrer"
            aria-label={ link.label }
            sx={{
              width: 64,
              height: 64,
              bgcolor: 'primary.light',
              color: 'primary.dark',
              border: 2,
              borderColor: 'primary.border',
              transition: 'background-color 0.2s, color 0.2s, transform 0.2s',
              '& svg': { fontSize: '1.8rem' },
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                borderColor: 'primary.main',
                transform: 'scale(1.08)',
              },
            }}
          >
            { link.icon }
          </IconButton>
          <Box component="span" sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'text.secondary' }}>
            { link.label }
          </Box>
        </Box>
      )) }
    </Box>
  );
}

export default SocialLinks;
