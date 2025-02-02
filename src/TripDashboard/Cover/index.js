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
        boxShadow: theme.shadows[4],
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
        images: [],
        snack: {
            show: false,
            variant: '',
            message: ''
        },
        modalOpen: ''
    }

    constructor(props) {
        super(props)
        this.getAndSetTravelers()
        this.getOrgPhotos()
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))
    closeModal = () => this.setState({ modalOpen: '' })
    openModal = modal => this.setState({ modalOpen: modal })

    updateTrip = async updateObject => {
        console.log(updateObject)
        try {
            const data = await apiCall(
                'put',
                `/api/trips/${this.tripId}`,
                updateObject
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

    getOrgPhotos = async () => {
        const images = await apiCall(
            'get',
            `/api/organization/${this.props.currentUser.organization}/images`
        )
        this.setState({
            images
        })
    }

    render() {
        const invited = this.state.travelers.length
        const confirmed = this.state.travelers.filter(t => t.status !== 'INVITED').length
        const { classes, currentTrip, currentUser } = this.props
        const { images } = this.state
        return (
            <>
                <div
                    className={classes.coverPhoto}
                    id="cover-photo"
                >
                    <div className={classes.topRow}>
                        <TripStatus onClick={() => this.openModal('tripStatus')} status={currentTrip.status} fab></TripStatus>
                        <div className="">
                            <Fab onClick={() => this.openModal('shareTrip')} color="primary" id="share-trip-button">
                                <SendIcon style={{ color: 'white' }} fontSize="large" />
                            </Fab>
                        </div>
                    </div>
                    <div className={classes.bottomRow} >
                        <Chip label={`${invited} Invited ${confirmed} Confirmed`}
                            className={classes.travelerCount}
                        >
                        </Chip>
                        <div className={classes.dates}>
                            <LeftFab
                                onClick={() => this.openModal('tripDates')}
                                id="tripDates"
                            >
                                {`${moment(currentTrip.dateStart.split('T')[0]).format('MMM DD')} - 
                            ${moment(currentTrip.dateEnd.split('T')[0]).format('MMM DD')}`}
                            </LeftFab>
                        </div>
                        <LeftFab
                            onClick={() => this.openModal('coverPhoto')}
                        >
                            Change Cover Photo
                    </LeftFab>
                    </div>
                </div>

                {/* MODALS */}
                <>
                    {this.state.modalOpen === 'tripStatus' && <LeftModal
                        closeModal={this.closeModal}
                        title='Change status'
                        form={ChangeTripStatusForm}
                        submit={this.updateTrip}
                        status={currentTrip.status}
                    />}
                    {this.state.modalOpen === 'shareTrip' && <LeftModal
                        closeModal={this.closeModal}
                        title={`Share ${currentUser.words ? currentUser.words.what.toLowerCase() : 'Trip'}`}
                        tripId={currentTrip._id}
                        submit={this.copiedLink}
                        words={currentUser.words}
                        form={NewShareTrip}
                    />}
                    {this.state.modalOpen === 'coverPhoto' && <LeftModal
                        closeModal={this.closeModal}
                        title='Change cover photo'
                        images={images}
                        form={ChangeCoverPhotoForm}
                        submit={this.updateTrip}
                    />}
                    {this.state.modalOpen === 'tripDates' && <LeftModal
                        closeModal={this.closeModal}
                        title='Change dates'
                        form={ChangeTripDatesForm}
                        submit={this.updateTrip}
                        dateStart={moment(currentTrip.dateStart).format('MM-DD-YYYY')}
                        dateEnd={moment(currentTrip.dateEnd).format('MM-DD-YYYY')}
                    />}
                    {this.state.snack.show &&
                        <Snack
                            open={this.state.snack.show}
                            message={this.state.snack.message}
                            variant={this.state.snack.variant}
                            onClose={this.closeSnack}
                        >
                        </Snack>
                    }
                </>
            </>
        )
    }
}

export default withStyles(styles)(Cover)
