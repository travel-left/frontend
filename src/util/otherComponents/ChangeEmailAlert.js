import React, { Component } from 'react'
import moment from 'moment'
import { withRouter, NavLink } from 'react-router-dom'

class ChangeEmailAlert extends Component {

    state = {
        showAlert: true
    }

    closeAlert = () => {
        this.setState({ showAlert: false })
    }
    constructor(props) {
        super(props)
    }

    render() {
        return (
            this.state.showAlert && (<div
                className="d-none d-md-flex flex-row justify-content-around my-3 text-primary align-items-center TripsListHeader"
            >
                <div className="col-1 d-flex align-self-stretch justify-content-center align-items-center" style={{ backgroundColor: '#FCABAA' }}>
                    <i className="fas fa-thumbs-up fa-lg text-light" />
                </div>
                <div className="col-10  py-3" style={{ fontSize: '16px' }}>
                    <span style={{ color: '#FCABAA' }}>Want to be able to access your trips from anywhere? Head over to your                         <NavLink
                        to="/editprofile"
                        name="/editprofile"
                    >
                        your account
                        </NavLink> and update your email and password.</span>
                </div>
                <div className="col-1 d-flex align-self-stretch justify-content-center align-items-center">
                    <i
                        className="fas fa-times fa-md text-dark hover"
                        onClick={this.closeAlert}
                    />
                </div>
            </div>
            )
        )
    }

}

export default withRouter(ChangeEmailAlert)