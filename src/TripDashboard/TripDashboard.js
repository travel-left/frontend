import React from 'react'
import { connect } from 'react-redux'
import { setCurrentTrip } from '../util/redux/actions/trip'
import Cover from './CoverPhoto/Cover'
import TripRouter from './TripRouter'
import SideNav from './SideNav'

const Dashboard = ({ currentTrip, currentUser, setCurrentTrip }) => {
    return (
        <>
            <Cover setCurrentTrip={setCurrentTrip} currentTrip={currentTrip} />
            <div className="row">
                <div
                    className="col-md-2 shadow-lg bg-light px-0"
                    style={{ minHeight: '93vh' }}
                >
                    <div className="shadow">
                        <SideNav ctId={currentTrip._id} />
                    </div>
                </div>
                <div className="col-md-10">
                    <TripRouter
                        currentTrip={currentTrip}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
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
