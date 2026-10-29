import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

/**
 * SectionCard 컴포넌트
 *
 * Home 페이지의 각 섹션 자리를 표시하는 카드.
 *
 * Props:
 * @param {string} id - 섹션 앵커 id [Required]
 * @param {string} order - 섹션 순번 표시 (예: '01') [Required]
 * @param {string} title - 섹션 이름 [Required]
 * @param {string} description - 섹션 역할 설명 [Required]
 * @param {boolean} isHighlighted - 메인 컬러 배경으로 강조할지 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <SectionCard id="hero" order="01" title="Hero" description="..." isHighlighted />
 */
function SectionCard({ id, order, title, description, isHighlighted = false }) {
  return (
    <Card
      id={ id }
      component="section"
      elevation={ 0 }
      sx={{
        bgcolor: isHighlighted ? 'primary.light' : 'background.paper',
        border: 1,
        borderColor: isHighlighted ? 'primary.main' : 'divider',
        borderLeft: 6,
        borderLeftColor: 'primary.main',
        transition: 'border-color 0.2s',
        '&:hover': { borderColor: 'primary.main' },
      }}
    >
      <CardContent
        sx={{
          px: { xs: 2, md: 4 },
          py: isHighlighted ? { xs: 5, md: 8 } : { xs: 3, md: 4 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
          <Chip
            label={ order }
            size="small"
            sx={{
              bgcolor: 'primary.dark',
              color: '#FFFFFF',
              fontWeight: 700,
            }}
          />
          <Typography
            component="h2"
            sx={{
              fontSize: isHighlighted ? { xs: '1.75rem', md: '2.5rem' } : { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 800,
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            { title }
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: { xs: '0.95rem', md: '1.05rem' },
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

export default SectionCard;
