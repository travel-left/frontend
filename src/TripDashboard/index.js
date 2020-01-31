import React from 'react'
import { connect } from 'react-redux'
import { setCurrentTrip } from '../util/redux/actions/trip'
import Cover from './Cover'
import TripRouter from './TripRouter'
import SideNav from './SideNav'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    main: {
        padding: theme.spacing(2)
    }
})
const Dashboard = withStyles(styles)(({ currentTrip, currentUser, setCurrentTrip, classes }) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Cover setCurrentTrip={setCurrentTrip} currentTrip={currentTrip} />
            </Grid>
            <Grid item xs={12} md={2}>
                <SideNav ctId={currentTrip._id} words={currentUser.words ? currentUser.words : { what: 'Trip', whatPlural: 'Trips', who: 'Traveler', whoPlural: 'Travelers' }} />
            </Grid>
            <Grid item xs={12} md={10} lg={10}>
                <div className={classes.main} >
                    <TripRouter
                        currentTrip={currentTrip}
                        currentUser={currentUser}
                        setCurrentTrip={setCurrentTrip}
                    />
                </div>
            </Grid>
        </Grid>
    )
})

const mapStateToProps = state => {
    return {
        currentTrip: state.currentTrip,
        currentUser: state.currentUser
    }
}

export default connect(
    mapStateToProps,
    { setCurrentTrip }
)(Dashboard)
