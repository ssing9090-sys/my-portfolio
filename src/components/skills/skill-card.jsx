import { memo } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { SKILL_CATEGORIES, SKILL_ICONS } from '../../data/skills-data.js';
import useInView from '../../hooks/use-in-view.js';

/** 살짝 넘쳤다 돌아오는 '통통' 이징 */
const BOUNCE_EASING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

/**
 * SkillCard 컴포넌트 (React.memo: 자기 스킬이 바뀔 때만 다시 그려져요)
 *
 * 아이콘 + 기술명 + 숙련도 퍼센트 바를 보여주는 카드.
 * 화면에 들어오면 바가 0% 에서 숙련도까지 차오르고, 호버·포커스 시 설명 툴팁이 뜬다.
 * onLevelChange 를 넘기면(편집 모드) 숙련도 슬라이더가 나타난다.
 *
 * Props:
 * @param {object} skill - { id, icon, name, level, category, description, showInHome } [Required]
 * @param {boolean} isInHome - 지금 홈 탭 주요 스킬에 나가는지 ('홈' 배지 표시) [Optional, 기본값: false]
 * @param {Function} onRemove - 삭제 버튼 클릭 시 skill.id 와 함께 호출 (없으면 버튼 숨김) [Optional]
 * @param {Function} onLevelChange - 슬라이더 조절 시 (skill.id, level) 로 호출 (없으면 슬라이더 숨김) [Optional]
 * @param {Function} onToggleMain - 별 버튼 클릭 시 (skill.id, showInHome) 로 호출 (없으면 버튼 숨김) [Optional]
 *
 * Example usage:
 * <SkillCard skill={ skill } onLevelChange={ handleLevelChange } />
 */
function SkillCard({ skill, isInHome = false, onRemove, onLevelChange, onToggleMain }) {
  const isMain = skill.showInHome !== false;
  const [ref, isInView] = useInView();
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const category = SKILL_CATEGORIES[skill.category] ?? SKILL_CATEGORIES.Tools;
  const icon = SKILL_ICONS[skill.icon] ?? '✨';
  const shownLevel = isInView || prefersReducedMotion ? skill.level : 0;
  const isEditing = Boolean(onLevelChange);

  return (
    <Tooltip
      title={ isEditing ? '' : (skill.description ?? '') }
      arrow
      placement="top"
      enterTouchDelay={ 0 }
      leaveTouchDelay={ 3000 }
    >
      <Card
        ref={ ref }
        tabIndex={ isEditing ? undefined : 0 }
        elevation={ 0 }
        sx={{
          height: '100%',
          border: 1,
          borderColor: 'divider',
          outline: 'none',
          transition: prefersReducedMotion ? 'none' : `border-color 0.2s, transform 0.3s ${BOUNCE_EASING}`,
          '&:hover, &:focus-visible': {
            borderColor: category.color,
            transform: prefersReducedMotion || isEditing ? 'none' : 'translateY(-3px)',
          },
          '&:focus-visible': { boxShadow: `0 0 0 3px ${category.soft}` },
        }}
      >
        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box
              aria-hidden="true"
              sx={{
                width: 40,
                height: 40,
                flexShrink: 0,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 2,
                bgcolor: category.soft,
                fontSize: '1.25rem',
              }}
            >
              { icon }
            </Box>
            <Box sx={{ flexGrow: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
              <Typography component="h4" sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'text.primary' }}>
                { skill.name }
              </Typography>
              { isInHome && (
                <Chip
                  size="small"
                  label="홈"
                  title="홈 탭 주요 스킬에 표시 중"
                  sx={{ height: 20, fontSize: '0.7rem', fontWeight: 700, bgcolor: category.soft, color: 'text.primary' }}
                />
              ) }
            </Box>
            <Typography sx={{ fontWeight: 700, color: 'text.secondary', fontVariantNumeric: 'tabular-nums' }}>
              { skill.level }%
            </Typography>
            { onToggleMain && (
              <IconButton
                size="small"
                aria-label={ `${skill.name} 메인 스킬로 표시` }
                aria-pressed={ isMain }
                title={ isMain ? '메인 스킬 (홈 탭 후보)' : '메인 스킬로 표시하기' }
                onClick={ () => onToggleMain(skill.id, !isMain) }
                sx={{ ml: -0.5, color: isMain ? category.color : 'text.secondary' }}
              >
                { isMain ? <StarRoundedIcon fontSize="small" /> : <StarOutlineRoundedIcon fontSize="small" /> }
              </IconButton>
            ) }
            { onRemove && (
              <IconButton
                size="small"
                aria-label={ `${skill.name} 삭제` }
                onClick={ () => onRemove(skill.id) }
                sx={{ ml: -0.5, color: 'text.secondary' }}
              >
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            ) }
          </Box>
          <LinearProgress
            variant="determinate"
            value={ shownLevel }
            aria-label={ `${skill.name} 숙련도` }
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: category.soft,
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                bgcolor: category.color,
                transition: prefersReducedMotion ? 'none' : `transform 1.2s ${BOUNCE_EASING}`,
              },
            }}
          />
          { isEditing && (
            <Slider
              size="small"
              value={ skill.level }
              onChange={ (_event, value) => onLevelChange(skill.id, value) }
              min={ 0 }
              max={ 100 }
              step={ 5 }
              aria-label={ `${skill.name} 숙련도 조절` }
              getAriaValueText={ (value) => `${value}%` }
              sx={{ mt: 1.5, color: category.color }}
            />
          ) }
        </CardContent>
      </Card>
    </Tooltip>
  );
}

export default memo(SkillCard);
