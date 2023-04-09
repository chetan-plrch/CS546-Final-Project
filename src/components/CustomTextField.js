import React from 'react'
import TextField from '@mui/material/TextField';
import h from '../helper/index'

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
            defaultValue={props.defaultValue || ''}
            value={props.value}
            label={h.capitalizeFirst(props.name)}
            variant="outlined"
            error={props.error}
            helperText={props.helperText}
        />
    );
}