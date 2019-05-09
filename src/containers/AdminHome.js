import React, { Component } from 'react'
import { connect } from 'react-redux'

class AdminHome extends Component {

    constructor(props){
        super(props)
    }

    onButtonClick = e => {
        console.log(e.target.name)
        switch (e.target.name) {

            case 'create':
                return this.props.history.push(`/trips/${this.props.currentTrip.id}/create`)
            case 'manage':
                return this.props.history.push(`/trips/${this.props.currentTrip.id}/manage`)
            case 'communicate':
                return this.props.history.push(`/trips/${this.props.currentTrip.id}/communicate`)
            default:
                this.props.history.push('/trips')
        }
    }

    render() {
        let question = 'What would you like to do on your trip' 
        question += this.props.currentTrip.name ? ` to ${this.props.currentTrip.name}` : ''
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