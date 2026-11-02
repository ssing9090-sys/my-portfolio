import Box from '@mui/material/Box';

/**
 * ContactInfoList 컴포넌트
 *
 * 아이콘 + 텍스트로 연락처를 세로 정렬해 보여준다.
 *
 * Props:
 * @param {Array<{ id: string, icon: element, label: string, value: string, href: string }>} items - 연락처 목록 [Required]
 *
 * Example usage:
 * <ContactInfoList items={ CONTACT_ITEMS } />
 */
function ContactInfoList({ items }) {
  return (
    <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      { items.map((item) => (
        <Box component="li" key={ item.id } sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              border: 1,
              borderColor: 'divider',
              color: 'text.primary',
            }}
          >
            { item.icon }
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Box sx={{ fontSize: '0.75rem', color: 'text.disabled', lineHeight: 1.4 }}>
              { item.label }
            </Box>
            <Box
              component={ item.href ? 'a' : 'span' }
              href={ item.href }
              sx={{
                fontSize: { xs: '0.95rem', md: '1rem' },
                color: 'text.primary',
                textDecoration: 'none',
                wordBreak: 'break-all',
                '&:hover': item.href ? { textDecoration: 'underline' } : undefined,
              }}
            >
              { item.value }
            </Box>
          </Box>
        </Box>
      )) }
    </Box>
  );
}

export default ContactInfoList;
