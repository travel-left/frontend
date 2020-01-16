import React from 'react'
import Chip from '@material-ui/core/Chip'
import Fab from '@material-ui/core/Fab'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => {
    console.log(theme)
    return {
        fab: {
            fontWeight: '500',
            fontFamily: 'roboto',
            fontSize: 16,
            color: '#FFFFFF',
            minWidth: 88,
            backgroundColor: '#475561',
            height: 32,
            textTransform: 'none',
            "&:hover": {
                backgroundColor: '#313b43'
            }
        },
        chip: {
            fontWeight: '500',
            fontFamily: 'roboto',
            fontSize: 16,
            color: '#FFFFFF',
            backgroundColor: '#475561',
            minWidth: 88,
            height: 32,
            textTransform: 'none',
            paddingLeft: 4,
            paddingRight: 4
        }
    }
})

const LeftFab = ({ text, fab, onClick, backgroundColor, id }) => {
    const classes = useStyles()
    return fab ?
        <Fab
            variant="extended"
            id={id}
            onClick={onClick}
            className={classes.fab}
        >
            {text}
        </Fab> :
        <Chip
            id={id}
            label={text}
            className={classes.chip}
        />
}

export default LeftFab
