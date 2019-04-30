import React, { Component } from "react"
import Event from './Event';

class EventList extends Component {

    constructor(props){
        super(props)

    }

    render(){
        let eventList = this.props.events.map(event => {
            return <Event event={event}/>
        })
        return (
            <div className="event-list">
                <div class="row">
                    { eventList }
                </div>
            </div>
        )
    }
}
    

export default EventList