import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function withAuth(ComponentToBeRendered) {
    class Authenticate extends Component {
        componentWillMount() {
            if (!this.props.isAuthenticated) {
                this.props.history.push('/signin')
            }
        }

        componentWillUpdate() {
            if (!this.props.isAuthenticated) {
                this.props.history.push('/signin')
            }
        }

        render() {
            return (
                this.props.isAuthenticated && (
                    <ComponentToBeRendered {...this.props} />
                )
            )
        }
    }

    const mapStateToProps = state => {
        return {
            isAuthenticated: state.currentUser.isAuthenticated,
            user: state.currentUser.user
        }
    }

    return connect(mapStateToProps)(Authenticate)
}
