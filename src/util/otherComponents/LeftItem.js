import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    leftItem: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: theme.spacing(14),
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        maxWidth: theme.spacing(68)
    }
})

const LeftItem = ({ children, classes }) => (
    <Grid item xs={12} sm={8} md={6} >
        <div className={classes.leftItem}>
            {children}
        </div>
    </Grid>
)

export default withStyles(styles)(LeftItem)