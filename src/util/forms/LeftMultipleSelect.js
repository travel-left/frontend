import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
        maxWidth: 180,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

export default ({ selectedValues, allValues, onChange, label }) => {
    const classes = useStyles()
    return (
        <FormControl className={classes.formControl} >
            <InputLabel htmlFor="select-multiple-checkbox">{label}</InputLabel>
            <Select
                multiple
                value={selectedValues}
                onChange={onChange}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {allValues.map((filter, i) => (
                    <MenuItem key={i} value={filter}>
                        <Checkbox color='primary' checked={selectedValues.indexOf(filter) > -1} />
                        <ListItemText primary={filter} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}