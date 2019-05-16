import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Dashboard.css'
import NumberTile from '../components/AdminHome/NumberTile'

class Dashboard extends Component {

    constructor(props){
        super(props)
        //get the admin's cohorts
        //get the admin's users
        //get the admin's places of interest
        //get the admin's itineraries
    }

    render() {
        return (
            <div>
                <h4 style={{marginTop: '30px', marginLeft: '30px'}}><strong>By the Numbers</strong></h4>
                <div className="row" style={{display: 'flex', flexDirection:'row', justifyContent: 'center', marginTop: '15px', marginLeft: '20px', marginRight: '20px'}}>
                    <NumberTile phrase='Days until the trip' number={36} />
                    <NumberTile phrase='Travelers ready to go' number={19} />
                    <NumberTile phrase='Events planned' number={24} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentTrip: state.currentTrip
    }
}


export default connect(mapStateToProps, null)(Dashboard);