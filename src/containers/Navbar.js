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
                <span>Hello, <a onClick=''> {this.props.currentUser.user.email}</a>!</span>
            :
                null
        return (
            <nav className="navbar navbar-expand container-fluid" style={{paddingLeft: '50px', paddingRight: '50px'}}>
                    <div className="navbar-header navbar-brand">
                        <Link to="/trips" className="">
                            <strong className='logo'>left.</strong>
                        </Link>
                    </div>
                    <div className="nav-item">
                        <button className="btn-lg btn-round light" style={{marginLeft: '30px'}}>
                            Trips
                        </button>
                    </div>
                    <div className="nav navbar-nav ml-auto">
                        <ul className="navbar-nav">
                            <li className='greeting nav-item'>
                                { greeting }
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className='nav-app-link nav-item'>
                                <a onClick={this.signout}><i className="fa fa-mobile fa-2x" aria-hidden="true"></i> <i className="fa fa-download fa-2x" aria-hidden="true"></i></a>
                            </li>
                        </ul>
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