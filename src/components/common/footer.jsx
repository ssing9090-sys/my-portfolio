import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { usePortfolioData } from '../../hooks/use-portfolio.js';
import { INK, SERIF_FONT } from '../../theme.js';

/** 저작권 연도 (페이지를 연 시점 기준) */
const YEAR = new Date().getFullYear();

/**
 * Footer 컴포넌트
 *
 * 모든 페이지 맨 아래의 검정 띠. 사이트 이름과 저작권 문구(이름은 About Me 기본 정보)를 보여준다.
 *
 * Props: 없음
 *
 * Example usage:
 * <Footer />
 */
function Footer() {
  const { basicInfo } = usePortfolioData();
  const name = basicInfo.name.trim();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: INK,
        color: 'rgba(255, 255, 255, 0.72)',
        px: { xs: 2, md: 5 },
        py: { xs: 3, md: 4 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: 1,
      }}
    >
      <Typography sx={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.1rem' }}>
        <Box component="span" sx={{ fontFamily: SERIF_FONT, fontStyle: 'italic', fontWeight: 400, mr: 0.5 }}>hj.</Box>
        PORTFOLIO
      </Typography>
      <Typography sx={{ fontSize: '0.85rem' }}>
        © { YEAR }{ name ? ` ${name}` : '' } · Made with React & a lot of coffee
      </Typography>
    </Box>
  );
}

export default Footer;
