import React from 'react'
import TextField from '@mui/material/TextField';
import h from '../../helper'

function CustomTextField(props) {
    const onChange = (e) => {
        props.onChange(props.name, e.target.value)
    }

    const onBlur = (e) => {
        props.onBlur(props.name)
    }

    return (
        <TextField 
            className="signup-input"
            onBlur={onBlur}
            size="small"
            id={props.name}
            name={props.name}
            onChange={onChange}
            value={props.value}
            label={h.capitalizeFirst(props.label ? props.label : props.name)}
            variant="outlined"
            error={props.error}
            helperText={props.helperText}
            type={props.type}
            InputProps={props.inputProps}
            required={props.required}
        />
    );
}

CustomTextField.defaultProps = {
    error: false,
    helperText: '',
    type: 'text',
    onBlur: () => {},
    onChange: () => {}
};

export default CustomTextField;