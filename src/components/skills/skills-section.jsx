import { useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { SKILL_CATEGORIES } from '../../data/skills-data.js';
import useSkills from '../../hooks/use-skills.js';
import { groupByCategory, sortByLevel } from '../../utils/skills.js';
import AddSkillDialog from './add-skill-dialog.jsx';
import SkillCard from './skill-card.jsx';

/** 모바일 1열, 태블릿 2열, 데스크톱 3열 */
const GRID_SIZE = { xs: 12, sm: 6, md: 4 };

/**
 * SkillsSection 컴포넌트
 *
 * 스킬 카드를 카테고리별로 묶어 보여주고, 정렬 전환을 제공한다.
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
  const { skills, availableSkills, addSkill, removeSkill, updateSkill } = useSkills();
  const [sortMode, setSortMode] = useState('default');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const groups = useMemo(
    () => groupByCategory(sortMode === 'level' ? sortByLevel(skills) : skills),
    [skills, sortMode],
  );

  const handleLevelChange = useCallback((skillId, level) => updateSkill(skillId, { level }), [updateSkill]);

  return (
    <Card
      id={ id }
      component="section"
      aria-labelledby={ `${id}-title` }
      tabIndex={ -1 }
      elevation={ 0 }
      sx={{
        border: 1,
        borderColor: 'divider',
        borderTop: 6,
        borderTopColor: 'primary.main',
        outline: 'none',
        scrollMarginTop: { xs: 112, sm: 80 },
      }}
    >
      <CardContent sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 5 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'flex-end' },
            justifyContent: 'space-between',
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography
              id={ `${id}-title` }
              component="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 700, color: 'text.primary' }}
            >
              Skills
            </Typography>
            <Typography sx={{ mt: 0.5, color: 'text.secondary', wordBreak: 'keep-all' }}>
              { isEditing
                ? '슬라이더로 숙련도를 바꾸면 홈 탭의 주요 스킬에 바로 반영돼요.'
                : '카드에 마우스를 올리면 어떻게 써 왔는지 볼 수 있어요.' }
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={ sortMode }
              onChange={ (_event, value) => value && setSortMode(value) }
              aria-label="스킬 정렬"
            >
              <ToggleButton value="default">기본 순</ToggleButton>
              <ToggleButton value="level">숙련도 순</ToggleButton>
            </ToggleButtonGroup>
            { isEditing && (
              <Button
                variant="contained"
                size="small"
                disableElevation
                startIcon={ <AddRoundedIcon /> }
                onClick={ () => setIsDialogOpen(true) }
                disabled={ availableSkills.length === 0 }
              >
                스킬 추가
              </Button>
            ) }
          </Box>
        </Box>

        { groups.length === 0 && (
          <Typography sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
            아직 등록된 스킬이 없어요. 편집 모드에서 스킬을 추가해 주세요.
          </Typography>
        ) }

        <Stack spacing={ 4 }>
          { groups.map((group) => {
            const category = SKILL_CATEGORIES[group.category];
            return (
              <Box key={ group.category } component="section" aria-labelledby={ `${id}-${group.category}` }>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Box aria-hidden="true" sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: category.color }} />
                  <Typography id={ `${id}-${group.category}` } component="h3" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    { category.label }
                  </Typography>
                  <Typography aria-label={ `${group.skills.length}개` } sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
                    { group.skills.length }
                  </Typography>
                </Box>
                <Grid container spacing={{ xs: 2, md: 2.5 }}>
                  { group.skills.map((skill) => (
                    <Grid size={ GRID_SIZE } key={ skill.id }>
                      <SkillCard
                        skill={ skill }
                        onRemove={ isEditing && skill.isCustom ? removeSkill : undefined }
                        onLevelChange={ isEditing ? handleLevelChange : undefined }
                      />
                    </Grid>
                  )) }
                </Grid>
              </Box>
            );
          }) }
        </Stack>
      </CardContent>

      <AddSkillDialog
        open={ isDialogOpen }
        onClose={ () => setIsDialogOpen(false) }
        onAdd={ addSkill }
        availableSkills={ availableSkills }
      />
    </Card>
  );
}

export default SkillsSection;
