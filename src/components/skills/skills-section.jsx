import { useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { HOME_SKILL_COUNT_MAX, HOME_SKILL_COUNT_MIN } from '../../data/about-me-data.js';
import { SKILL_CATEGORIES } from '../../data/skills-data.js';
import { CREAM } from '../../theme.js';
import AboutBand from '../about/about-band.jsx';
import useSkills from '../../hooks/use-skills.js';
import { groupByCategory, sortByLevel } from '../../utils/skills.js';
import AddSkillDialog from './add-skill-dialog.jsx';
import SkillCard from './skill-card.jsx';

/** 모바일 1열, 태블릿 2열, 데스크톱 3열 */
const GRID_SIZE = { xs: 12, sm: 6, md: 4 };

/** '홈에 표시' 개수 선택지: 1 ~ 8 */
const HOME_COUNT_OPTIONS = Array.from(
  { length: HOME_SKILL_COUNT_MAX - HOME_SKILL_COUNT_MIN + 1 },
  (_, index) => HOME_SKILL_COUNT_MIN + index,
);

/**
 * SkillsSection 컴포넌트
 *
 * 크림색 풀폭 띠(AboutBand)에 스킬 카드를 카테고리별로 묶어 보여주고, 정렬 전환을 제공한다.
 * 편집 모드에서는 숙련도 조절·스킬 추가·추가한 스킬 삭제가 가능하다.
 *
 * Props:
 * @param {string} id - 섹션 앵커 id [Optional, 기본값: 'skills']
 * @param {boolean} isEditing - 편집 모드 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <SkillsSection id="skills" isEditing={ isEditing } />
 */
function SkillsSection({ id = 'skills', isEditing = false }) {
  const {
    skills,
    availableSkills,
    homeSkillCount,
    homeSkillIds,
    addSkill,
    removeSkill,
    updateSkill,
    updateHomeSkillCount,
  } = useSkills();
  const [sortMode, setSortMode] = useState('default');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const groups = useMemo(
    () => groupByCategory(sortMode === 'level' ? sortByLevel(skills) : skills),
    [skills, sortMode],
  );

  const handleLevelChange = useCallback((skillId, level) => updateSkill(skillId, { level }), [updateSkill]);
  const handleToggleMain = useCallback((skillId, showInHome) => updateSkill(skillId, { showInHome }), [updateSkill]);

  const actions = (
    <>
      <ToggleButtonGroup
        size="small"
        exclusive
        value={ sortMode }
        onChange={ (_event, value) => value && setSortMode(value) }
        aria-label="스킬 정렬"
        sx={{
          bgcolor: '#FFFFFF',
          borderRadius: 999,
          '& .MuiToggleButton-root': { px: 2, border: '2px solid', borderColor: 'text.primary', fontWeight: 800, textTransform: 'none', color: 'text.primary' },
          '& .MuiToggleButton-root:first-of-type': { borderRadius: '999px 0 0 999px' },
          '& .MuiToggleButton-root:last-of-type': { borderRadius: '0 999px 999px 0' },
          '& .MuiToggleButton-root.Mui-selected, & .MuiToggleButton-root.Mui-selected:hover': { bgcolor: 'text.primary', color: '#FFFFFF' },
        }}
      >
        <ToggleButton value="default">기본 순</ToggleButton>
        <ToggleButton value="level">숙련도 순</ToggleButton>
      </ToggleButtonGroup>
      { isEditing && (
        <TextField
          select
          size="small"
          label="홈에 표시"
          value={ homeSkillCount }
          onChange={ (event) => updateHomeSkillCount(Number(event.target.value)) }
          sx={{ minWidth: 120, bgcolor: '#FFFFFF', borderRadius: '14px' }}
        >
          { HOME_COUNT_OPTIONS.map((count) => (
            <MenuItem key={ count } value={ count }>상위 { count }개</MenuItem>
          )) }
        </TextField>
      ) }
      { isEditing && (
        <Button
          variant="contained"
          startIcon={ <AddRoundedIcon /> }
          onClick={ () => setIsDialogOpen(true) }
          disabled={ availableSkills.length === 0 }
          sx={{ minHeight: 40, fontWeight: 800 }}
        >
          스킬 추가
        </Button>
      ) }
    </>
  );

  return (
    <AboutBand
      id={ id }
      bgcolor={ CREAM }
      kicker="what I can do"
      title="My skills"
      description={ isEditing
        ? '별(★)을 켠 메인 스킬 중 숙련도가 높은 순으로 홈 탭에 보여줘요.'
        : '카드에 마우스를 올리면 어떻게 써 왔는지 볼 수 있어요.' }
      actions={ actions }
    >
      { groups.length === 0 && (
        <Typography sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
          아직 등록된 스킬이 없어요. 편집 모드에서 스킬을 추가해 주세요.
        </Typography>
      ) }

      <Stack spacing={{ xs: 5, md: 6 }}>
        { groups.map((group) => {
          const category = SKILL_CATEGORIES[group.category];
          return (
            <Box key={ group.category } component="section" aria-labelledby={ `${id}-${group.category}` }>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                <Typography
                  id={ `${id}-${group.category}` }
                  component="h3"
                  sx={{
                    px: 2,
                    py: 0.75,
                    borderRadius: 999,
                    bgcolor: category.color,
                    color: category.on,
                    fontSize: { xs: '1rem', md: '1.15rem' },
                    fontWeight: 900,
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                  }}
                >
                  { category.label }
                </Typography>
                <Typography aria-label={ `${group.skills.length}개` } sx={{ fontSize: '1rem', fontWeight: 800, color: 'text.secondary' }}>
                  { group.skills.length }
                </Typography>
              </Box>
              <Grid container spacing={{ xs: 2, md: 2.5 }}>
                { group.skills.map((skill) => (
                  <Grid size={ GRID_SIZE } key={ skill.id }>
                    <SkillCard
                      skill={ skill }
                      isInHome={ homeSkillIds.has(skill.id) }
                      onRemove={ isEditing && skill.isCustom ? removeSkill : undefined }
                      onLevelChange={ isEditing ? handleLevelChange : undefined }
                      onToggleMain={ isEditing ? handleToggleMain : undefined }
                    />
                  </Grid>
                )) }
              </Grid>
            </Box>
          );
        }) }
      </Stack>

      <AddSkillDialog
        open={ isDialogOpen }
        onClose={ () => setIsDialogOpen(false) }
        onAdd={ addSkill }
        availableSkills={ availableSkills }
      />
    </AboutBand>
  );
}

export default SkillsSection;
