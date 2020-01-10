import React, { Component } from 'react'
import { withRouter, NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/actions/auth'
import './Navbar.css'
import Fab from '@material-ui/core/Fab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import MenuList from '@material-ui/core/MenuList'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

class Navbar extends Component {
    state = {
        open: false
    }

    constructor(props) {
        super(props)
    }

    handleClick = (event) => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    trips = () => {
        this.props.history.push(`/`)
        this.handleClose()
    }

    handleListKeyDown = event => {
        if (event.key === 'Tab') {
            event.preventDefault()
            this.handleClose(false)
        }
    }

    render() {
        const { currentUser, currentTrip } = this.props
        let accountController
        let loggedInLinks
        let linkTo = '#'
        let tripName = null

        const { pathname } = this.props.history.location
        const tripsColor = pathname === '/trips' ? 'primary' : 'secondary'
        const travelersColor = pathname === '/travelers' ? 'primary' : 'secondary'

        if (pathname !== '/trips' && pathname !== '/travelers' && !pathname.includes('/account') && currentTrip.name) {
            tripName = currentTrip.name
        }

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
                            <MenuListComposition logout={this.props.logout} history={this.props.history}></MenuListComposition>
                        </ul>
                    </div>
                </div>
            )
            linkTo = '/trips'
        }

        return (
            <nav className="Left-Navbar navbar navbar navbar-expand container-fluid bg-primary" style={{ zIndex: 2, paddingLeft: 64, paddingRight: 64 }} >
                {!tripName ? <div className="navbar-brand">
                    <Link to={linkTo} class="navbar-brand ">
                        <img src="/left.png" alt="" style={{ height: '40px' }}></img>
                    </Link>
                </div> : <>
                        <NavLink
                            className='Navbar main-nav-link'
                            to="/trips"
                            name="/trips"
                        >
                            <ArrowBackIosIcon style={{ color: 'white', marginLeft: 24 }} />
                            <span style={{
                                fontFamily: 'Poppins',
                                fontWeight: 700,
                                fontSize: 22,
                                color: 'white',
                                letterSpacing: 1,
                                paddingLeft: 24
                            }}>Trips</span>
                        </NavLink>
                    </>}
                {!tripName && loggedInLinks}
                <div className="d-flex align-items-center">
                    <Typography variant="h4" style={{ color: 'white', paddingLeft: 80 }}>{tripName}</Typography>
                </div>
                {accountController}
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        currentTrip: state.currentTrip
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

function MenuListComposition({ logout, history }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const signout = () => {
        history.push(`/signin`)
        logout()
    }

    const account = event => {
        history.push(`/account/personal`)
        handleClose(event)
    }

    const support = event => {
        history.push(`/support`)
        handleClose(event)
    }

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    }

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <div>
                <IconButton style={{ color: 'white', backgroundColor: '#83C9F4', padding: 0, marginLeft: '16px' }} onClick={handleToggle} ref={anchorRef}>
                    <ExpandMoreIcon />
                </IconButton>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement='bottom'>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={account}>Account</MenuItem>
                                        <MenuItem onClick={support}>Support</MenuItem>
                                        <MenuItem onClick={signout}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}

export default withRouter(
    connect(
        mapStateToProps,
        { logout }
    )(Navbar)
)

    // < Popper open = { this.state.open } anchorEl = { anchorRef.current } role = { undefined } transition disablePortal >
    //     {({ TransitionProps, placement }) => (
    //         <Grow
    //             {...TransitionProps}
    //         >
    //             <Paper>
    //                 <ClickAwayListener onClickAway={handleClose}>
    //                     <MenuList autoFocusItem={this.state.open} id="menu-list-grow" onKeyDown={this.handleListKeyDown}>
    //                         <MenuItem onClick={this.account}>Account</MenuItem>
    //                         <MenuItem onClick={this.support}>Support</MenuItem>
    //                         <MenuItem onClick={this.signout}>Logout</MenuItem>
    //                     </MenuList>
    //                 </ClickAwayListener>
    //             </Paper>
    //         </Grow>
    //     )}
    //                         </Popper >