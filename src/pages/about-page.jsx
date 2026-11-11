import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import BasicInfoSection from '../components/about/basic-info-section.jsx';
import SaveStatus from '../components/about/save-status.jsx';
import StorySectionCard from '../components/about/story-section-card.jsx';
import SkillsSection from '../components/skills/skills-section.jsx';
import { usePortfolioActions, usePortfolioData, usePortfolioStatus } from '../hooks/use-portfolio.js';

/**
 * AboutPage 컴포넌트
 *
 * 기본 정보 · 소개 글 3개 · 스킬로 구성된 About Me 페이지.
 * '편집' 버튼으로 편집 모드를 켜면 내용을 바로 고칠 수 있고, 홈 탭에 즉시 반영된다.
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutPage />
 */
function AboutPage() {
  const [isEditing, setIsEditing] = useState(false);
  const { basicInfo, sections } = usePortfolioData();
  const { updateBasicInfo, updateSection, resetAboutMe, dismissLoadError } = usePortfolioActions();
  const { saveStatus, loadError } = usePortfolioStatus();

  const handleReset = () => {
    if (window.confirm('About Me 내용을 처음 상태로 되돌릴까요? 직접 수정한 내용과 추가한 스킬이 모두 사라져요.')) {
      resetAboutMe();
    }
  };

  return (
    <Stack spacing={{ xs: 2, md: 3 }}>
      { loadError && <Alert severity="warning" onClose={ dismissLoadError }>{ loadError }</Alert> }
      { saveStatus === 'error' && (
        <Alert severity="error">
          브라우저에 저장하지 못했어요. 화면에는 반영되지만, 새로고침하면 수정한 내용이 사라질 수 있어요.
        </Alert>
      ) }

      <Box
        component="header"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography component="h1" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, lineHeight: 1.2 }}>
            About Me
          </Typography>
          <Typography sx={{ mt: 0.5, color: 'text.secondary', wordBreak: 'keep-all' }}>
            { isEditing ? '고친 내용은 자동으로 저장되고, 홈 탭에 바로 반영돼요.' : '디자인의 의도를 이해하고 사용자 경험으로 구현하는 개발자예요.' }
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <SaveStatus />
          { isEditing && (
            <Button color="inherit" size="small" startIcon={ <RestartAltRoundedIcon /> } onClick={ handleReset }>
              초기화
            </Button>
          ) }
          <Button
            variant={ isEditing ? 'contained' : 'outlined' }
            disableElevation
            aria-pressed={ isEditing }
            startIcon={ isEditing ? <CheckRoundedIcon /> : <EditRoundedIcon /> }
            onClick={ () => setIsEditing((prev) => !prev) }
          >
            { isEditing ? '편집 완료' : '편집' }
          </Button>
        </Box>
      </Box>

      { /* 모드가 바뀔 때 살짝 페이드 */ }
      <Fade in key={ isEditing ? 'edit' : 'view' } timeout={ 300 }>
        <Stack spacing={{ xs: 2, md: 3 }}>
          <BasicInfoSection basicInfo={ basicInfo } isEditing={ isEditing } onChange={ updateBasicInfo } />
          { sections.map((section) => (
            <StorySectionCard key={ section.id } section={ section } isEditing={ isEditing } onChange={ updateSection } />
          )) }
          <SkillsSection id="skills" isEditing={ isEditing } />
        </Stack>
      </Fade>
    </Stack>
  );
}

export default AboutPage;
