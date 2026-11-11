import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SKILL_CATEGORIES, SKILL_ICONS } from '../../data/skills-data.js';

/**
 * SkillIconList 컴포넌트 (React.memo)
 *
 * 홈 탭용 간단한 스킬 목록. 아이콘 + 이름(+ 숙련도)을 모바일 2열, 그 이상 4열로 보여준다.
 *
 * Props:
 * @param {Array} skills - 보여줄 스킬 목록 [Required]
 * @param {string} label - 스크린 리더용 목록 이름 [Optional, 기본값: '주요 스킬']
 * @param {boolean} showLevel - 숙련도 퍼센트 표시 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <SkillIconList skills={ topSkills } showLevel />
 */
function SkillIconList({ skills, label = '주요 스킬', showLevel = false }) {
  if (skills.length === 0) {
    return (
      <Typography sx={{ color: 'text.secondary' }}>아직 등록된 스킬이 없어요.</Typography>
    );
  }

  return (
    <Box
      component="ul"
      aria-label={ label }
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(4, minmax(0, 1fr))' },
        gap: 1.5,
        '@keyframes skillPop': {
          from: { opacity: 0, transform: 'translateY(8px) scale(0.96)' },
          to: { opacity: 1, transform: 'none' },
        },
      }}
    >
      { skills.map((skill, index) => {
        const category = SKILL_CATEGORIES[skill.category] ?? SKILL_CATEGORIES.Tools;
        return (
          <Box
            component="li"
            key={ skill.id }
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              p: 1.25,
              borderRadius: 2,
              border: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              animation: `skillPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.06}s both`,
              '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
            }}
          >
            <Box
              aria-hidden="true"
              sx={{
                width: 36,
                height: 36,
                flexShrink: 0,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 1.5,
                bgcolor: category.soft,
                fontSize: '1.1rem',
              }}
            >
              { SKILL_ICONS[skill.icon] ?? '✨' }
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography noWrap sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'text.primary' }}>
                { skill.name }
              </Typography>
              { showLevel && (
                <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', fontVariantNumeric: 'tabular-nums' }}>
                  숙련도 { skill.level }%
                </Typography>
              ) }
            </Box>
          </Box>
        );
      }) }
    </Box>
  );
}

export default memo(SkillIconList);
