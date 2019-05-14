import React, { Component } from 'react'
import { connect } from 'react-redux'

class AdminHome extends Component {

    constructor(props){
        super(props)
    }

    onButtonClick = e => {
        let {history, currentTrip} = this.props

        switch (e.target.name) {
            case 'create':
                return history.push(`/trips/${currentTrip.id}/create`)
            case 'manage':
                return history.push(`/trips/${currentTrip.id}/manage`)
            case 'communicate':
                return history.push(`/trips/${currentTrip.id}/communicate`)
            default:
                history.push('/trips')
        }
    }

    render() {
        let {currentTrip} = this.props
        let question = 'What would you like to do on your trip' 
        question += currentTrip.name ? ` to ${currentTrip.name}` : ''
        
        return (
            <div className="container">
                    <div className="row">
                        <div className="welcomeMessage">   
                            <h2>{ question }?</h2>
                        </div>
                    </div>
                <div className="row">
                    <div className="welcomeMessage">   
                        <button name='create' onClick={this.onButtonClick}> <i class="fa fa-map-marker" aria-hidden="true"></i> Create</button>
                        <button name='manage' onClick={this.onButtonClick}> <i class="fa fa-users" aria-hidden="true"></i> Manage</button>
                        <button name='communicate' onClick={this.onButtonClick}> <i class="fa fa-comments" aria-hidden="true"></i> Communicate</button>
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


export default connect(mapStateToProps, null)(AdminHome);