import React, { Component } from 'react'
import { withRouter, NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/actions/auth'
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
import { makeStyles, withStyles } from '@material-ui/core/styles'
import sizes from '../../styles/sizes'

const styles = theme => ({
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        height: theme.spacing(10),
        padding: theme.spacing(2, 4),
        zIndex: 2
    },
    navbarLeft: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    navbarRight: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    logo: {
        height: theme.spacing(6)
    },
    buttons: {
        margin: theme.spacing(0, 4),
        [sizes.down("md")]: {
            display: 'none'
        }
    },
    backText: {
        fontFamily: 'Poppins',
        fontWeight: 700,
        fontSize: 22,
        color: 'white',
        letterSpacing: 1,
        paddingLeft: theme.spacing(1)
    },
    navButton: {
        fontFamily: "Roboto",
        fontWeight: "500",
        fontSize: "22px",
        color: "#FFFFFF",
        letterSpacing: "1.51px",
        lineHeight: "1",
        textTransform: 'none'
    },
    backArrow: {
        color: 'white',
        marginLeft: theme.spacing(3)
    },
    tripName: {
        color: 'white',
        [sizes.down("md")]: {
            display: 'none'
        },
        marginRight: theme.spacing(4)
    },
    userName: {
        opacity: ".9",
        fontFamily: "Poppins",
        fontWeight: "400",
        fontSize: "18px",
        color: "#FFFFFF",
        letterSpacing: "0.25px",
        "&:hover": {
            cursor: "default"
        }
    },
    backButtonContainer: {
        display: 'flex',
        alignItems: 'center'
    }
})

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
        const { currentUser, currentTrip, classes } = this.props
        let loggedInLinks
        let linkTo = '#'
        let tripName = null
        let backText
        let backPath = '/trips'
        const { pathname } = this.props.history.location
        const tripsColor = pathname === '/trips' ? 'primary' : 'secondary'
        const travelersColor = pathname === '/travelers' ? 'primary' : 'secondary'

        if (pathname !== '/trips' && pathname !== '/travelers' && !pathname.includes('/account') && currentTrip.name && pathname !== '/support') {
            tripName = currentTrip.name
        }

        if (pathname.includes('/preview')) {
            tripName = `${currentTrip.name} Preview`
            backText = 'Back to trip'
            backPath = `/trips/${currentTrip._id}/edit`
        }

        if (currentUser.isAuthenticated) {
            backText = currentUser.words ? currentUser.words.whatPlural : 'Trips'
            loggedInLinks = (
                <div className={classes.buttons}>
                    <NavLink
                        activeClassName="active"
                        to="/trips"
                        name="/trips"
                    >
                        <Fab
                            color={tripsColor}
                            className={classes.navButton}
                            variant="extended"
                            disableTouchRipple
                            id="trips-nav">
                            {currentUser.words ? currentUser.words.whatPlural : 'Trips'}
                        </Fab>
                    </NavLink>
                    <NavLink
                        activeClassName="active"
                        to="/travelers"
                        name="/travelers"
                    >
                        <Fab
                            color={travelersColor}
                            className={classes.navButton}
                            variant="extended"
                            disableTouchRipple
                            id="travelers-nav"
                            style={{ marginLeft: 24 }}>
                            {currentUser.words ? currentUser.words.whoPlural : 'Travelers'}
                        </Fab>
                    </NavLink>
                </div>
            )
            linkTo = '/trips'
        }

        return (
            <nav className={classes.navbar} >
                {!tripName ?
                    <div className={classes.navbarLeft}>
                        <Link to={linkTo} >
                            <img
                                src="/left.png"
                                className={classes.logo}>
                            </img>
                        </Link>
                        {!tripName && loggedInLinks}
                    </div> :
                    <>
                        <NavLink
                            to={backPath}
                            name="/trips"
                            className={classes.backButtonContainer}
                        >
                            <ArrowBackIosIcon className={classes.backArrow} />
                            <span className={classes.backText}>{backText}</span>
                        </NavLink>
                    </>}

                <Typography variant="h5" className={classes.tripName}>{tripName}</Typography>
                {currentUser.isAuthenticated &&
                    <div className={classes.navbarRight}>
                        <span className={classes.userName}>{currentUser.name}</span>
                        <MenuListComposition
                            logout={this.props.logout}
                            history={this.props.history}
                            words={currentUser.words ? currentUser.words : { whatPlural: 'Trips', whoPlural: 'Travelers' }}
                        >
                        </MenuListComposition>
                    </div>
                }
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
        zIndex: 15
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    icon: {
        color: 'white',
        backgroundColor: theme.palette.secondary.main,
        padding: 0,
        marginLeft: theme.spacing(2),
        '&:hover': {
            backgroundColor: '#5A8DAA'
        }
    }
}))

function MenuListComposition({ logout, history, words }) {
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
    const trips = event => {
        history.push(`/trips`)
        handleClose(event)
    }
    const travelers = event => {
        history.push(`/travelers`)
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
                <IconButton className={classes.icon} onClick={handleToggle} ref={anchorRef}>
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
                                        <MenuItem onClick={trips}>{words.whatPlural}</MenuItem>
                                        <MenuItem onClick={travelers}>{words.whoPlural}</MenuItem>
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
    )(withStyles(styles)(Navbar))
)
