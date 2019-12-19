import React from 'react'
import Chip from '@material-ui/core/Chip'

export default ({ key, label }) => (
    <Chip key={key} label={label} clickable color="secondary" style={{ margin: 4, color: 'white' }} />
)
