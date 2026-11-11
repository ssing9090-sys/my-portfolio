import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { SKILL_CATEGORIES, SKILL_ICONS } from '../../data/skills-data.js';
import { groupByCategory } from '../../utils/skills.js';

const DEFAULT_LEVEL = 50;

/**
 * AddSkillDialog 컴포넌트
 *
 * 추가 가능한 기술을 카테고리별로 골라 숙련도를 정하는 창.
 *
 * Props:
 * @param {boolean} open - 창 열림 여부 [Required]
 * @param {Function} onClose - 창 닫기 [Required]
 * @param {Function} onAdd - 추가 버튼 클릭 시 { ...기술, level } 과 함께 호출 [Required]
 * @param {Array} availableSkills - 아직 추가하지 않은 기술 목록 [Required]
 *
 * Example usage:
 * <AddSkillDialog open={ isOpen } onClose={ close } onAdd={ addSkill } availableSkills={ availableSkills } />
 */
function AddSkillDialog({ open, onClose, onAdd, availableSkills }) {
  const [selectedName, setSelectedName] = useState('');
  const [level, setLevel] = useState(DEFAULT_LEVEL);

  const selectedSkill = availableSkills.find((skill) => skill.name === selectedName);

  const handleClose = () => {
    setSelectedName('');
    setLevel(DEFAULT_LEVEL);
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedSkill) {
      return;
    }
    onAdd({ ...selectedSkill, level });
    handleClose();
  };

  // Select 안에서는 Fragment 를 쓸 수 없어서 [제목, 항목...] 을 평평한 배열로 만든다.
  const menuItems = groupByCategory(availableSkills).flatMap((group) => [
    <ListSubheader key={ `header-${group.category}` }>
      { SKILL_CATEGORIES[group.category]?.label ?? group.category }
    </ListSubheader>,
    ...group.skills.map((skill) => (
      <MenuItem key={ skill.name } value={ skill.name }>
        { SKILL_ICONS[skill.icon] ?? '✨' }&nbsp;&nbsp;{ skill.name }
      </MenuItem>
    )),
  ]);

  return (
    <Dialog
      open={ open }
      onClose={ handleClose }
      fullWidth
      maxWidth="xs"
      slotProps={{ paper: { component: 'form', onSubmit: handleSubmit } }}
    >
      <DialogTitle sx={{ fontWeight: 700 }}>스킬 추가</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 1, mb: 3 }}>
          <InputLabel id="add-skill-label">기술 선택</InputLabel>
          <Select
            labelId="add-skill-label"
            label="기술 선택"
            value={ selectedName }
            onChange={ (event) => setSelectedName(event.target.value) }
          >
            { menuItems }
          </Select>
        </FormControl>

        <Typography id="add-skill-level" sx={{ fontWeight: 700, mb: 1 }}>
          숙련도 { level }%
        </Typography>
        <Slider
          aria-labelledby="add-skill-level"
          value={ level }
          onChange={ (_event, value) => setLevel(value) }
          step={ 5 }
          min={ 0 }
          max={ 100 }
          valueLabelDisplay="auto"
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={ handleClose } color="inherit">취소</Button>
        <Button type="submit" variant="contained" disabled={ !selectedSkill } disableElevation>
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddSkillDialog;
