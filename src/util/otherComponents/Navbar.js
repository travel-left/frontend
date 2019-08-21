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

    trips = () => {
        this.props.history.push(`/`)
    }

    support = () => {
        this.props.history.push(`/support`)
    }

    render() {
        let { currentUser } = this.props
        let accountController = null
        let loggedInLinks
        let linkTo = '#'

        const { pathname } = this.props.history.location

        const badgePill = 'badge badge-secondary badge-pill px-4'

        if (currentUser.isAuthenticated) {
            loggedInLinks = (
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item h3">
                            <Link
                                class={`nav-link text-light mx-4 font-weight-bold h5 ${
                                    pathname === '/trips' ? badgePill : ''
                                }`}
                                to="/trips"
                            >
                                Trips
                            </Link>
                        </li>
                        <li class="nav-item h3">
                            <Link
                                class={`nav-link text-light mx-4 font-weight-bold h5 ${
                                    pathname === '/travelers' ? badgePill : ''
                                }`}
                                to="/travelers"
                            >
                                Travelers
                            </Link>
                        </li>
                    </ul>
                </div>
            )
            accountController = (
                <div className="collapse navbar-collapse justify-content-between">
                    <div className="navbar-nav navbar-text">
                        <ul className="navbar-nav mr-auto" />
                    </div>
                    <div className="navbar-nav">
                        <ul className="nav navbar-nav navbar-right d-flex d-row align-items-center">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle text-light"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                >
                                    {currentUser.name}
                                </a>
                                <div className="dropdown-menu">
                                    <button
                                        className="dropdown-item btn-link"
                                        onClick={this.account}
                                    >
                                        Account
                                    </button>
                                    <button
                                        className="dropdown-item btn-link"
                                        onClick={this.support}
                                    >
                                        Support
                                    </button>

                                    <div className="dropdown-divider" />
                                    <button
                                        className="dropdown-item btn-link"
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
                {loggedInLinks}
                {accountController}
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
