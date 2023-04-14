import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import h from '../../helper'
import { InputLabel } from '@mui/material';

export default function CustomSelect(props) {
    const onChange = (e) => {
        props.onChange(props.name, e.target.value)
    }

    return <>
        <InputLabel id={props.name + '-label'}>{h.capitalizeFirst(props.name)}</InputLabel>
        <Select
            labelId={props.name + '-label'}
            onBlur={props.onBlur}
            size="small"
            id={props.name}
            name={props.name}
            error={props.error}
            helperText={props.helperText}
            value={props.value}
            placeholder={props.name}
            label={h.capitalizeFirst(props.name)}
            onChange={onChange}
        >
            {props.options.map(({ label, value }) => {
                return <MenuItem value={value}>{label}</MenuItem>    
            })}
        </Select>
    </>
}