import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useHomeData } from '../../hooks/use-portfolio.js';
import ProfileCard from '../about/profile-card.jsx';
import SkillIconList from '../skills/skill-icon-list.jsx';
import HomeSection from './home-section.jsx';

const ABOUT_ACTION = { label: '더 알아보기', to: '/about' };

/**
 * AboutPreviewSection 컴포넌트
 *
 * 홈 탭의 About Me 섹션. About Me 탭 데이터에서 자동으로 만들어진다.
 * - 메인: '홈에 표시'를 켠 소개 글 요약 (첫 번째가 '나의 개발 스토리')
 * - 사이드: 프로필 사진 + 기본 정보 카드
 * - 하단: 주요 스킬 4개 아이콘
 *
 * Props:
 * @param {string} id - 섹션 앵커 id [Optional, 기본값: 'about']
 * @param {string} order - 섹션 순번 [Optional, 기본값: '02']
 *
 * Example usage:
 * <AboutPreviewSection id="about" order="02" />
 */
function AboutPreviewSection({ id = 'about', order = '02' }) {
  const { content, skills, basicInfo } = useHomeData();

  return (
    <HomeSection id={ id } order={ order } title="About Me" action={ ABOUT_ACTION }>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.6fr) minmax(0, 1fr)' },
          gap: { xs: 3, md: 4 },
          alignItems: 'start',
        }}
      >
        <Stack spacing={ 2.5 } sx={{ order: { xs: 2, md: 1 } }}>
          { content.length === 0 && (
            <Typography sx={{ color: 'text.secondary' }}>
              홈에 표시할 소개 글이 없어요. About Me 탭에서 &apos;홈에 표시&apos;를 켜 주세요.
            </Typography>
          ) }
          { content.map((item, index) => (
            <Box key={ item.id }>
              <Typography
                component="h3"
                sx={{ fontSize: index === 0 ? '1.15rem' : '1rem', fontWeight: 700, color: 'text.primary' }}
              >
                { item.title }
              </Typography>
              <Typography
                sx={{
                  mt: 0.75,
                  lineHeight: 1.75,
                  wordBreak: 'keep-all',
                  color: item.summary ? 'text.secondary' : 'text.disabled',
                  // 2~3줄을 넘으면 말줄임
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                { item.summary || '아직 작성 전이에요.' }
              </Typography>
            </Box>
          )) }
        </Stack>
        <Box sx={{ order: { xs: 1, md: 2 } }}>
          <ProfileCard basicInfo={ basicInfo } />
        </Box>
      </Box>

      <Box sx={{ mt: { xs: 3, md: 4 } }}>
        <Typography component="h3" sx={{ mb: 1.5, fontSize: '1rem', fontWeight: 700, color: 'text.primary' }}>
          주요 스킬
        </Typography>
        <SkillIconList skills={ skills } />
      </Box>
    </HomeSection>
  );
}

export default AboutPreviewSection;
