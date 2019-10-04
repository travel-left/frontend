import React, { Component } from 'react'
import { connect } from 'react-redux'

class WithAuth extends Component {

    constructor(props) {
        super(props)

        if (!props.isAuthenticated) {
            this.createAnonUser()
        }
    }

    componentWillUpdate() {
        if (!this.props.isAuthenticated) {
            this.createAnonUser()
        }
    }

    createAnonUser = async () => {
        console.log(this.props.history)
        await this.props.onAuth('signup', { coordinator: {}, organization: {} }, this.props.history)
        this.props.history.push('/trips')
    }

    render() {
        return this.props.isAuthenticated && this.props.children
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.currentUser.isAuthenticated
    }
}

export default connect(mapStateToProps)(WithAuth)
