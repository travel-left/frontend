import React, { Component } from 'react'
import Map from './Map'
import { getIcon } from '../../../util/file-icons'
import moment from 'moment'
import NewEventForm from './NewEventForm'

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

        const mapButton = event.coordinates && !this.state.showMap ? <div className="text-center">
            <button className="btn btn-lg btn-secondary my-3" style={{ color: '#FFFFFF' }} onClick={this.showMap}> SHOW MAP </button>
        </div> : null

        const map = this.state.showMap ? <Map coordinates={event.coordinates} /> : null

        const name = event.name

        const address = <p className="card-text text-muted text-center">{event.address}</p>

        const documents = event.documents.map((d, i) => (
            <div key={i} className="col-md-12 Document-card my-3 px-0">
                <div className="row no-gutters">
                    <div className="Events-document-icon d-flex justify-content-center align-items-center">
                        <a className="hover" href={d.link} target="_blank" rel="noopener noreferrer">
                            <img src={getIcon(d.link)} alt="" className='Events-document-image' style={{ objectFit: 'cover' }} />
                        </a>
                    </div>
                    <div className="d-flex flex-column justify-content-center pl-4 py-3">
                        <span className="Events-document-title">{d.name}</span>
                        <p className="Events-document-description">{d.description}</p>
                        <a className="hover" href={d.link} target="_blank" rel="noopener noreferrer">
                            <span className='Document-open-text pr-1'> Download </span>
                        </a>
                    </div>
                </div>
            </div>
        ))

        let links = event.links.map(link => <a href={link} target="_blank" className="Event-link">{link}</a>)
        let airports = event.arrivalAirportCode ? `${event.arrivalAirportCode} - ${event.departureAirportCode} Terminal ${event.departureTerminal} Gate ${event.departureGate} Flight ${event.flightNumber}` : null
        return (
            <div className="Events-event-card py-4 px-5 my-3 animated fadeIn">
                <div className="row">
                    <div className="col-12 d-flex justify-content-between px-3">
                        <span className="Document-title">
                            <span className='d-flex justify-content-center align-items-center' style={{
                                position: 'absolute', right: '101%', backgroundColor: icon.color, borderRadius: '50%', height: '40px', width: '40px'
                            }}>
                                <i className={`fa ${icon.string}`} style={{ color: '#FFFFFF', fontSize: '16px' }} />
                            </span>

                            {name} {airports}
                        </span>
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
                    <div className="col-12 d-flex px-0">
                        <div className="col-md-6 d-flex flex-column">
                            <span className="my-3 Events-event-date" style={{ color: icon.color }}>
                                {time}
                            </span>
                            <p></p>
                            <p className="Document-description">{event.description}</p>
                            {links}
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex justify-content-center align-items-center mt-3 Events-event-address">
                                {address}
                            </div>
                            {mapButton}
                            {map}
                        </div>
                    </div>
                    <div className="col-12 row mx-0 mt-2">
                        {documents}
                    </div>
                </div>
            </div>
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