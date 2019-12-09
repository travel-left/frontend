import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card'

export default ({ selectedValues, allValues, onChange, label }) => {
    return (
        <Card style={{ height: 80, padding: 16, marginBottom: 16 }}>
            <FormControl style={{ width: 180 }} >
                <InputLabel htmlFor="select-multiple-checkbox">{label}</InputLabel>
                <Select
                    multiple
                    value={selectedValues}
                    onChange={onChange}
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(', ')}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 320
                            }
                        }
                    }}
                >
                    {allValues.map((filter, i) => (
                        <MenuItem key={i} value={filter}>
                            <Checkbox color='primary' checked={selectedValues.indexOf(filter) > -1} />
                            <ListItemText primary={filter} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Card>
    )
}