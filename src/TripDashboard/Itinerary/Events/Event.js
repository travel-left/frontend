import React, { Component } from 'react'
import Map from './Map'
import { getIcon } from '../../../util/file-icons'
import moment from 'moment'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import LeftModal from '../../../util/otherComponents/LeftModal'
import EventForm from '../../../Forms/EventForm'
import LeftFab from '../../../util/otherComponents/LeftFab'

class Event extends Component {
    state = {
        showMap: false,
        showUpdateForm: false,
        isOpen: false
    }

    remove = () => {
        this.props.removeEvent(this.props.event._id)
        this.toggleModal()
    }

    update = updateObject => {
        this.props.updateEvent(this.props.event._id, updateObject)
    }

    showMap = () => {
        this.setState({ showMap: true })
    }

    toggleModal = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }))
    }

    render() {
        const { event } = this.props

        const icon = setIcon(event.type)
        const time = `${moment(event.start).format('h:mm a')} - ${moment(event.end).format('h:mm a')}`
        const address = <p className="card-text text-muted text-center">{event.address}</p>
        const map = event.coordinates && <>
            <Map coordinates={event.coordinates} />
            <Typography variant="subtitle1">
                <a href={`https://maps.google.com/?q=${event.coordinates.lat},${event.coordinates.long}`} target="_blank">                        {address} </a>
            </Typography>
        </>
        const name = event.name


        const documents = event.documents.map((d, i) => (
            <Card className='d-flex flex-row justify-content-between' style={{ borderRadius: 3, marginTop: 16, marginBottom: 16 }}>
                <div className="Document-icon d-flex justify-content-center align-items-center" style={{ width: 80, height: 80 }}>
                    <a
                        className="hover"
                        href={d.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        download>
                        <img
                            src={getIcon(d.link)}
                            alt=""
                            className='Document-image'
                            style={{ objectFit: 'cover' }}
                        />
                    </a>
                </div>
                <div className="card-body d-flex flex-column justify-content-end">
                    <a
                        className="hover Document-open-text"
                        href={d.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Typography variant="caption">{d.name.substring(0, 25)}</Typography>
                    </a>
                </div>
            </Card>
        ))

        let links = event.links.map(link => <a href={link} target="_blank" className="d-block" style={{ padding: 4 }}>{link}</a>)
        let flight = `Flight: ${event.airline}${event.flightNumber} from ${event.departureAirportCode} to ${event.arrivalAirportCode}`
        return (
            <Card style={{ padding: 16, marginTop: 16, marginBottom: 16 }}>
                <div className="d-flex justify-content-between">
                    <div className='d-flex align-items-center'>
                        <span className='d-flex justify-content-center align-items-center' style={{
                            backgroundColor: icon.color, borderRadius: '50%', height: 40, width: 40, marginRight: 16
                        }}>
                            <i className={`fa ${icon.string}`} style={{ color: '#FFFFFF', fontSize: '16px' }} />
                        </span>
                        <Typography variant="h2" className="event-title">
                            {event.type === 'FLIGHT' && event.airline ? flight : name}
                        </Typography>
                    </div>
                    {!this.props.share &&
                        <LeftFab id="edit-event-button" text="EDIT" onClick={this.toggleModal} fab />}
                    {
                        this.state.isOpen && <LeftModal
                            isOpen={this.state.isOpen}
                            toggleModal={this.toggleModal}
                            title='Edit event'
                            {...event}
                            submit={this.update}
                            remove={this.remove}
                            form={EventForm}
                            selectedDocuments={event.documents.map(doc => doc._id)}
                            documents={this.props.documents}
                        />
                    }
                </div>
                <Typography variant="subtitle2" style={{ color: icon.color, paddingTop: 16 }}> {time}</Typography>
                <div className="d-flex flex-wrap justify-content-between">
                    <Grid item xs={12} sm={6} md={6}>
                        <Typography variant="subtitle1" style={{ paddingTop: 16 }}>
                            {event.description}
                        </Typography>
                        <div style={{ marginTop: 16, marginBottom: 16 }}>
                            {links}
                        </div>
                        {documents}
                    </Grid>
                    <Grid item xs={0} sm={5} gitmd={5} className="">
                        {map}
                    </Grid>
                </div>
            </Card >
        )
    }
}

export default Event

function setIcon(eventType) {
    let icon = {
        string: '',
        color: ''
    }
    switch (eventType) {
        case 'LODGING':
            icon.string = 'fa-bed'
            icon.color = '#475561'
            break
        case 'TRANSPORTATION':
            icon.string = 'fa-car'
            icon.color = '#83C9F4'
            break
        case 'EVENT':
            icon.string = 'fa-calendar-check'
            icon.color = '#0A58CE'
            break
        case 'FLIGHT':
            icon.string = 'fa-plane'
            icon.color = '#FFAA31'
            break
        default:
            break
    }

    return icon
}