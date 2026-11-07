import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * ContactPanel 컴포넌트
 *
 * Contact 섹션 2x2 배치의 한 칸. 오렌지 테두리 카드 + 아이콘 제목으로 구성한다.
 *
 * Props:
 * @param {string} emoji - 제목 앞 아이콘 이모지 [Required]
 * @param {string} title - 칸 제목 [Required]
 * @param {string} description - 제목 아래 보조 설명 [Optional]
 * @param {node} children - 칸 내용 [Required]
 *
 * Example usage:
 * <ContactPanel emoji="💌" title="이메일" description="편하게 메일 주세요">...</ContactPanel>
 */
function ContactPanel({ emoji, title, description, children }) {
  return (
    <Box
      component="section"
      aria-label={ title }
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'primary.border',
        boxShadow: '0 4px 16px rgba(232, 130, 70, 0.08)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '@media (hover: hover)': {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(232, 130, 70, 0.14)',
          },
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: description ? 0.5 : 2 }}>
        <Box
          aria-hidden
          sx={{
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            bgcolor: 'primary.light',
            fontSize: '1rem',
          }}
        >
          { emoji }
        </Box>
        <Typography component="h3" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, fontWeight: 700, color: 'text.primary' }}>
          { title }
        </Typography>
      </Box>
      { description && (
        <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', mb: 2, pl: 5 }}>
          { description }
        </Typography>
      ) }
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        { children }
      </Box>
    </Box>
  );
}

export default ContactPanel;
