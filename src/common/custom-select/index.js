import React from 'react';
import { PropTypes } from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import helper from '../../helper'
import { FormHelperText } from '@mui/material';

function CustomSelect(props) {
    const { name, value, options, onBlur, onChange, helperText } = props;

    const handleChangeEvent = (event) => {
      onChange(name, event?.target?.value);
    };

    const handleBlurEvent = () => {
      onBlur(name);
    };
    
    return <FormControl onBlur={handleBlurEvent}>
      <FormLabel
        size="small"
        id={`radio-buttons-${name}-label`}>
          {helper.capitalizeFirst(name)}
      </FormLabel>
      <RadioGroup
        aria-labelledby={`radio-buttons-${name}-label`}
        defaultValue={value}
        value={value}
        name="radio-buttons-group"
        size="small"
        onChange={handleChangeEvent}
      >
        {options.map(({ label, value }, index) => {
            return <FormControlLabel sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 18,
                },
              }}
              key={index}
              value={value}
              control={<Radio />}
              label={label}
            />
        })}
      </RadioGroup>
      <FormHelperText className="my-helper-text">{helperText}</FormHelperText>
    </FormControl>
};

CustomSelect.defaultProps = {
  name: '',
  value: '',
  options: [],
  helperText: '',
  onBlur: () => {},
  onChange: () => {},
};

CustomSelect.propTypes = {
  name: PropTypes.string,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  helperText: PropTypes.string,
};

export default CustomSelect;
