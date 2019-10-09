import React, { Component } from 'react'
import { connect } from 'react-redux'

class WithoutAuth extends Component {
    constructor(props) {
        super(props)
        if (props.isAuthenticated) {
            props.history.push('/')
        }
    }

    render() {
        return !this.props.isAuthenticated && this.props.children
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.currentUser.isAuthenticated
    }
}

export default connect(mapStateToProps)(WithoutAuth)
