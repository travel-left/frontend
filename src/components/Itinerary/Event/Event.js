import React, { Component } from "react"

class Event extends Component {

    constructor(props) {
        super(props)
    }

    deleteEvent = () => {
        this.props.removeEvent(this.props.event._id)
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
            <div className={"card event-tile"} style={{ width: '70%' }} >
                <div class="card-body event">
                    <h5 class="card-title"><strong> { event.title }</strong><i class={`fa ${iconString} pull-right`} aria-hidden="true"></i></h5>
                    <h6 class="card-title pull-right"><strong></strong></h6>
                    <h6 class="card-subtitle mb-2 text-muted"><i class="fa fa-clock-o" aria-hidden="true"></i> {event.timeStart} - {event.timeEnd}</h6>
                    <p class="card-text">{event.summary}</p>
                    <a href={event.link} class="card-link">{event.linkText}</a>
                    <i class="fa fa-trash float-right" aria-hidden="true" onClick={this.deleteEvent}></i>
                    {/* <i class="fa fa-pencil-square-o fa-2x float-right" aria-hidden="true"></i> */}
                </div>
            </div>
        )
    }
}

export default Event