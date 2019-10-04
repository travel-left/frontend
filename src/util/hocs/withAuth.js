import React, { Component } from 'react'
import { connect } from 'react-redux'

class WithAuth extends Component {

    constructor(props) {
        super(props)

        if (!props.isAuthenticated) {
            this.createAnonUser()
        }

        // else if (!this.props.hasPayed && this.props.history.location.pathname !== "/editprofile") {
        //     props.history.push('/editprofile')
        // }
    }

    componentWillUpdate() {
        if (!this.props.isAuthenticated) {
            this.createAnonUser()
        }

        // else if (!this.props.hasPayed && this.props.history.location.pathname !== "/editprofile") {
        //     this.props.history.push('/editprofile')
        // }
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
        // hasPayed: state.currentUser.cc.length === 4
    }
}

export default connect(mapStateToProps)(WithAuth)
