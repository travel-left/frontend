import React from 'react';
import { withStyles } from '@material-ui/core';
import sizes from '../../styles/sizes'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'

const styles = theme => ({
    travelersHeader: {
        height: theme.spacing(6),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        margin: theme.spacing(2, 0)
    },
    travelerName: {
        width: theme.spacing(16),
        textAlign: 'left'
    },
    travelerImage: {
        width: 64,
        [sizes.down("md")]: {
            display: 'none'
        },
    },
    travelerEmail: {
        width: theme.spacing(16),
        textAlign: 'left'
    },
    travelerStatus: {
        width: theme.spacing(13),
        textAlign: 'center',
        [sizes.down("md")]: {
            display: 'none'
        },
    },
    travelerTrip: {
        width: theme.spacing(16),
        textAlign: 'center',
        [sizes.down("md")]: {
            display: 'none'
        },
    },
    checkbox: {
        padding: 0
    }
})

export default withStyles(styles)(({ classes, toggleAll, allSelected, showTrip }) => (
    <Paper className={classes.travelersHeader}>
        <Checkbox
            onChange={toggleAll}
            className={classes.checkbox}
            checked={allSelected}
            label="noshow"
            color="primary"
        />
        <div className={classes.travelerImage}></div>
        <Typography
            variant="h6"
            className={classes.travelerName}
        >
            NAME
        </Typography>
        <Typography
            variant="h6"
            className={classes.travelerEmail}
        >
            CONTACT
        </Typography>
        <Typography
            variant="h6"
            className={classes.travelerStatus}
        >
            STATUS
        </Typography>
        {!showTrip &&
            <Typography
                variant="h6"
                className={classes.travelerTrip}
            >
                TRIP
            </Typography>
        }
        <div style={{ width: 24 }}></div>
    </Paper>
))