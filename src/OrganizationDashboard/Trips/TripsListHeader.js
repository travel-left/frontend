import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core'
import styles from '../../styles/tripListHeader'

export default withStyles(styles, { withTheme: true })((props) => {
    const { classes } = props
    return (
        <Paper className={classes.tripListHeader}>
            <div className={classes.tripImage}></div>
            <div className={classes.tripName}>
                <Typography variant="h6"> NAME</Typography>
            </div>
            <div className={classes.tripDate}>
                <Typography variant="h6">DATE</Typography>
            </div>
            <div className={classes.tripStatus}>
                <Typography variant="h6">STATUS</Typography>
            </div>
            <div style={{ width: 128 }}></div>
        </Paper >
    )
})