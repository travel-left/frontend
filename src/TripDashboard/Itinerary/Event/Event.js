import React, { Component } from 'react'
import UpdateEventForm from './UpdateEventForm'
import Map from './Map'
import moment from 'moment'
import Image from '../../../util/otherComponents/Image'

class Event extends Component {
    remove = () => {
        this.props.removeEvent(this.props.event._id)
    }

    update = updateObject => {
        this.props.updateEvent(this.props.event._id, updateObject)
    }

    render() {
        let { event } = this.props
        let iconString,
            color = ''
        switch (event.type.toLowerCase()) {
            case 'lodging':
                iconString = 'fa-bed'
                color = '#FEA600'
                break
            case 'transportation':
                iconString = 'fa-plane'
                color = '#BF9DD9'
                break
            case 'event':
                iconString = 'fa-calendar-check'
                color = '#83C9F4'
                break
            case 'flight':
                iconString = 'fa-plane'
                color = '#CCAA55'
                break
            default:
                break
        }

        // const map =
        //     event.coordinates.long && event.coordinates.lat ? (
        //         <div className="row">
        //             <div className="col-12">
        //                 <Map coordinates={event.coordinates} />
        //             </div>
        //         </div>
        //     ) : null

        const address = event.address ? (
            <p className="card-text">{'Address: ' + event.address}</p>
        ) : null

        return (
            <div name={moment(event.dateStart).format('MMM DD')} className="card mb-3 border-0 shadow px-3 py-1 rounded-lg">
                <div className="row">
                    <div className="card-body">
                        <h5 className="card-title">
                            <strong> {event.name}</strong>
                            <i className={`fa ${iconString} float-right`} style={{ color: color }} />
                        </h5>
                        <div className="row">
                            <div className="col-md-6 d-flex flex-column">
                                <h6 className="card-subtitle mb-2" style={{ color: color }}>
                                    {event.dtStart} - {event.dtEnd}
                                </h6>
                                {/* <Image diameter="100px" src={event.image} /> */}
                                <p className="card-text">{event.description}</p>
                                <a href={event.link} className="card-link" target="_blank" rel="noopener noreferrer">
                                    {event.linkDescription}
                                </a>
                                <div className='mt-auto'>
                                    <UpdateEventForm event={this.props.event} submit={this.update} remove={this.remove} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                {/* {map} */}
                                {address}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Event
