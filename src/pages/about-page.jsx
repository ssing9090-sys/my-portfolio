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
import AboutBand from '../components/about/about-band.jsx';
import BasicInfoSection from '../components/about/basic-info-section.jsx';
import OwnerLoginDialog from '../components/about/owner-login-dialog.jsx';
import SaveStatus from '../components/about/save-status.jsx';
import StoryTabs from '../components/about/story-tabs.jsx';
import SkillsSection from '../components/skills/skills-section.jsx';
import { DISPLAY_TITLE_SX, PILL_DARK_SX, SECTION_INNER_SX } from '../components/landing/landing-styles.js';
import { usePortfolioActions, usePortfolioData, usePortfolioStatus } from '../hooks/use-portfolio.js';
import { INK, SERIF_FONT, VIVID } from '../theme.js';

/**
 * AboutPage 컴포넌트
 *
 * 홈 탭과 같은 풀폭 색 띠로 구성된 About Me 페이지.
 * Hero(제목·편집 버튼) → 기본 정보(초록) → 소개 글 3개 탭(검정) → 스킬(크림)
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
  const {
    saveStatus, saveError, loadError, isLoading, isPlaceholder, isLoggedIn, isOwner, hasLegacyData,
  } = usePortfolioStatus();

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

  /** 작은 보조 버튼 (초기화·로그아웃·관리자 로그인) */
  const subtleButtonSx = { minHeight: 40, px: 2, color: INK, fontWeight: 700, '&:hover': { bgcolor: 'rgba(18, 18, 18, 0.08)' } };

  return (
    <Box aria-busy={ isPlaceholder }>
      { /* Hero: 초대형 제목 + 편집·로그인 버튼 */ }
      <Box
        component="header"
        sx={{ background: 'linear-gradient(180deg, #D5E8EA 0%, #A7C3C7 100%)', pt: { xs: 6, md: 9 }, pb: { xs: 6, md: 8 } }}
      >
        <Box sx={ SECTION_INNER_SX }>
          <Stack spacing={ 1.5 } sx={{ maxWidth: 880, mx: 'auto', mb: 3, '&:empty': { display: 'none' } }}>
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
          </Stack>

          <Typography sx={{ textAlign: 'center', fontFamily: SERIF_FONT, fontStyle: 'italic', fontSize: { xs: '1.4rem', md: '2rem' }, color: INK }}>
            get to know me
          </Typography>
          <Typography component="h1" sx={{ ...DISPLAY_TITLE_SX, color: '#FFFFFF', textShadow: '0 2px 24px rgba(18, 18, 18, 0.08)' }}>
            About me
          </Typography>
          <Typography sx={{ mt: 2.5, textAlign: 'center', fontSize: { xs: '1rem', md: '1.15rem' }, fontWeight: 600, color: INK, wordBreak: 'keep-all' }}>
            { isEditing
              ? '고친 내용은 서버에 자동 저장되고, 모든 방문자의 홈 탭에 바로 반영돼요.'
              : '디자인의 의도를 이해하고 사용자 경험으로 구현하는 개발자예요.' }
          </Typography>

          { !isLoading && (
            <Box sx={{ mt: 3.5, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              { isOwner && <SaveStatus /> }
              { isOwner && (
                <Button
                  aria-pressed={ isEditing }
                  startIcon={ isEditing ? <CheckRoundedIcon /> : <EditRoundedIcon /> }
                  onClick={ () => setIsEditingRequested((prev) => !prev) }
                  sx={{ ...PILL_DARK_SX, ...(isEditing && { bgcolor: VIVID.green.main, color: INK, '&:hover': { bgcolor: VIVID.green.main, color: INK } }) }}
                >
                  { isEditing ? '편집 완료' : '편집' }
                </Button>
              ) }
              { isEditing && (
                <Button startIcon={ <RestartAltRoundedIcon /> } onClick={ handleReset } sx={ subtleButtonSx }>
                  초기화
                </Button>
              ) }
              { isOwner && (
                <Button startIcon={ <LogoutRoundedIcon /> } onClick={ handleSignOut } sx={ subtleButtonSx }>
                  로그아웃
                </Button>
              ) }
              { !isLoggedIn && !loadError && (
                <Button startIcon={ <LockOutlinedIcon /> } onClick={ () => setIsLoginOpen(true) } sx={ subtleButtonSx }>
                  관리자 로그인
                </Button>
              ) }
            </Box>
          ) }
        </Box>
      </Box>

      <OwnerLoginDialog open={ isLoginOpen } onClose={ () => setIsLoginOpen(false) } />

      { /* 모드가 바뀔 때 살짝 페이드 */ }
      <Fade in key={ isEditing ? 'edit' : 'view' } timeout={ 300 }>
        <Box>
          <AboutBand id="basic-info" bgcolor={ VIVID.green.main } kicker="who I am" title="Profile">
            <BasicInfoSection basicInfo={ basicInfo } isEditing={ isEditing } onChange={ updateBasicInfo } />
          </AboutBand>

          <AboutBand id="story" bgcolor={ INK } color="#FFFFFF" accentColor={ VIVID.green.main } kicker="in my words" title="My story">
            <StoryTabs
              sections={ sections }
              activeId={ activeSectionId }
              onTabChange={ setActiveSectionId }
              isEditing={ isEditing }
              onChange={ updateSection }
            />
          </AboutBand>

          <SkillsSection id="skills" isEditing={ isEditing } />
        </Box>
      </Fade>
    </Box>
  );
}

export default AboutPage;
