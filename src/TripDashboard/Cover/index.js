import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import Fab from '@material-ui/core/Fab'
import NewShareTrip from '../../util/otherComponents/NewShareTrip'
import SendIcon from '@material-ui/icons/Send'
import TripStatus from '../../util/otherComponents/TripStatus'
import LeftModal from '../../util/otherComponents/LeftModal'
import ChangeTripStatusForm from '../../Forms/ChangeTripStatusForm'
import ChangeTripDatesForm from '../../Forms/ChangeTripDatesForm'
import ChangeCoverPhotoForm from '../../Forms/ChangeCoverPhotoForm'
import moment from 'moment'
import Snack from '../../util/otherComponents/Snack'
import LeftFab from '../../util/otherComponents/LeftFab'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core'
import sizes from '../../styles/sizes'

const styles = theme => ({
    coverPhoto: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        boxShadow: "0px 2px 1px - 1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        backgroundImage: props => `url(${props.currentTrip.image})`,
        height: theme.spacing(24),
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderRadius: '0px 0px 4px 4px',
        padding: 16,
        [sizes.down("md")]: {
            height: theme.spacing(28),
        }
    },
    topRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(4)
    },
    bottomRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [sizes.down("md")]: {
            flexDirection: 'column',
            alignItems: 'start'
        }

    },
    travelerCount: {
        fontWeight: '500',
        fontFamily: 'roboto',
        fontSize: 12,
        color: '#FFFFFF',
        minWidth: 48,
        backgroundColor: '#475561',
        height: 28,
        textTransform: 'uppercase'
    },
    dates: {
        [sizes.down("md")]: {
            margin: theme.spacing(1, 0)
        }
    }
})

class Cover extends Component {
    tripId = this.props.currentTrip._id
    state = {
        travelers: [],
        snack: {
            show: false,
            variant: '',
            message: ''
        },
        isShareTripOpen: false,
        isTripStatusOpen: false,
        isTripDatesOpen: false,
        isChangeCoverOpen: false
    }

    constructor(props) {
        super(props)
        this.getAndSetTravelers()
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))
    closeModal = modal => (this.setState({ [modal]: false }))
    openModal = modal => (this.setState({ [modal]: true }))

    updateTrip = async updateObject => {
        try {
            const data = await apiCall(
                'put',
                `/api/trips/${this.tripId}`,
                updateObject, true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            this.props.setCurrentTrip(data)
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

    copiedLink = () => {
        this.setState({
            snack: {
                show: true,
                variant: 'success',
                message: 'Copied!'
            }
        })
    }

    getAndSetTravelers = async () => {
        const travelers = await apiCall(
            'get',
            `/api/trips/${this.tripId}/travelers`
        )
        this.setState({
            travelers
        })
    }

    textSelectedTravelers = async (text, phones) => {
        try {
            await apiCall('post', '/api/communicate/text', {
                body: text, phones
            }, true)
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
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

    emailSelectedTravelers = async (subject, body, emails) => {
        try {
            await apiCall('post', '/api/communicate/email', {
                subject,
                body,
                emails
            })
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
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
        const currentTrip = this.props.currentTrip
        const invited = this.state.travelers.length
        const confirmed = this.state.travelers.filter(t => t.status !== 'INVITED').length
        const { classes } = this.props
        return (
            <div
                className={classes.coverPhoto}
            >
                <div className={classes.topRow}>
                    <TripStatus onClick={() => this.openModal('isTripStatusOpen')} status={currentTrip.status} fab></TripStatus>
                    {this.state.isTripStatusOpen && <LeftModal
                        isOpen={this.state.isTripStatusOpen}
                        toggleModal={() => this.closeModal('isTripStatusOpen')}
                        title='Change trip status'
                        form={ChangeTripStatusForm}
                        submit={this.updateTrip}
                        status={currentTrip.status}
                    />}
                    <div className="">
                        <Fab onClick={() => this.openModal('isShareTripOpen')} color="primary" >
                            <SendIcon style={{ color: 'white' }} fontSize="large" />
                        </Fab>
                        {this.state.isShareTripOpen && <LeftModal
                            isOpen={this.state.isShareTripOpen}
                            toggleModal={() => this.closeModal('isShareTripOpen')}
                            title='Share trip'
                            tripId={currentTrip._id}
                            submit={this.copiedLink}
                            form={NewShareTrip}
                        />}
                    </div>
                </div>
                <div className={classes.bottomRow} >
                    <Chip
                        label={
                            `${invited} Invited
                                ${confirmed} Confirmed`
                        }
                        className={classes.travelerCount}
                    >
                    </Chip>
                    <div className={classes.dates}>
                        <LeftFab
                            onClick={() => this.openModal('isTripDatesOpen')}
                            id="tripDates"
                        >
                            {`${moment(currentTrip.dateStart.split('T')[0]).format('MMM DD')} - 
                        ${moment(currentTrip.dateEnd.split('T')[0]).format('MMM DD')}`}
                        </LeftFab>
                    </div>
                    {this.state.isTripDatesOpen && <LeftModal
                        isOpen={this.state.isTripDatesOpen}
                        toggleModal={() => this.closeModal('isTripDatesOpen')}
                        title='Change trip dates'
                        form={ChangeTripDatesForm}
                        submit={this.updateTrip}
                        dateStart={moment(currentTrip.dateStart).format('MM-DD-YYYY')}
                        dateEnd={moment(currentTrip.dateEnd).format('MM-DD-YYYY')}
                    />}

                    <LeftFab
                        onClick={() => this.openModal('isChangeCoverOpen')}
                    >
                        Change Cover Photo
                    </LeftFab>

                    {this.state.isChangeCoverOpen && <LeftModal
                        isOpen={this.state.isChangeCoverOpen}
                        toggleModal={() => this.closeModal('isChangeCoverOpen')}
                        title='Change cover photo'
                        form={ChangeCoverPhotoForm}
                        submit={this.updateTrip}
                    />}
                </div>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}

export default withStyles(styles)(Cover)
