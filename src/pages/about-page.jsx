import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import BasicInfoSection from '../components/about/basic-info-section.jsx';
import OwnerLoginDialog from '../components/about/owner-login-dialog.jsx';
import SaveStatus from '../components/about/save-status.jsx';
import StoryTabs from '../components/about/story-tabs.jsx';
import SkillsSection from '../components/skills/skills-section.jsx';
import { usePortfolioActions, usePortfolioData, usePortfolioStatus } from '../hooks/use-portfolio.js';

/**
 * AboutPage 컴포넌트
 *
 * 기본 정보 카드 · 소개 글 3개(탭) · 스킬로 구성된 About Me 페이지.
 * 주인 계정으로 로그인하면 '편집' 버튼이 생기고, 고친 내용은 Supabase 에 저장되어 홈 탭에 즉시 반영된다.
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutPage />
 */
function AboutPage() {
  const [isEditingRequested, setIsEditingRequested] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  // 선택한 탭은 여기서 들고 있어야 편집 모드를 켜고 꺼도 그대로 유지돼요.
  const [activeSectionId, setActiveSectionId] = useState('dev-story');
  const { basicInfo, sections } = usePortfolioData();
  const {
    updateBasicInfo,
    updateSection,
    resetAboutMe,
    dismissLoadError,
    importLegacyData,
    discardLegacyData,
    signOut,
  } = usePortfolioActions();
  const { saveStatus, saveError, loadError, isLoading, isLoggedIn, isOwner, hasLegacyData } = usePortfolioStatus();

  // 주인 계정일 때만 편집 모드 (로그아웃하면 자동으로 보기 모드)
  const isEditing = isEditingRequested && isOwner;

  const handleReset = () => {
    if (window.confirm('About Me 내용을 처음 상태로 되돌릴까요? 모든 방문자에게 보이는 내용과 추가한 스킬이 모두 바뀌어요.')) {
      resetAboutMe();
    }
  };

  const handleSignOut = () => {
    setIsEditingRequested(false);
    signOut();
  };

  return (
    <Stack spacing={{ xs: 2, md: 3 }}>
      { loadError && <Alert severity="warning" onClose={ dismissLoadError }>{ loadError }</Alert> }
      { saveStatus === 'error' && <Alert severity="error">{ saveError }</Alert> }
      { isOwner && hasLegacyData && (
        <Alert
          severity="info"
          action={ (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Button color="inherit" size="small" onClick={ importLegacyData }>서버로 옮기기</Button>
              <Button color="inherit" size="small" onClick={ discardLegacyData }>지우기</Button>
            </Box>
          ) }
        >
          이 브라우저에 예전에 저장해 둔 About Me 내용이 있어요. 서버로 옮기면 모든 방문자에게 보여요.
        </Alert>
      ) }
      { isLoggedIn && !isOwner && !isLoading && (
        <Alert
          severity="info"
          action={ <Button color="inherit" size="small" onClick={ handleSignOut }>로그아웃</Button> }
        >
          이 계정은 About Me 편집 권한이 없어요.
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
            { isEditing
              ? '고친 내용은 서버에 자동 저장되고, 모든 방문자의 홈 탭에 바로 반영돼요.'
              : '디자인의 의도를 이해하고 사용자 경험으로 구현하는 개발자예요.' }
          </Typography>
        </Box>
        { !isLoading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            { isOwner && <SaveStatus /> }
            { isEditing && (
              <Button color="inherit" size="small" startIcon={ <RestartAltRoundedIcon /> } onClick={ handleReset }>
                초기화
              </Button>
            ) }
            { isOwner && (
              <Button
                variant={ isEditing ? 'contained' : 'outlined' }
                disableElevation
                aria-pressed={ isEditing }
                startIcon={ isEditing ? <CheckRoundedIcon /> : <EditRoundedIcon /> }
                onClick={ () => setIsEditingRequested((prev) => !prev) }
              >
                { isEditing ? '편집 완료' : '편집' }
              </Button>
            ) }
            { isOwner && (
              <Button color="inherit" size="small" startIcon={ <LogoutRoundedIcon /> } onClick={ handleSignOut }>
                로그아웃
              </Button>
            ) }
            { !isLoggedIn && !loadError && (
              <Button
                color="inherit"
                size="small"
                startIcon={ <LockOutlinedIcon /> }
                onClick={ () => setIsLoginOpen(true) }
                sx={{ color: 'text.secondary' }}
              >
                관리자 로그인
              </Button>
            ) }
          </Box>
        ) }
      </Box>

      <OwnerLoginDialog open={ isLoginOpen } onClose={ () => setIsLoginOpen(false) } />

      { /* 모드가 바뀔 때 살짝 페이드 */ }
      <Fade in key={ isEditing ? 'edit' : 'view' } timeout={ 300 }>
        <Stack spacing={{ xs: 2, md: 3 }}>
          <BasicInfoSection basicInfo={ basicInfo } isEditing={ isEditing } onChange={ updateBasicInfo } />
          <StoryTabs
            sections={ sections }
            activeId={ activeSectionId }
            onTabChange={ setActiveSectionId }
            isEditing={ isEditing }
            onChange={ updateSection }
          />
          <SkillsSection id="skills" isEditing={ isEditing } />
        </Stack>
      </Fade>
    </Stack>
  );
}

export default AboutPage;
