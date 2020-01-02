import React, { Component } from 'react'
import { withRouter, NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/actions/auth'
import './Navbar.css'
import Fab from '@material-ui/core/Fab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'

class Navbar extends Component {
    state = {
        anchorEl: null
    }

    constructor(props) {
        super(props)
    }
    signout = () => {
        this.props.history.push(`/signin`)
        this.props.logout()
    }

    account = () => {
        this.props.history.push(`/account/personal`)
        this.handleClose()
    }

    trips = () => {
        this.props.history.push(`/`)
        this.handleClose()
    }

    support = () => {
        this.props.history.push(`/support`)
        this.handleClose()
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    render() {
        const { currentUser } = this.props
        let accountController
        let loggedInLinks
        let linkTo = '#'

        const { pathname } = this.props.history.location
        const tripsColor = pathname === '/trips' ? 'primary' : 'secondary'
        const travelersColor = pathname === '/travelers' ? 'primary' : 'secondary'

        if (currentUser.isAuthenticated) {
            loggedInLinks = (
                <div class="collapse navbar-collapse " id="navbarNav">
                    <ul class="navbar-nav d-none d-md-flex align-items-center" style={{ marginLeft: 32 }}>
                        <NavLink
                            activeClassName="active"
                            className='Navbar main-nav-link'
                            to="/trips"
                            name="/trips"
                        >
                            <Fab color={tripsColor} className='Navbar main-nav-link' variant="extended" disableTouchRipple>

                                Trips

                        </Fab>
                        </NavLink>
                        <NavLink
                            activeClassName="active"
                            className='Navbar main-nav-link'
                            to="/travelers"
                            name="/travelers"
                        >
                            <Fab color={travelersColor} variant="extended" className='Navbar main-nav-link' disableTouchRipple style={{ marginLeft: 24 }}>

                                Travelers

                        </Fab>
                        </NavLink>
                    </ul>
                </div>
            )
            accountController = (
                <div className="collapse navbar-collapse justify-content-end">
                    <div className="navbar-nav">
                        <ul className="nav navbar-nav navbar-right d-flex d-row align-items-center">
                            <li className="Navbar user-name">{currentUser.name}</li>
                            <IconButton style={{ color: 'white', backgroundColor: '#83C9F4', padding: 0, marginLeft: '16px' }} onClick={this.handleClick}>
                                <ExpandMoreIcon />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={this.state.anchorEl}
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.account}>Account</MenuItem>
                                <MenuItem onClick={this.support}>Support</MenuItem>
                                <MenuItem onClick={this.signout}>Logout</MenuItem>
                            </Menu>
                        </ul>
                    </div>
                </div>
            )
            linkTo = '/trips'
        }

        return (
            <nav className="Left-Navbar navbar navbar navbar-expand container-fluid bg-primary" style={{ zIndex: 2, paddingLeft: 32, paddingRight: 32 }} >
                <div className="navbar-brand">
                    <Link to={linkTo} class="navbar-brand ">
                        <img src="/left.png" alt="" style={{ height: '40px' }}></img>
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
