import React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox label' } };

export default function CustomCheckbox(props) {
  const onChange = (e) => {
    props.onChange(props.name, e.target.checked)
  }

  return (
    <div>
      <Checkbox 
        {...label} 
        className={props.className}
        checked={props.checked}
        onChange={onChange}
        disabled={props.disabled}
      />
      {props.text}
    </div>
  )
}