import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

/**
 * PagePlaceholder 컴포넌트
 *
 * 아직 개발 전인 페이지의 자리를 표시하는 카드.
 *
 * Props:
 * @param {string} title - 페이지 제목 [Required]
 * @param {string} description - 페이지 안내 문구 [Required]
 *
 * Example usage:
 * <PagePlaceholder title="About Me" description="..." />
 */
function PagePlaceholder({ title, description }) {
  return (
    <Card
      elevation={ 0 }
      sx={{
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderTop: 6,
        borderTopColor: 'primary.main',
        textAlign: 'center',
      }}
    >
      <CardContent sx={{ px: { xs: 2, md: 4 }, py: { xs: 6, md: 10 } }}>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 800,
            lineHeight: 1.2,
            color: 'text.primary',
            mb: 2,
          }}
        >
          { title }
        </Typography>
        <Box
          sx={{
            width: 48,
            height: 4,
            mx: 'auto',
            mb: 3,
            borderRadius: 2,
            bgcolor: 'primary.main',
          }}
        />
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.15rem' },
            lineHeight: 1.6,
            color: 'text.secondary',
          }}
        >
          { description }
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PagePlaceholder;
