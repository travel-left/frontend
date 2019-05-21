import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Dashboard.css'
import NumberTile from '../components/AdminHome/NumberTile'
import { setCurrentTrip } from '../store/actions/trip'
import { apiCall } from '../services/api'
import Alert from '../components/Other/Alert';

class Dashboard extends Component {

    state = {

    }

    constructor(props){
        super(props)

    }

    selectFeature = e => {
        console.log(e.target.name)
        let {history, currentTrip} = this.props

        switch (e.target.name) {
            case 'itinerary':
                return history.push(`/trips/${currentTrip._id}/itinerary`)
            case 'travelers':
                return history.push(`/trips/${currentTrip._id}/manage`)
            case 'communicate':
                return history.push(`/trips/${currentTrip._id}/communicate`)
            default:
                return history.push('/trips')
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-2" style={{backgroundColor: '#FBFBFB', height: '100vh', boxShadow: 'rgb(136, 136, 136) 1px 0px 20px'}} >
                    <div className='row' style={{justifyContent: 'center'}}>
                        <div class="card" style={{border: 'none', backgroundColor:'#FBFBFB'}}>
                            <img className='card-img-top' src={this.props.currentTrip.image} style={{boxShadow: 'rgb(136, 136, 136) 0px 2px 4px', border: 'none', borderRadius: '0%'}}></img>
                            <span style={{fontSize: '1.3em', color: '#3A3A3A', fontWeight: '600', margin: '15px 15px'}}>Trip to {this.props.currentTrip.name}</span> 
                        </div>
                    </div>
                    <hr/>
                    <div className='dashboard-side-bar'>
                        <ul class="list-group list-group-flush" style={{backgroundColor: '#FBFBFB'}}>
                            <a onClick={this.selectFeature} name='info' style={{margin: '25px 10px', color: '#0B62D4', fontWeight: '600'}}>Trip Information</a>
                            <a onClick={this.selectFeature} name='itinerary' style={{margin: '25px 10px', color: '#0B62D4', fontWeight: '600'}}>Itinerary</a>
                            <a onClick={this.selectFeature} name='docs' style={{margin: '25px 10px', color: '#0B62D4', fontWeight: '600'}}>Documents</a>
                            <a onClick={this.selectFeature} name='travelers' style={{margin: '25px 10px', color: '#0B62D4', fontWeight: '600'}}>Travelers</a>
                            <a onClick={this.selectFeature} name='mobile' style={{margin: '25px 10px', color: '#0B62D4', fontWeight: '600'}}>Mobile App</a>
                            <a onClick={this.selectFeature} name='communicate' style={{margin: '25px 10px', color: '#0B62D4', fontWeight: '600'}}>Communicate</a>
                        </ul>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row">
                        <div className="col-12">
                            <Alert />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                        <div className="">
                        </div>
                        </div>
                        <div className="col-4" style={{backgroundColor: 'white', height: '100vh', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px'}}>
                            
                        </div>
                    </div>
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


export default connect(mapStateToProps, { setCurrentTrip })(Dashboard);