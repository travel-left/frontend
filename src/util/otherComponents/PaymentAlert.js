import React, { Component } from 'react'
import moment from 'moment'
import { withRouter, NavLink } from 'react-router-dom'

class PaymentAlert extends Component {

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
        let startDate = this.props.user.createdAt.split('T')[0]
        console.log(startDate)
        let date = new Date();
        let today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        console.log(today)
        var a = moment([...today.split('-')]);
        var b = moment([...startDate.split('-')]);
        let daysLeft = 10 - a.diff(b, 'days')

        return (
            this.state.showAlert && (<div
                className="d-none d-md-flex flex-row justify-content-around my-3 text-primary align-items-center TripsListHeader"
                style={{ fontSize: '16px' }}
            >
                <div className="col-1 d-flex align-self-stretch justify-content-center align-items-center" style={{ backgroundColor: '#83C9F4' }}>
                    <i className="fas fa-thumbs-up fa-lg text-light" />
                </div>
                <div className="col-10 py-3">
                    <span style={{ color: '#83C9F4' }}>Welcome to Left! Your free trial has <span style={{ color: '#0F61D8' }}>{daysLeft} days</span> remaining. Head over to {' '}
                        <NavLink
                            to="/editprofile"
                            name="/editprofile"
                        >
                            your account
                        </NavLink>{' '}
                        to start your subscription!</span>
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

export default withRouter(PaymentAlert)