import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/auth'
import './Navbar.css'

class Navbar extends Component {
    signout = e => {
        e.preventDefault()
        this.props.logout()
    }

    render() {
        let { currentUser } = this.props
        let loggedInContent = null
        let greeting = currentUser.user.email ? (
            <span>
                Hello, <a onClick={this.signout}> {currentUser.user.firstName}</a>!
            </span>
        ) : null

        if (currentUser.isAuthenticated) {
            loggedInContent = (
                <div className='collapse navbar-collapse justify-content-between'>
                    <div className="navbar-nav navbar-text">
                        <ul className="navbar-nav mr-auto">

                        </ul>
                    </div>
                    <div className="navbar-nav">
                        <ul className="nav navbar-nav navbar-right d-flex d-row align-items-center">
                            <a href="#" className="nav-link pr-4">{greeting}</a>
                            <i className="fa fa-download fa-2x" onClick={this.signout} aria-hidden="true" />
                        </ul>
                    </div>
                </div>
            )
        }

        return (
            <nav className="navbar navbar-expand container-fluid shadow px-4 bg-primary" style={{ zIndex: 2 }}>
                <div className="navbar-brand">
                    <Link to="/trips" className="">
                        <strong className="logo">left.</strong>
                    </Link>
                </div>
                {loggedInContent}
            </nav>
        )
    }
}

function mapStateToProps(state) {
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
