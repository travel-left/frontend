import React from 'react'
import { connect } from 'react-redux'
import { setCurrentTrip } from '../util/redux/actions/trip'
import Cover from './Cover'
import TripRouter from './TripRouter'
import SideNav from './SideNav'

const Dashboard = ({ currentTrip, currentUser, setCurrentTrip }) => {
    return (
        <>
            <div className="row">
                <div className="col-md-2" style={{
                    background: '#FFFFFF',
                }}>
                    <SideNav ctId={currentTrip._id} />
                </div>
                <div className="col-md-10 mt-3">
                    <div className="row px-3">
                        <Cover setCurrentTrip={setCurrentTrip} currentTrip={currentTrip} />
                        <TripRouter
                            currentTrip={currentTrip}
                            currentUser={currentUser}
                            setCurrentTrip={setCurrentTrip}
                        />
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
