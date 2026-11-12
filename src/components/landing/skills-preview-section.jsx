import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useHomeData, usePortfolioStatus } from '../../hooks/use-portfolio.js';
import { CREAM, INK, SERIF_FONT } from '../../theme.js';
import LoadingFade from '../common/loading-fade.jsx';
import SkillFlavorCard from '../skills/skill-flavor-card.jsx';
import { DISPLAY_TITLE_SX, PILL_DARK_SX, SECTION_INNER_SX } from './landing-styles.js';

/** 카드 한 장 폭 (가로 스크롤 목록) */
const CARD_WIDTH = { xs: 268, md: 316 };

/** About Me 탭으로 이동한 뒤 스킬 섹션까지 스크롤 */
const SKILLS_STATE = { scrollTo: 'skills' };

/** 가로 목록 자리표시자 */
function CardsSkeleton({ count }) {
  return Array.from({ length: count }, (_, index) => (
    <Box component="li" key={ index } aria-hidden="true" sx={{ flex: '0 0 auto', width: CARD_WIDTH }}>
      <Skeleton variant="rounded" sx={{ height: { xs: 340, md: 400 }, borderRadius: '32px' }} />
    </Box>
  ));
}

/**
 * SkillsPreviewSection 컴포넌트
 *
 * 홈 탭의 Skills 섹션. 초대형 제목 아래, 메인 스킬 중 숙련도 상위 N개(기본 4개, About Me 탭에서 변경)를
 * 카테고리 원색 카드로 가로로 넘겨 보여준다. 첫 방문에 데이터를 불러오는 동안은 스켈레톤을 보여준다.
 *
 * Props:
 * @param {string} id - 섹션 앵커 id [Optional, 기본값: 'skills']
 *
 * Example usage:
 * <SkillsPreviewSection id="skills" />
 */
function SkillsPreviewSection({ id = 'skills' }) {
  const { skills } = useHomeData();
  const { isPlaceholder } = usePortfolioStatus();

  return (
    <Box
      id={ id }
      component="section"
      aria-labelledby={ `${id}-title` }
      aria-busy={ isPlaceholder }
      tabIndex={ -1 }
      sx={{ bgcolor: CREAM, py: { xs: 8, md: 14 }, outline: 'none' }}
    >
      <Box sx={ SECTION_INNER_SX }>
        <Typography sx={{ textAlign: 'center', fontFamily: SERIF_FONT, fontStyle: 'italic', fontSize: { xs: '1.3rem', md: '1.75rem' }, color: INK, mb: 1 }}>
          what I can do
        </Typography>
        <Typography id={ `${id}-title` } component="h2" sx={{ ...DISPLAY_TITLE_SX, color: INK }}>
          Find my{ ' ' }
          <br />
          skills
        </Typography>
        { !isPlaceholder && skills.length > 0 && (
          <Typography sx={{ mt: 3, textAlign: 'center', fontSize: { xs: '1rem', md: '1.1rem' }, fontWeight: 500, color: 'text.secondary' }}>
            숙련도가 가장 높은 기술 { skills.length }가지예요.
          </Typography>
        ) }
      </Box>

      { /* 가로로 넘기는 카드 목록 (키보드: 목록에 포커스 후 ← → 로 스크롤) */ }
      <Box
        component="ul"
        aria-label="숙련도 상위 스킬"
        tabIndex={ 0 }
        sx={{
          listStyle: 'none',
          m: 0,
          mt: { xs: 5, md: 8 },
          py: 2,
          px: { xs: 2, sm: 3, md: 5 },
          display: 'flex',
          gap: { xs: 2, md: 3 },
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollPaddingInline: { xs: 16, md: 40 },
          // 카드가 화면에 다 들어오면 가운데 정렬 (넘칠 때는 왼쪽부터 보이도록 justifyContent 대신 auto 여백)
          '& > li:first-of-type': { ml: 'auto' },
          '& > li:last-of-type': { mr: 'auto' },
          scrollbarWidth: 'thin',
          '& > li': { scrollSnapAlign: 'start' },
          '&:focus-visible': { outlineOffset: -4, boxShadow: 'none' },
        }}
      >
        <LoadingFade isLoading={ isPlaceholder } skeleton={ <CardsSkeleton count={ skills.length || 4 } /> } inline>
          { skills.length === 0 && (
            <Box component="li" sx={{ py: 6, mx: 'auto', color: 'text.secondary' }}>아직 등록된 스킬이 없어요.</Box>
          ) }
          { skills.map((skill, index) => (
            <Box component="li" key={ skill.id } sx={{ flex: '0 0 auto', width: CARD_WIDTH }}>
              <SkillFlavorCard skill={ skill } index={ index } />
            </Box>
          )) }
        </LoadingFade>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 6 } }}>
        <Button
          component={ Link }
          to="/about"
          state={ SKILLS_STATE }
          aria-describedby={ `${id}-title` }
          endIcon={ <ArrowForwardRoundedIcon /> }
          sx={ PILL_DARK_SX }
        >
          전체 스킬 보기
        </Button>
      </Box>
    </Box>
  );
}

export default SkillsPreviewSection;
