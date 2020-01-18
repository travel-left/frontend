import React from 'react'
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core'

const styles = {
    fab: {
        fontWeight: '500',
        fontFamily: 'roboto',
        fontSize: 12,
        color: '#FFFFFF',
        minWidth: 48,
        backgroundColor: props => props.color ? null : '#475561',
        height: 28,
        textTransform: 'uppercase',
        "&:hover": {
            backgroundColor: props => props.color ? '#5A8DAA' : '#313b43'
        }
    }
}

const LeftFab = ({ onClick, classes, id, color, children }) => (
    <Fab
        variant="extended"
        color={color}
        id={id}
        onClick={onClick}
        className={classes.fab}
    >
        {children}
    </Fab>
)

export default withStyles(styles)(LeftFab)
