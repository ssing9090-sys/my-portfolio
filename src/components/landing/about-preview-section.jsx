import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useHomeData, usePortfolioStatus } from '../../hooks/use-portfolio.js';
import { INK, SERIF_FONT, VIVID } from '../../theme.js';
import ProfileCard from '../about/profile-card.jsx';
import LoadingFade from '../common/loading-fade.jsx';
import SkillIconList from '../skills/skill-icon-list.jsx';
import SkillIconListSkeleton from '../skills/skill-icon-list-skeleton.jsx';
import { OUTLINE_BADGE_SX, PILL_LIGHT_SX, SECTION_INNER_SX } from './landing-styles.js';
import ScrollRevealText from './scroll-reveal-text.jsx';

/** 두 번째부터의 소개 글 카드 배경 (순서대로 돌려 써요) */
const CARD_COLORS = [VIVID.yellow, { main: '#FFFFFF', on: INK }];

const STORY_TEXT_SX = {
  m: 0,
  fontSize: { xs: 'clamp(1.5rem, 6.4vw, 2rem)', md: 'clamp(2rem, 3.4vw, 3rem)' },
  fontWeight: 700,
  lineHeight: 1.3,
  letterSpacing: '-0.02em',
  wordBreak: 'keep-all',
};

/** 타원 안 문장 자리표시자 */
function StorySkeleton() {
  return (
    <Box aria-hidden="true" sx={{ width: '100%' }}>
      { ['92%', '100%', '70%'].map((width) => (
        <Skeleton key={ width } variant="text" width={ width } sx={{ mx: 'auto', fontSize: '2.5rem', bgcolor: 'rgba(255, 255, 255, 0.12)' }} />
      )) }
    </Box>
  );
}

/**
 * AboutPreviewSection 컴포넌트
 *
 * 홈 탭의 About Me 섹션. About Me 탭 데이터에서 자동으로 만들어진다.
 * - 초록 배경 위 검정 타원: 첫 번째 소개 글('나의 개발 스토리') 요약이 스크롤에 맞춰 차오름
 * - 아래: 프로필 카드 + 나머지 소개 글 카드 + 주요 스킬
 * 첫 방문에 데이터를 불러오는 동안은 스켈레톤을, 불러오기에 실패하면 안내 문구를 보여준다.
 *
 * Props:
 * @param {string} id - 섹션 앵커 id [Optional, 기본값: 'about']
 *
 * Example usage:
 * <AboutPreviewSection id="about" />
 */
function AboutPreviewSection({ id = 'about' }) {
  const { content, skills, basicInfo } = useHomeData();
  const { isPlaceholder, loadError } = usePortfolioStatus();
  const [story, ...others] = content;

  return (
    <Box
      id={ id }
      component="section"
      aria-labelledby={ `${id}-title` }
      aria-busy={ isPlaceholder }
      tabIndex={ -1 }
      sx={{ position: 'relative', overflow: 'hidden', bgcolor: VIVID.green.main, pb: { xs: 6, md: 10 }, outline: 'none' }}
    >
      { /* 검정 타원 + 대표 문장 */ }
      <Box
        sx={{
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
          width: { xs: '165vw', md: '114vw' },
          aspectRatio: { xs: '1 / 0.92', md: '1.6 / 1' },
          borderRadius: '50%',
          bgcolor: INK,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: '100vw', maxWidth: 880, px: { xs: 3, md: 4 }, textAlign: 'center', color: '#FFFFFF' }}>
          <Typography id={ `${id}-title` } component="h2" sx={{ ...OUTLINE_BADGE_SX, color: VIVID.green.main, fontSize: '0.9rem' }}>
            ABOUT ME
          </Typography>
          <Typography
            component="h3"
            sx={{ mt: 2.5, mb: 2, fontFamily: SERIF_FONT, fontStyle: 'italic', fontWeight: 400, fontSize: { xs: '1.4rem', md: '1.9rem' }, color: 'rgba(255, 255, 255, 0.7)' }}
          >
            { story?.title ?? 'my story' }
          </Typography>

          <LoadingFade isLoading={ isPlaceholder } skeleton={ <StorySkeleton /> }>
            { story?.summary ? (
              <ScrollRevealText text={ story.summary } sx={ STORY_TEXT_SX } />
            ) : (
              <Typography sx={{ ...STORY_TEXT_SX, color: 'rgba(255, 255, 255, 0.5)' }}>
                { story ? '아직 작성 전이에요.' : '홈에 표시할 소개 글이 없어요.' }
              </Typography>
            ) }
          </LoadingFade>

          <Button
            component={ Link }
            to="/about"
            aria-describedby={ `${id}-title` }
            endIcon={ <ArrowForwardRoundedIcon /> }
            sx={{ ...PILL_LIGHT_SX, mt: { xs: 4, md: 5 } }}
          >
            더 알아보기
          </Button>
        </Box>
      </Box>

      { /* 프로필 카드 + 나머지 소개 글 + 주요 스킬 */ }
      <Box sx={{ ...SECTION_INNER_SX, mt: { xs: -2, md: -4 }, position: 'relative' }}>
        { loadError && (
          <Alert severity="info" sx={{ mb: 2.5, borderRadius: 3 }}>
            최신 소개 내용을 불러오지 못해 임시 내용을 보여주고 있어요.
          </Alert>
        ) }

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' },
            gap: { xs: 2, md: 3 },
          }}
        >
          <Box sx={{ '& > div': { height: '100%', bgcolor: '#FFFFFF', border: 0, borderRadius: '28px' } }}>
            <ProfileCard basicInfo={ basicInfo } />
          </Box>
          { others.map((item, index) => {
            const tone = CARD_COLORS[index % CARD_COLORS.length];
            return (
              <Box key={ item.id } sx={{ p: { xs: 3, md: 3.5 }, borderRadius: '28px', bgcolor: tone.main, color: tone.on }}>
                <Typography component="h3" sx={{ fontWeight: 900, fontSize: { xs: '1.5rem', md: '1.75rem' }, lineHeight: 1.15, letterSpacing: '-0.03em' }}>
                  { item.title }
                </Typography>
                <LoadingFade isLoading={ isPlaceholder } skeleton={ <Skeleton variant="text" sx={{ mt: 1.5, fontSize: '1rem' }} /> }>
                  <Typography sx={{ mt: 1.5, fontSize: '1rem', lineHeight: 1.7, fontWeight: 500, wordBreak: 'keep-all', opacity: item.summary ? 0.85 : 0.5 }}>
                    { item.summary || '아직 작성 전이에요.' }
                  </Typography>
                </LoadingFade>
              </Box>
            );
          }) }
        </Box>

        <Box sx={{ mt: { xs: 4, md: 5 } }}>
          <Typography component="h3" sx={{ mb: 1.5, fontSize: '1rem', fontWeight: 900, letterSpacing: '0.06em', color: INK }}>
            MAIN SKILLS
          </Typography>
          <LoadingFade isLoading={ isPlaceholder } skeleton={ <SkillIconListSkeleton count={ skills.length || 4 } /> }>
            <SkillIconList skills={ skills } label="주요 스킬" />
          </LoadingFade>
        </Box>
      </Box>
    </Box>
  );
}

export default AboutPreviewSection;
