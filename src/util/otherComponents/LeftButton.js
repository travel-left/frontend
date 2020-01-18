import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'

const styles = {
    button: {
        width: '180px',
        height: '50px',
        float: props => props.float ? 'right' : null
    }
}

const LeftButton = ({ color, classes, children, onClick, id, type, disabled }) => (
    <Button
        id={id}
        type={type}
        className={classes.button}
        size="large"
        variant="contained"
        color={color ? color : 'primary'}
        onClick={onClick}
        disabled={disabled}>
        {children}
    </Button>
)

export default withStyles(styles)(LeftButton)