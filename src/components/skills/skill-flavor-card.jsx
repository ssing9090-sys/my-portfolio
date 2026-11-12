import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SKILL_CATEGORIES, SKILL_ICONS } from '../../data/skills-data.js';
import useInView from '../../hooks/use-in-view.js';
import { VIVID } from '../../theme.js';
import { OUTLINE_BADGE_SX } from '../landing/landing-styles.js';

/** 카드 배경을 순서대로 돌려 써요. (같은 카테고리가 이어져도 카드마다 색이 달라지도록) */
const CARD_TONES = [VIVID.coral, VIVID.yellow, VIVID.blue, VIVID.pink, VIVID.green, VIVID.purple];

/**
 * SkillFlavorCard 컴포넌트 (React.memo)
 *
 * 원색으로 꽉 찬 큰 세로 카드 (색은 순서대로 돌아가요). 굵은 기술명 · 'LV 80%' 배지 · 큰 아이콘 · 숙련도 바.
 * 화면에 들어오면 바가 0 → 숙련도까지 차오른다. (홈 Skills 섹션 가로 목록용)
 *
 * Props:
 * @param {object} skill - { id, icon, name, level, category, description } [Required]
 * @param {number} index - 목록 안 순서 (카드 색·등장 지연·기울기에 사용) [Optional, 기본값: 0]
 *
 * Example usage:
 * <SkillFlavorCard skill={ skill } index={ 0 } />
 */
function SkillFlavorCard({ skill, index = 0 }) {
  const [ref, isInView] = useInView(0.4);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const category = SKILL_CATEGORIES[skill.category] ?? SKILL_CATEGORIES.Tools;
  const tone = CARD_TONES[index % CARD_TONES.length];
  const shownLevel = isInView || prefersReducedMotion ? skill.level : 0;

  return (
    <Box
      ref={ ref }
      component="article"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: { xs: 340, md: 400 },
        p: { xs: 3, md: 3.5 },
        borderRadius: '32px',
        bgcolor: tone.main,
        color: tone.on,
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        '@media (hover: hover)': { '&:hover': { transform: `translateY(-10px) rotate(${index % 2 ? 1.5 : -1.5}deg)` } },
        '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
      }}
    >
      <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', opacity: 0.8 }}>
        { category.label.toUpperCase() }
      </Typography>
      <Typography
        component="h3"
        sx={{ mt: 0.5, fontWeight: 900, fontSize: { xs: '2rem', md: '2.4rem' }, lineHeight: 1, letterSpacing: '-0.04em', textTransform: 'uppercase', wordBreak: 'break-word' }}
      >
        { skill.name }
      </Typography>
      <Box sx={{ ...OUTLINE_BADGE_SX, mt: 2, alignSelf: 'flex-start' }}>
        LV { skill.level }%
      </Box>
      { skill.description && (
        <Typography sx={{ mt: 2, fontSize: '0.92rem', lineHeight: 1.55, fontWeight: 500, opacity: 0.85, maxWidth: '85%', wordBreak: 'keep-all' }}>
          { skill.description }
        </Typography>
      ) }

      { /* 오른쪽 아래 큰 아이콘 */ }
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          right: { xs: -12, md: -16 },
          bottom: { xs: 28, md: 36 },
          fontSize: { xs: '6.5rem', md: '7.5rem' },
          lineHeight: 1,
          transform: 'rotate(-12deg)',
          filter: 'drop-shadow(0 10px 18px rgba(0, 0, 0, 0.18))',
        }}
      >
        { SKILL_ICONS[skill.icon] ?? '✨' }
      </Box>

      { /* 숙련도 바 */ }
      <Box
        role="progressbar"
        aria-label={ `${skill.name} 숙련도` }
        aria-valuenow={ skill.level }
        aria-valuemin={ 0 }
        aria-valuemax={ 100 }
        sx={{ mt: 'auto', height: 12, borderRadius: 999, bgcolor: 'rgba(18, 18, 18, 0.16)', overflow: 'hidden' }}
      >
        <Box
          sx={{
            height: '100%',
            width: `${shownLevel}%`,
            borderRadius: 999,
            bgcolor: 'currentColor',
            transition: prefersReducedMotion ? 'none' : `width 1.2s ${0.1 + index * 0.08}s cubic-bezier(0.34, 1.56, 0.64, 1)`,
          }}
        />
      </Box>
    </Box>
  );
}

export default memo(SkillFlavorCard);
