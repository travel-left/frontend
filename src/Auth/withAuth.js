import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

class WithAuth extends Component {

    constructor(props) {
        super(props)
        if (!props.isAuthenticated) {
            props.history.push('/signup')
        }
    }

    componentDidUpdate() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/signup')
        }
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
