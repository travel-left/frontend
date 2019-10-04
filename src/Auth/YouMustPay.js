import React, { Component } from 'react'
import moment from 'moment'

class YouMustPay extends Component {
    render() {
        let startDate = this.props.user.createdAt.split('T')[0]
        let date = new Date();
        let today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        var a = moment([...today.split('-')]);
        var b = moment([...startDate.split('-')]);
        let daysLeft = 10 - a.diff(b, 'days')

        return (
            daysLeft && (<div
                className="d-none d-md-flex flex-row justify-content-around my-3 text-primary align-items-center TripsListHeader"
                style={{ height: '65px' }}
            >
                <div className="col-1 d-flex align-self-stretch justify-content-center align-items-center" style={{ backgroundColor: '#83C9F4' }}>
                    <i className="fas fa-thumbs-down fa-lg text-light" />
                </div>
                <div className="col-11">
                    <span style={{ color: '#83C9F4' }}>Your free trial has <span style={{ color: '#0F61D8' }}>ended.</span> Please fill out your credit card information to continue.</span>
                </div>
            </div>
            )
        )
    }

}

export default YouMustPay