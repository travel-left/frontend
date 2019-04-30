import React, { Component } from "react"
import { apiCall } from "../../../services/api";

class Event extends Component {

    state = {
        show: true
    }

    constructor(props) {
        super(props)
    }

    deleteEvent = () => {
        console.log('hello')
        apiCall('delete', `/api/itinerary/event/${this.props.event._id}`)
        .then(() => {

        })
        .catch(err => {
            console.log(err)
        })
        this.setState({
            show: false
        })

    }

    render() {
        let { event } = this.props
        let iconString = ''
        switch (event.category) {
            case 'lodging':
                iconString = 'fa-bed'
                break;  
            case 'transportation':
                iconString = 'fa-plane'
                break;  
            case 'event':
                iconString = 'fa-bookmark'
                break;  
            case 'flight':
                iconString = 'fa-plane'
                break;  
        
            default:
                break;
        }
        return (
            <div className={"card event-tile " + (this.state.show ? 'show' : 'd-none')} style={{ width: '100%' }} >
                <div class="card-body event">
                    <h5 class="card-title"><strong> { event.title }</strong><i class={`fa ${iconString} pull-right`} aria-hidden="true"></i></h5>
                    <h6 class="card-title pull-right"><strong></strong></h6>
                    <h6 class="card-subtitle mb-2 text-muted"><i class="fa fa-clock-o" aria-hidden="true"></i> {event.timeStart} - {event.timeEnd}</h6>
                    <p class="card-text">{event.summary}</p>
                    <a href={event.link} class="card-link">{event.linkText}</a>
                    <i class="fa fa-trash fa-2x float-right" aria-hidden="true" onClick={this.deleteEvent}></i>
                    <i class="fa fa-pencil-square-o fa-2x float-right" aria-hidden="true"></i>
                </div>
            </div>
        )
    }
}

export default Event