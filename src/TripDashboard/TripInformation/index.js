import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import ReactGA from 'react-ga'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import LeftModal from '../../util/otherComponents/LeftModal'
import Resources from './Documents/Resources'
import Contacts from './Contacts/Contacts'
import TripDates from './TripDates/TripDates'
import Coordinators from './Coordinators/Coordinators'
import TripNameForm from '../../Forms/TripNameForm'
import Snack from '../../util/otherComponents/Snack'
import LeftFab from '../../util/otherComponents/LeftFab'
import { withStyles } from '@material-ui/core'
import sizes from '../../styles/sizes'
import Fade from '@material-ui/core/Fade'

const styles = theme => ({
    tripProfile: {
        display: "flex",
        alignItems: "center"
    },
    editTripProfileBtn: {
        marginLeft: theme.spacing(4)
    },
    tripNameDescription: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    tripDescription: {
        paddingRight: theme.spacing(50),
        marginTop: theme.spacing(2),
        [sizes.down("md")]: {
            paddingRight: theme.spacing(2)
        },
    },
    divider: {
        width: '30vw',
        backgroundColor: theme.palette.grey["A700"],
        height: 2
    },
    tripName: {
        fontFamily: 'Roboto',
        fontWeight: '500',
        fontSize: '30px',
        color: theme.palette.primary.main,
        letterSpacing: 0,
    }
})

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/tripinformation')
}

class TripInformation extends Component {
    currentTripId = this.props.currentTrip._id
    currentUserId = this.props.currentUser._id

    state = {
        snack: {
            show: false,
            variant: '',
            message: ''
        },
        isEditTripNameModalOpen: false
    }

    constructor(props) {
        super(props)
        if (process.env.NODE_ENV === 'production') {
            initializeReactGA()
        }
    }

    closeSnack = () => this.setState({ snack: { show: false } })
    toggleModal = () => this.setState({ isEditTripNameModalOpen: !this.state.isEditTripNameModalOpen })

    updateTrip = async updateObject => {
        try {
            const updatedTrip = await apiCall(
                'put',
                `/api/trips/${this.currentTripId}`,
                updateObject, true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            this.props.setCurrentTrip(updatedTrip)
        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }
    }

    render() {
        const { name, dateStart, description } = this.props.currentTrip
        const { classes, currentUser } = this.props
        const { isEditTripNameModalOpen, snack } = this.state

        return (
            <>
                <div>
                    <div>
                        <div className={classes.tripProfile}>
                            <Typography variant="h2">{currentUser.words ? currentUser.words.what : 'Trip'} Profile</Typography>
                            <div className={classes.editTripProfileBtn}>
                                <LeftFab id="tripInfo-name-button"
                                    onClick={this.toggleModal}
                                >Edit
                            </LeftFab>
                            </div>
                        </div>
                        <Fade in={true} timeout={800}>
                            <div className={classes.tripNameDescription}>
                                <span className={classes.tripName} id="trip-name"> {name} </span>
                                <Divider className={classes.divider}></Divider>
                                <Typography variant="subtitle1" id="trip-description" className={classes.tripDescription} >{description} </Typography>
                            </div>
                        </Fade>
                    </div>
                    <Coordinators tripId={this.currentTripId} currentUser={currentUser}></Coordinators>
                    <TripDates tripId={this.currentTripId} dateStart={dateStart}></TripDates>
                    <Resources tripId={this.currentTripId}></Resources>
                    <Contacts tripId={this.currentTripId}></Contacts>
                </div>

                <>
                    {isEditTripNameModalOpen && <LeftModal
                        closeModal={this.toggleModal}
                        title='Edit profile'
                        submit={this.updateTrip}
                        form={TripNameForm}
                        name={name}
                        description={description}
                    />}
                    {snack.show && <Snack open={snack.show} message={snack.message} variant={snack.variant} onClose={this.closeSnack}></Snack>}
                </>
            </>
        )
    }
}

export default withStyles(styles)(TripInformation)
