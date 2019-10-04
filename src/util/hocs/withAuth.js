import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

class WithAuth extends Component {

    constructor(props) {
        super(props)

        if (!props.isAuthenticated) this.createAnonUser()
        this.redirectBecauseYouHaveToPay()
    }

    componentWillUpdate() {
        if (!this.props.isAuthenticated) this.createAnonUser()
        this.redirectBecauseYouHaveToPay()
    }

    redirectBecauseYouHaveToPay() {
        let hasPayed = this.props.cc ? this.props.cc.length === 4 : false

        let daysLeft = 10

        if (this.props.user.createdAt) {
            let startDate = this.props.user.createdAt.split('T')[0]
            let date = new Date()
            let today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            var a = moment([...today.split('-')])
            var b = moment([...startDate.split('-')])
            daysLeft = 10 - a.diff(b, 'days')
        }

        if (!hasPayed && this.props.history.location.pathname !== "/editprofile" && daysLeft <= 0) {
            this.props.history.push('/editprofile')
        }
    }

    createAnonUser = async () => {
        await this.props.onAuth('signup', { coordinator: {}, organization: {} }, this.props.history)
        this.props.history.push('/trips')
    }

    render() {
        return this.props.isAuthenticated && this.props.children
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.currentUser.isAuthenticated,
        cc: state.currentUser.cc,
        user: state.currentUser
    }
}

export default connect(mapStateToProps)(WithAuth)
