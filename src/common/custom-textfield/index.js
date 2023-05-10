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
            id={props.name?.split(" ")?.join("-")}
            name={props.name}
            onChange={onChange}
            value={props.value}
            color='primary'
            label={<span style={{ color: '#807000' }}>{h.capitalizeFirst(props.label ? props.label : props.name)}</span>}
            variant="outlined"
            error={typeof props.error === "boolean" && props.error} 
            helperText={props.helperText}
            type={props.type}
            InputProps={props.inputProps}
            required={props.required}
            style={{ width: '280px' ,opacity: 1, ...props.style}}
            aria-invalid={typeof props.error === "boolean" && props.error ? "true" : "false"}
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