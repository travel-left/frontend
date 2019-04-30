import React, { Component } from "react"

class ItineraryList extends Component {

    state = {
        currentItinerary: this.props.currentItinerary
    }

    handleChange = e => {
        console.log(e.target.value)
        this.setState({currentItinerary: e.target.value})
        this.props.submit(e.target.value)
    }

    render(){
        let list = this.props.itineraries.map(i => (<option value={i._id}>{i.title}</option>))

        return (
            <div className='itinerary-list'>
                <select value={this.state.currentItinerary} class="custom-select" onChange={this.handleChange}>
                    {list}
                </select>
            </div>
        )
    }

}

export default ItineraryList