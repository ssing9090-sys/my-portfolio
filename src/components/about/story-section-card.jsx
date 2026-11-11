import { memo } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { SUMMARY_LENGTH } from '../../data/about-me-data.js';

const MAX_CONTENT_LENGTH = 1000;

/**
 * StorySectionCard 컴포넌트 (React.memo: 자기 섹션이 바뀔 때만 다시 그려져요)
 *
 * About Me 의 글 섹션 하나 (나의 개발 스토리 / 개발 철학 / 개인적인 이야기).
 * 편집 모드에서는 내용 입력창과 '홈에 표시' 스위치를 보여준다.
 *
 * Props:
 * @param {object} section - { id, title, content, showInHome } [Required]
 * @param {boolean} isEditing - 편집 모드 여부 [Required]
 * @param {Function} onChange - 수정 시 (section.id, 바뀐 값) 으로 호출 [Required]
 *
 * Example usage:
 * <StorySectionCard section={ section } isEditing={ isEditing } onChange={ updateSection } />
 */
function StorySectionCard({ section, isEditing, onChange }) {
  const titleId = `story-${section.id}-title`;
  const hasContent = section.content.trim().length > 0;

  return (
    <Card
      component="section"
      aria-labelledby={ titleId }
      elevation={ 0 }
      sx={{ border: 1, borderColor: 'divider', borderLeft: 6, borderLeftColor: 'primary.main' }}
    >
      <CardContent sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
          <Typography id={ titleId } component="h2" sx={{ fontSize: '1.25rem', fontWeight: 700 }}>
            { section.title }
          </Typography>
          { isEditing ? (
            <FormControlLabel
              control={ (
                <Switch
                  checked={ section.showInHome }
                  onChange={ (event) => onChange(section.id, { showInHome: event.target.checked }) }
                />
              ) }
              label="홈에 표시"
            />
          ) : section.showInHome && (
            <Chip size="small" label="홈에 표시 중" sx={{ bgcolor: 'primary.light', color: 'primary.dark', fontWeight: 700 }} />
          ) }
        </Box>

        { isEditing ? (
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
        ) : (
          <Typography
            sx={{
              whiteSpace: 'pre-wrap',
              lineHeight: 1.8,
              wordBreak: 'keep-all',
              color: hasContent ? 'text.secondary' : 'text.disabled',
              fontStyle: hasContent ? 'normal' : 'italic',
            }}
          >
            { hasContent ? section.content : '아직 작성 전이에요. 편집 모드에서 내용을 채워 주세요.' }
          </Typography>
        ) }
      </CardContent>
    </Card>
  );
}

export default memo(StorySectionCard);
