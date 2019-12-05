import React, { Component } from 'react'
import Map from './Map'
import { getIcon } from '../../../util/file-icons'
import moment from 'moment'
import NewEventForm from '../../../Forms/NewEventForm'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'

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

        const updateButton = !event.share ? (
            <span
                onClick={this.toggleModal}
                className='text-uppercase d-flex align-items-center justify-content-center hover'
                style={{
                    fontWeight: '500',
                    fontFamily: 'roboto',
                    fontSize: '12px',
                    padding: '.5rem .8rem',
                    width: '54px',
                    height: '25px',
                    color: '#FFFFFF',
                    backgroundColor: '#475561',
                    textAlign: 'center',
                    borderRadius: '16px'
                }}
            >
                EDIT
            </span>
        ) : null

        const time = `${moment(event.start).format('h:mm a')} - ${moment(event.end).format('h:mm a')}`
        const map = event.coordinates && <Map coordinates={event.coordinates} />
        const name = event.name
        const address = <p className="card-text text-muted text-center">{event.address}</p>

        const documents = event.documents.map((d, i) => (
            <Card className='d-flex flex-row justify-content-between' style={{ borderRadius: 3, marginTop: 16 }}>
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

        let links = event.links.map(link => <a href={link} target="_blank" className="Event-link">{link}</a>)
        let airports = event.arrivalAirportCode ? `${event.arrivalAirportCode} - ${event.departureAirportCode} Terminal ${event.departureTerminal} Gate ${event.departureGate} Flight ${event.flightNumber}` : null
        return (
            <Card style={{ padding: 16 }}>
                <div className="d-flex justify-content-between">
                    <div className='d-flex align-items-center'>
                        <span className='d-flex justify-content-center align-items-center' style={{
                            backgroundColor: icon.color, borderRadius: '50%', height: 40, width: 40, marginRight: 16
                        }}>
                            <i className={`fa ${icon.string}`} style={{ color: '#FFFFFF', fontSize: '16px' }} />
                        </span>
                        <Typography variant="h2">
                            {name} {airports}</Typography>
                    </div>
                    {updateButton}
                    {this.state.isOpen &&
                        <NewEventForm
                            submit={this.update}
                            remove={this.remove}
                            trip={this.props.trip}
                            toggleModal={this.toggleModal}
                            isOpen={this.state.isOpen}
                            event={{
                                ...event,
                                date: new Date(event.start),
                                start: moment(event.start).format('HH:mm'),
                                end: moment(event.end).format('HH:mm'),
                                timezone: moment.tz.guess()
                            }}
                        />
                    }
                </div>
                <Typography variant="subtitle2" style={{ color: icon.color, paddingTop: 16 }}> {time}</Typography>
                <div className="d-flex justify-content-between">
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" style={{ paddingTop: 16 }}> {event.description}</Typography>
                        <div style={{ marginTop: 16, marginBottom: 16 }}>
                            {links}
                        </div>
                        {documents}
                    </Grid>
                    <Grid item xs={5}>
                        {map}
                        <Typography variant="subtitle1"> {address} </Typography>
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
            icon.color = '#FEA600'
            break
        case 'TRANSPORTATION':
            icon.string = 'fa-car'
            icon.color = '#BF9DD9'
            break
        case 'EVENT':
            icon.string = 'fa-calendar-check'
            icon.color = '#83C9F4'
            break
        case 'FLIGHT':
            icon.string = 'fa-plane'
            icon.color = '#CCAA55'
            break
        case 'TRAVEL':
            icon.string = 'fas fa-suitcase'
            icon.color = '#29CB97'
            break
        case 'PAPERWORK':
            icon.string = 'fas fa-sticky-note'
            icon.color = '#FEC400'
            break
        case 'MONEY':
            icon.string = 'fas fa-money-bill-alt'
            icon.color = '#B558F6'
            break
        case 'OTHER':
            icon.string = 'fas fa-calendar-minus'
            icon.color = '#FFABAA'
            break
        default:
            break
    }

    return icon
}