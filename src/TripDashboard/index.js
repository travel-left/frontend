import React from 'react'
import { connect } from 'react-redux'
import { setCurrentTrip } from '../util/redux/actions/trip'
import Cover from './Cover'
import TripRouter from './TripRouter'
import SideNav from './SideNav'
import Grid from '@material-ui/core/Grid'

const Dashboard = ({ currentTrip, currentUser, setCurrentTrip }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={{ paddingTop: 16 }}>
                <Cover setCurrentTrip={setCurrentTrip} currentTrip={currentTrip} />
            </Grid>
            <Grid item xs={12} md={2}>
                <SideNav ctId={currentTrip._id} />
            </Grid>
            <Grid item xs={12} md={10}>
                <TripRouter
                    currentTrip={currentTrip}
                    currentUser={currentUser}
                    setCurrentTrip={setCurrentTrip}
                />
            </Grid>
        </Grid>
    )
}

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
