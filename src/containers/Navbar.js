import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/actions/auth'
import './Navbar.css'

class Navbar extends Component {

    signout = e => {
        e.preventDefault()
        this.props.logout()
    }

    render(){
        let {currentUser} = this.props
        let greeting = currentUser.user.email
            ?
                <a onClick='' >Hello, <span className='user-email'>{this.props.currentUser.user.email}</span>!</a>
            :
                null
        return (
            <nav className="navbar navbar-expand">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/trips" className="navbar-brand">
                            <img className='navbar-brand-left' src='/LEFT.png' style={{"maxWidth":"50px"}}alt="Home" />
                        </Link>
                    </div>
                    <div className="nav navbar-nav navbar-right">
                        <ul className="nav navbar-nav navbar-right">
                            <li className='greeting'>
                                { greeting }
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className='nav-app-link'>
                            <a onClick={this.signout}><i className="fa fa-mobile fa-2x" aria-hidden="true"></i> <i className="fa fa-download fa-2x" aria-hidden="true"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, { logout })(Navbar))