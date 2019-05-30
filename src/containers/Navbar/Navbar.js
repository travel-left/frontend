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
                Hello, <a onClick=""> {this.props.currentUser.user.email}</a>!
            </span>
        ) : null

        if(currentUser.isAuthenticated) {
            loggedInContent = (
                <>
                    <div className="nav-item">
                        <button className="btn-lg btn-round light" style={{ marginLeft: '30px' }}>
                            Trips
                        </button>
                    </div>
                    <div className="nav-item">
                        <button className="btn-lg btn-round clear" style={{ marginLeft: '30px' }}>
                            Account
                        </button>
                    </div>
                    <div className="nav navbar-nav ml-auto">
                        <ul className="navbar-nav">
                            <li className="greeting nav-item">{greeting}</li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="nav-app-link nav-item">
                                <a onClick={this.signout}>
                                    <i className="fa fa-mobile fa-2x" aria-hidden="true" /> <i className="fa fa-download fa-2x" aria-hidden="true" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </>
            )
        }

        return (
            <nav className="navbar navbar-expand container-fluid" style={{ paddingLeft: '50px', paddingRight: '50px', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px' }}>
                <div className="navbar-header navbar-brand">
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
