import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import './TripInfo.css'
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
import Fab from '@material-ui/core/Fab'

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/tripinformation')
}

export default class TripInformation extends Component {
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
    closeModal = () => this.setState({ isEditTripNameModalOpen: false })
    openModal = () => this.setState({ isEditTripNameModalOpen: true })

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
        let { name, dateStart, description } = this.props.currentTrip

        return (
            <div style={{ paddingLeft: 8, paddingRight: 8 }}>
                <div className="" style={{ marginTop: 16 }}>
                    <div className="d-flex align-items-center">
                        <Typography variant="h2">
                            Trip Profile

                    </Typography>
                        <Fab className='coordinator-edit-button'
                            onClick={this.openModal}
                            variant="extended"
                            style={{ width: 54, height: 25, backgroundColor: '#475561', fontSize: 12, fontWeight: 600, color: 'white', marginLeft: 32 }}>
                            Edit
                        </Fab>
                    </div>
                    <div style={{ marginLeft: 16 }}>
                        <h3 className="text-primary TripInfo-name" style={{ marginTop: 24 }}> {name} </h3>
                        {this.state.isEditTripNameModalOpen && <LeftModal
                            isOpen={this.state.isEditTripNameModalOpen}
                            toggleModal={this.closeModal}
                            title='Edit trip profile'
                            submit={this.updateTrip}
                            form={TripNameForm}
                            name={name}
                            description={description}
                        />}
                        <Divider style={{ width: '30vw', backgroundColor: '#475561', height: 2 }}></Divider>
                        <Typography variant="subtitle1" className="TripInfo-descript" style={{ paddingRight: 128, marginTop: 16 }} >{description} </Typography>
                    </div>
                </div>
                <Coordinators tripId={this.currentTripId} currentUser={this.props.currentUser}></Coordinators>
                <TripDates tripId={this.currentTripId} dateStart={dateStart}></TripDates>
                <Resources tripId={this.currentTripId}></Resources>
                <Contacts tripId={this.currentTripId}></Contacts>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}
