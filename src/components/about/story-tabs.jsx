import { memo } from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { SUMMARY_LENGTH } from '../../data/about-me-data.js';
import { INK, VIVID } from '../../theme.js';
import { OUTLINE_BADGE_SX } from '../landing/landing-styles.js';

const MAX_CONTENT_LENGTH = 1000;

/** 접근성용 id (탭 ↔ 패널을 서로 연결) */
const tabId = (id) => `story-tab-${id}`;
const panelId = (id) => `story-panel-${id}`;

/**
 * StoryPanel: 선택된 섹션 하나의 내용
 * 보기 모드는 검정 배경 위 큰 흰 글씨, 편집 모드는 흰 카드 안에 '홈에 표시' 스위치 + 입력창
 */
function StoryPanel({ section, isEditing, onChange }) {
  const hasContent = section.content.trim().length > 0;

  if (isEditing) {
    return (
      <Box sx={{ maxWidth: 880, mx: 'auto', p: { xs: 2.5, md: 4 }, borderRadius: '32px', bgcolor: '#FFFFFF', color: 'text.primary' }}>
        <FormControlLabel
          sx={{ mb: 1.5 }}
          control={ (
            <Switch
              checked={ section.showInHome }
              onChange={ (event) => onChange(section.id, { showInHome: event.target.checked }) }
            />
          ) }
          label="홈 탭에 표시"
        />
        <TextField
          label={ `${section.title} 내용` }
          value={ section.content }
          onChange={ (event) => onChange(section.id, { content: event.target.value }) }
          multiline
          minRows={ 3 }
          fullWidth
          slotProps={{ htmlInput: { maxLength: MAX_CONTENT_LENGTH } }}
          helperText={ `${section.content.length} / ${MAX_CONTENT_LENGTH}자 · 홈 탭에는 앞 ${SUMMARY_LENGTH}자까지 요약돼요` }
        />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 960, mx: 'auto', textAlign: 'center' }}>
      <Typography
        component="p"
        sx={{
          m: 0,
          fontSize: { xs: 'clamp(1.4rem, 6vw, 1.9rem)', md: 'clamp(1.9rem, 3.2vw, 2.75rem)' },
          fontWeight: 700,
          lineHeight: 1.35,
          letterSpacing: '-0.02em',
          whiteSpace: 'pre-wrap',
          wordBreak: 'keep-all',
          color: hasContent ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)',
        }}
      >
        { hasContent ? section.content : '아직 작성 전이에요. 편집 모드에서 내용을 채워 주세요.' }
      </Typography>
      { section.showInHome && (
        <Box sx={{ ...OUTLINE_BADGE_SX, mt: 4, gap: 0.5, color: VIVID.green.main }}>
          <HomeRoundedIcon aria-hidden="true" sx={{ fontSize: 16 }} />
          홈 탭에 표시 중
        </Box>
      ) }
    </Box>
  );
}

/**
 * StoryTabs 컴포넌트 (React.memo)
 *
 * About Me 의 글 섹션(나의 개발 스토리 / 개발 철학 / 개인적인 이야기)을 알약 모양 탭으로 보여준다.
 * 검정 배경(AboutBand) 위에 놓이는 것을 전제로 한 색이에요.
 * 홈에 표시되는 섹션은 탭 이름 옆에 집 아이콘이 붙는다.
 * 화면이 좁으면 탭을 옆으로 밀어서 넘길 수 있다.
 *
 * Props:
 * @param {Array} sections - [{ id, title, content, showInHome }] [Required]
 * @param {string} activeId - 선택된 섹션 id [Required]
 * @param {Function} onTabChange - 탭을 고르면 섹션 id 로 호출 [Required]
 * @param {boolean} isEditing - 편집 모드 여부 [Required]
 * @param {Function} onChange - 수정 시 (section.id, 바뀐 값) 으로 호출 [Required]
 *
 * Example usage:
 * <StoryTabs sections={ sections } activeId={ activeId } onTabChange={ setActiveId } isEditing={ isEditing } onChange={ updateSection } />
 */
function StoryTabs({ sections, activeId, onTabChange, isEditing, onChange }) {
  const isWide = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const activeSection = sections.find((section) => section.id === activeId) ?? sections[0];

  if (!activeSection) {
    return null;
  }

  return (
    <Box>
      <Tabs
        value={ activeSection.id }
        onChange={ (_, value) => onTabChange(value) }
        variant={ isWide ? 'standard' : 'scrollable' }
        centered={ isWide }
        scrollButtons={ false }
        aria-label="소개 글 섹션"
        sx={{
          '& .MuiTabs-flexContainer': { gap: 1, py: 0.75, px: { xs: 0.5, sm: 0 } },
          '& .MuiTabs-indicator': { display: 'none' },
          '& .MuiTab-root': {
            minHeight: 48,
            px: 2.5,
            borderRadius: 999,
            border: '2px solid rgba(255, 255, 255, 0.35)',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1rem',
            fontWeight: 800,
            textTransform: 'none',
            whiteSpace: 'nowrap',
            transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
            '&:hover': { borderColor: '#FFFFFF', color: '#FFFFFF' },
            // 검정 배경 위라 포커스 링을 흰색으로
            '&.Mui-focusVisible': { outline: '3px solid #FFFFFF', outlineOffset: 2, boxShadow: 'none' },
          },
          '& .MuiTab-root.Mui-selected': { bgcolor: VIVID.green.main, borderColor: VIVID.green.main, color: INK },
        }}
      >
        { sections.map((section) => (
          <Tab
            key={ section.id }
            value={ section.id }
            id={ tabId(section.id) }
            aria-controls={ panelId(section.id) }
            label={ section.title }
            icon={ section.showInHome ? <HomeRoundedIcon aria-label="홈에 표시" sx={{ fontSize: 18 }} /> : undefined }
            iconPosition="end"
          />
        )) }
      </Tabs>

      <Box
        role="tabpanel"
        id={ panelId(activeSection.id) }
        aria-labelledby={ tabId(activeSection.id) }
        sx={{ mt: { xs: 4, md: 6 } }}
      >
        <StoryPanel section={ activeSection } isEditing={ isEditing } onChange={ onChange } />
      </Box>
    </Box>
  );
}

export default memo(StoryTabs);
