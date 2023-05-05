import React from 'react'
import {Radio} from '@mui/material';
import {RadioGroup} from '@mui/material';
import {FormControlLabel} from '@mui/material';
import {FormControl} from '@mui/material';
import {FormLabel} from '@mui/material';
import h from '../../helper/index.js'
import { FormHelperText } from '@mui/material';

export default function CustomSelect(props) {
    const onChange = (e) => {
        props.onChange(props.name, e.target.value)
    }

    const onBlur = () => {
      props.onBlur(props.name)
    }
    
    return <FormControl onBlur={onBlur}>
      <FormLabel size="small" id={`radio-buttons-${props.name}-label`}>{h.capitalizeFirst(props.name)}</FormLabel>
      <RadioGroup
        aria-labelledby={`radio-buttons-${props.name}-label`}
        defaultValue={props.value}
        name="radio-buttons-group"
        size="small"
        onChange={onChange}
      >
        {props.options.map(({ label, value }) => {
            return <FormControlLabel sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 18,
                },
              }}
              value={value}
              control={<Radio />}
              label={label}
            />
        })}
      </RadioGroup>
      <FormHelperText className="my-helper-text">{props.helperText}</FormHelperText>
    </FormControl>
}