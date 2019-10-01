import React, { Component } from 'react'
import UpdateEventForm from './UpdateEventForm'
import UpdateTripDateForm from '../../TripInformation/TripDates/UpdateTripDateForm'
import Map from './Map'
import { getIcon } from '../../../util/file-icons'
import NewEditEventForm from './NewEditEventForm'
import moment from 'moment'

class Event extends Component {
    state = {
        showMap: false,
        showUpdateForm: false
    }

    remove = () => {
        this.props.removeEvent(this.props.event._id)
    }

    update = updateObject => {
        this.props.updateEvent(this.props.event._id, updateObject)
    }

    showMap = () => {
        this.setState({ showMap: true })
    }

    openModal = () => {
        this.setState({ showUpdateForm: true })
    }

    closeModal = () => {
        this.setState({ showUpdateForm: false })
    }

    render() {
        let { event } = this.props

        let iconString, color = ''
        switch (event.type) {
            case 'LODGING':
                iconString = 'fa-bed'
                color = '#FEA600'
                break
            case 'TRANSPORTATION':
                iconString = 'fa-car'
                color = '#BF9DD9'
                break
            case 'EVENT':
                iconString = 'fa-calendar-check'
                color = '#83C9F4'
                break
            case 'FLIGHT':
                iconString = 'fa-plane'
                color = '#CCAA55'
                break
            case 'TRAVEL':
                iconString = 'fas fa-suitcase'
                color = '#29CB97'
                break
            case 'PAPERWORK':
                iconString = 'fas fa-sticky-note'
                color = '#FEC400'
                break
            case 'MONEY':
                iconString = 'fas fa-money-bill-alt'
                color = '#B558F6'
                break
            case 'OTHER':
                iconString = 'fas fa-calendar-minus'
                color = '#FFABAA'
                break
            default:
                break
        }

        const updater = !event.share ? (
            <span
                onClick={this.openModal}
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
        const map = event.coordinates && this.state.showUpdateForm ? <Map coordinates={event.coordinates} />
            :
            <div className="text-center">
                <button className="btn btn-lg btn-secondary my-3" style={{ color: '#FFFFFF' }} onClick={this.showMap}> SHOW MAP </button>
            </div>
        const name = event.name
        const address = (
            <p className="card-text text-muted">{'Address: ' + event.address}</p>
        )

        const documents = event.documents.map((d, i) => (
            <div className="col-md-12 Document-card my-3 px-0">
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

        let links = event.links.map(link => <a href={link} className="Event-link">{link}</a>)

        return (
            <div>
                {this.state.showUpdateForm && <NewEditEventForm isOpened={true} close={this.closeModal} submit={this.update} remove={this.props.remove} trip={this.props.trip} event={this.props.event} />}
                <div className="Events-event-card py-4 px-5 my-3 animated fadeIn">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between px-3">
                            <span className="Document-title">
                                <span className='d-flex justify-content-center align-items-center' style={{
                                    position: 'absolute', right: '101%', backgroundColor: color, borderRadius: '50%', height: '40px', width: '40px'
                                }}>
                                    <i className={`fa ${iconString}`} style={{
                                        color: '#FFFFFF',
                                        fontSize: '16px'
                                    }} />
                                </span>

                                {name}
                            </span>
                            {updater}
                        </div>
                        <div className="col-12 d-flex px-0">
                            <div className="col-md-6 d-flex flex-column">
                                <span className="my-3 Events-event-date" style={{ color: color }}>
                                    {time}
                                </span>
                                <p className="Document-description">{event.description}</p>
                                {links}
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex justify-content-center align-items-center mt-3 Events-event-address">
                                    {address}
                                </div>
                                {address && map}
                            </div>
                        </div>
                        <div className="col-12 row mx-0 mt-2">
                            {documents}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Event
