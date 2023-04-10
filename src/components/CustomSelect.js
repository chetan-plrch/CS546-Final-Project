import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import h from '../helper/index'

export default function CustomSelect(props) {
    const onChange = (e) => {
        props.onChange(props.name, e.target.value)
    }

    return <Select
        onBlur={props.onBlur}
        size="small"
        id={props.name}
        name={props.name}
        error={props.error}
        helperText={props.helperText}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.value}
        label={h.capitalizeFirst(props.name)}
        onChange={onChange}
    >
        {props.options.map(({ label, value }) => {
            return <MenuItem value={value}>{label}</MenuItem>    
        })}
    </Select>
}