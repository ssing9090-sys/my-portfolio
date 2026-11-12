import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SERIF_FONT } from '../../theme.js';
import { DISPLAY_TITLE_SX, SECTION_INNER_SX } from '../landing/landing-styles.js';

/**
 * AboutBand 컴포넌트
 *
 * About Me 탭의 풀폭 색 띠 섹션 틀. (홈 탭 섹션과 같은 디자인)
 * 세리프 이탤릭 한 줄 + 초대형 영문 제목(h2) + 설명 + 버튼 줄 + 내용.
 *
 * Props:
 * @param {string} id - 섹션 앵커 id (제목 id 는 `${id}-title`) [Required]
 * @param {string} bgcolor - 띠 배경색 [Required]
 * @param {string} color - 제목·설명 글자색 [Optional, 기본값: '#121212']
 * @param {string} accentColor - 세리프 한 줄 색 [Optional, 기본값: color]
 * @param {string} kicker - 제목 위 세리프 이탤릭 한 줄 (예: 'who I am') [Optional]
 * @param {string} title - 초대형 제목 (예: 'My story') [Required]
 * @param {React.ReactNode} description - 제목 아래 설명 [Optional]
 * @param {React.ReactNode} actions - 설명 아래 버튼 줄 [Optional]
 * @param {React.ReactNode} children - 섹션 내용 [Required]
 *
 * Example usage:
 * <AboutBand id="story" bgcolor={ INK } color="#FFFFFF" kicker="in my words" title="My story">...</AboutBand>
 */
function AboutBand({ id, bgcolor, color = '#121212', accentColor, kicker, title, description, actions, children }) {
  return (
    <Box
      id={ id }
      component="section"
      aria-labelledby={ `${id}-title` }
      tabIndex={ -1 }
      sx={{ bgcolor, color, py: { xs: 7, md: 11 }, outline: 'none', scrollMarginTop: { xs: 60, md: 76 } }}
    >
      <Box sx={ SECTION_INNER_SX }>
        { kicker && (
          <Typography
            sx={{ textAlign: 'center', fontFamily: SERIF_FONT, fontStyle: 'italic', fontSize: { xs: '1.3rem', md: '1.75rem' }, color: accentColor ?? color, mb: 1 }}
          >
            { kicker }
          </Typography>
        ) }
        <Typography
          id={ `${id}-title` }
          component="h2"
          sx={{ ...DISPLAY_TITLE_SX, fontSize: { xs: 'clamp(2.5rem, 13vw, 4rem)', md: 'clamp(4rem, 7vw, 6.5rem)' }, color }}
        >
          { title }
        </Typography>
        { description && (
          <Typography
            sx={{ mt: 2.5, textAlign: 'center', fontSize: { xs: '1rem', md: '1.1rem' }, fontWeight: 500, opacity: 0.8, wordBreak: 'keep-all' }}
          >
            { description }
          </Typography>
        ) }
        { actions && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
            { actions }
          </Box>
        ) }
        <Box sx={{ mt: { xs: 5, md: 7 } }}>
          { children }
        </Box>
      </Box>
    </Box>
  );
}

export default AboutBand;
