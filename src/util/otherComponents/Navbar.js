import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/actions/auth'

class Navbar extends Component {
    signout = () => {
        this.props.history.push(`/signin`)
        this.props.logout()
    }

    account = () => {
        this.props.history.push(`/editprofile`)
    }

    support = () => {
        this.props.history.push(`/support`)
    }

    render() {
        let { currentUser } = this.props
        let loggedInContent = null
        let linkTo = '#'

        if (currentUser.isAuthenticated) {
            loggedInContent = (
                <div className="collapse navbar-collapse justify-content-between">
                    <div className="navbar-nav navbar-text">
                        <ul className="navbar-nav mr-auto" />
                    </div>
                    <div className="navbar-nav">
                        <ul className="nav navbar-nav navbar-right d-flex d-row align-items-center">
                            <li class="nav-item dropdown">
                                <a
                                    class="nav-link dropdown-toggle text-light"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                >
                                    {currentUser.name}
                                </a>
                                <div class="dropdown-menu">
                                    <button
                                        class="dropdown-item btn-link"
                                        onClick={this.account}
                                    >
                                        Account
                                    </button>
                                    <button
                                        class="dropdown-item btn-link"
                                        onClick={this.support}
                                    >
                                        Support
                                    </button>

                                    <div class="dropdown-divider" />
                                    <button
                                        class="dropdown-item btn-link"
                                        onClick={this.signout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </li>
                            <div className="a nav-link pr-4 hover">
                                <span
                                    className="text-light"
                                    onClick={() =>
                                        this.props.history.push('/editprofile')
                                    }
                                />
                            </div>
                        </ul>
                    </div>
                </div>
            )
            linkTo = '/trips'
        }

        return (
            <nav
                className="navbar navbar-expand container-fluid shadow px-4 py-2 bg-primary"
                style={{ zIndex: 2 }}
            >
                <div className="navbar-brand">
                    <Link to={linkTo}>
                        <h1
                            className="logo text-light font-weight-bold d-flex d-row align-items-center mb-0"
                            style={{ fontSize: '3.2rem' }}
                        >
                            left.
                        </h1>
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
