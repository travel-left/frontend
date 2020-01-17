import React, { Component } from 'react'
import { apiCall } from '../../../util/api'
import Fab from '@material-ui/core/Fab'
import NewShareTrip from '../../../util/otherComponents/NewShareTrip'
import SendIcon from '@material-ui/icons/Send'
import TripStatus from '../../../util/otherComponents/TripStatus'
import LeftModal from '../../../util/otherComponents/LeftModal'
import ChangeTripStatusForm from '../../../Forms/ChangeTripStatusForm'
import ChangeTripDatesForm from '../../../Forms/ChangeTripDatesForm'
import ChangeCoverPhotoForm from '../../../Forms/ChangeCoverPhotoForm'
import TripNameForm from '../../../Forms/TripNameForm'
import Moment from 'react-moment'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'
import Snack from '../../../util/otherComponents/Snack'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'

class TripProfile extends Component {
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
        isChangeCoverOpen: false,
        isEditTripNameModalOpen: false
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
        let currentTrip = this.props.currentTrip
        let invited = this.state.travelers.length
        let confirmed = this.state.travelers.filter(t => t.status !== 'INVITED').length

        return (
            <>

                <Grid container md={12} className="d-flex flex-column" >
                    <Card style={{ padding: 16, minHeight: 200, marginTop: 16 }} className="d-flex flex-column justify-content-between">
                        <div className="d-flex justify-content-between align-items-center">
                            <Typography variant="h5" color="primary" onClick={() => this.openModal('isEditTripNameModalOpen')} >{currentTrip.name}</Typography>
                            <div>
                                <Typography variant="h1" color="primary" style={{ display: 'inline', color: '#79828B' }}>
                                    <Moment date={currentTrip.dateStart.split('T')[0]} format="MMMM DD" />{' - '}
                                </Typography>
                                <Typography variant="h1" color="primary" style={{ display: 'inline', color: '#79828B' }}>
                                    <Moment date={currentTrip.dateEnd.split('T')[0]} format="MMMM DD" />
                                </Typography>
                            </div>
                            <TripStatus onClick={() => this.openModal('isTripStatusOpen')} status={currentTrip.status} fab></TripStatus>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <Typography variant="subtitle1" style={{ paddingRight: 128 }} >{currentTrip.description}</Typography>
                            <div style={{ marginTop: 16, marginBottom: 16 }}>
                                <Fab onClick={() => this.openModal('isShareTripOpen')} color="primary" className="share-trip-button">
                                    <SendIcon style={{ color: 'white' }} fontSize="large" />
                                </Fab>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">

                            <div>
                                <Typography variant="h1" style={{ display: 'inline', color: "#96DC4F" }}>{invited} Invited</Typography>{' '}
                                <Typography variant="h1" color="secondary" style={{ display: 'inline', marginLeft: 16 }}>{confirmed} Confirmed</Typography>
                            </div>
                            <Fab className='tripProfile-edit-button' onClick={() => this.openModal('')} variant="extended" style={{ width: 54, height: 25, backgroundColor: '#475561', fontSize: 12, fontWeight: 600, color: 'white' }}>
                                EDIT
                        </Fab>
                        </div>
                    </Card>
                </Grid>


                {
                    this.state.isShareTripOpen && <LeftModal
                        isOpen={this.state.isShareTripOpen}
                        toggleModal={() => this.closeModal('isShareTripOpen')}
                        title='Share trip'
                        tripId={currentTrip._id}
                        submit={this.copiedLink}
                        form={NewShareTrip}
                    />
                }
                {
                    this.state.isTripStatusOpen && <LeftModal
                        isOpen={this.state.isTripStatusOpen}
                        toggleModal={() => this.closeModal('isTripStatusOpen')}
                        title='Change trip status'
                        form={ChangeTripStatusForm}
                        submit={this.updateTrip}
                        status={currentTrip.status}
                    />
                }
                {
                    this.state.isEditTripNameModalOpen && <LeftModal
                        isOpen={this.state.isEditTripNameModalOpen}
                        toggleModal={() => this.closeModal('isEditTripNameModalOpen')}
                        title='Change trip name'
                        submit={this.updateTrip}
                        form={TripNameForm}
                        name={currentTrip.name}
                    />
                }
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </>
        )
    }
}

export default TripProfile
