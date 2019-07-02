import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/auth'

class Navbar extends Component {
    signout = e => {
        e.preventDefault()
        this.props.history.push(`/signin`)
        this.props.logout()
    }

    render() {
        let { currentUser } = this.props
        let loggedInContent = null
        let greeting = currentUser.user.email ? <span className="text-light">Hello, {currentUser.user.firstName}!</span> : null

        if (currentUser.isAuthenticated) {
            loggedInContent = (
                <div className="collapse navbar-collapse justify-content-between">
                    <div className="navbar-nav navbar-text">
                        <ul className="navbar-nav mr-auto" />
                    </div>
                    <div className="navbar-nav">
                        <ul className="nav navbar-nav navbar-right d-flex d-row align-items-center">
                            <a href="#" className="nav-link pr-4 disabled">
                                {greeting}
                            </a>
                            <a href="">
                                <i className="fa fa-download fa-2x text-secondary pr-4" />
                            </a>
                            <a href="">
                                <i className="fas fa-sign-out-alt fa-2x text-secondary" onClick={this.signout} aria-hidden="true" />
                            </a>
                        </ul>
                    </div>
                </div>
            )
        }

        return (
            <nav className="navbar navbar-expand container-fluid shadow px-4 bg-primary" style={{ zIndex: 2 }}>
                <div className="navbar-brand">
                    <Link to="/trips" className="">
                        <h1 className="logo text-light font-weight-bold d-flex d-row align-items-center mb-0">left.</h1>
                    </Link>
                </div>
                {loggedInContent}
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        { logout }
    )(Navbar)
)
