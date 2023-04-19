import React from 'react'
import TextField from '@mui/material/TextField';
import h from '../../helper'

export default function CustomTextField(props) {
    const onChange = (e) => {
        props.onChange(props.name, e.target.value)
    }

    return (
        <TextField 
            className="signup-input"
            onBlur={props.onBlur}
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
        />
    );
}