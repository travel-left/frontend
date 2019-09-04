import React, { Component } from 'react'
import { withRouter, NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/actions/auth'
import './Navbar.css'

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

        const badgePill = ' px-4'



        if (currentUser.isAuthenticated) {
            loggedInLinks = (
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav d-flex align-items-center ml-4">
                        <NavLink
                            activeClassName="active"
                            className='Navbar main-nav-link mr-3'
                            to="/trips"
                            name="/trips"
                        >
                            Trips
                        </NavLink>
                        <NavLink
                            activeClassName="active"
                            className='Navbar main-nav-link ml-3'
                            to="/travelers"
                            name="/travelers"
                        >
                            Travelers
                            </NavLink>
                    </ul>
                </div>
            )
            accountController = (
                <div className="collapse navbar-collapse justify-content-end">
                    <div className="navbar-nav">
                        <ul className="nav navbar-nav navbar-right d-flex d-row align-items-center">
                            <li className="nav-item dropdown d-flex align-items-center justify-content-center">
                                <li
                                    className="Navbar user-name"
                                >
                                    {currentUser.name}
                                </li>
                                <i class="material-icons md-18 bg-secondary nav-link dropdown-toggle ml-3 hover"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    style={{ borderRadius: '50%', padding: '0px', color: 'white' }}>
                                    expand_more
                                </i>
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
                        </ul>
                    </div>
                </div>
            )
            linkTo = '/trips'
        }

        return (
            <nav className="Left-Navbar navbar navbar navbar-expand container-fluid px-5 bg-primary" style={{ zIndex: 2 }} >
                <div className="navbar-brand">

                    <Link to={linkTo} class="navbar-brand ml-2">
                        <img src="left.png" alt="" style={{ height: '40px' }}></img>
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
