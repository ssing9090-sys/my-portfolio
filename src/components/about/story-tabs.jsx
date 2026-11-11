import { memo } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { SUMMARY_LENGTH } from '../../data/about-me-data.js';

const MAX_CONTENT_LENGTH = 1000;

/** 접근성용 id (탭 ↔ 패널을 서로 연결) */
const tabId = (id) => `story-tab-${id}`;
const panelId = (id) => `story-panel-${id}`;

/**
 * StoryPanel: 선택된 섹션 하나의 내용
 * 보기 모드는 인용문처럼 크게, 편집 모드는 '홈에 표시' 스위치 + 입력창
 */
function StoryPanel({ section, isEditing, onChange }) {
  const hasContent = section.content.trim().length > 0;

  if (isEditing) {
    return (
      <Box>
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
    <Box sx={{ position: 'relative', pl: { xs: 0, sm: 7 } }}>
      <FormatQuoteRoundedIcon
        aria-hidden="true"
        sx={{
          display: { xs: 'none', sm: 'block' },
          position: 'absolute',
          left: 0,
          top: -4,
          fontSize: 44,
          color: 'primary.main',
        }}
      />
      <Typography
        component="p"
        sx={{
          fontSize: { xs: '1.2rem', md: '1.5rem' },
          fontWeight: hasContent ? 600 : 400,
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
          wordBreak: 'keep-all',
          color: hasContent ? 'text.primary' : 'text.disabled',
          fontStyle: hasContent ? 'normal' : 'italic',
        }}
      >
        { hasContent ? section.content : '아직 작성 전이에요. 편집 모드에서 내용을 채워 주세요.' }
      </Typography>
      { section.showInHome && (
        <Chip
          size="small"
          icon={ <HomeRoundedIcon /> }
          label="홈 탭에 표시 중"
          sx={{ mt: 2.5, bgcolor: 'primary.light', color: 'primary.dark', fontWeight: 700, '& .MuiChip-icon': { color: 'inherit' } }}
        />
      ) }
    </Box>
  );
}

/**
 * StoryTabs 컴포넌트 (React.memo)
 *
 * About Me 의 글 섹션(나의 개발 스토리 / 개발 철학 / 개인적인 이야기)을 탭으로 보여준다.
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
    <Card
      component="section"
      aria-label="소개 글"
      elevation={ 0 }
      sx={{ border: 1, borderColor: 'divider', borderLeft: 6, borderLeftColor: 'primary.main' }}
    >
      <Tabs
        value={ activeSection.id }
        onChange={ (_, value) => onTabChange(value) }
        variant={ isWide ? 'fullWidth' : 'scrollable' }
        scrollButtons={ false }
        aria-label="소개 글 섹션"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          '& .MuiTab-root': { minHeight: 56, fontSize: '1rem', fontWeight: 700, wordBreak: 'keep-all' },
          '& .Mui-selected': { color: 'primary.dark' },
          '& .MuiTabs-indicator': { height: 3, borderRadius: 3, bgcolor: 'primary.main' },
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
        sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}
      >
        <StoryPanel section={ activeSection } isEditing={ isEditing } onChange={ onChange } />
      </Box>
    </Card>
  );
}

export default memo(StoryTabs);
