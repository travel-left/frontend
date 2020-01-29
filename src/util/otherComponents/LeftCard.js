import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
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

const LeftCardNew = ({ children, classes }) => (
    <Grid item xs={12} sm={8} md={6} >
        <Card className={classes.leftItem}>
            {children}
        </Card>
    </Grid>
)

export default withStyles(styles)(LeftCardNew)