import React from 'react'
import { connect } from 'react-redux'
import { setCurrentTrip } from '../util/redux/actions/trip'
import Cover from './Cover'
import TripRouter from './TripRouter'
import SideNav from './SideNav'
import ReactGA from 'react-ga'
ReactGA.pageview('/tripdashboard')

const Dashboard = ({ currentTrip, currentUser, setCurrentTrip }) => {
    return (
        <>
            <Cover setCurrentTrip={setCurrentTrip} currentTrip={currentTrip} />
            <div className="row">
                <div className="col-md-2 px-0">
                    <SideNav ctId={currentTrip._id} />
                </div>
                <div className="col-md-10 px-0">
                    <div className="ml-4 mt-5">
                        <div className="row">
                            <TripRouter
                                currentTrip={currentTrip}
                                currentUser={currentUser}
                                setCurrentTrip={setCurrentTrip}
                            />
                        </div>
                    </div>
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
