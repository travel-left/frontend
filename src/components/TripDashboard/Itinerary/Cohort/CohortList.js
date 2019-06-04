import React, { Component } from 'react'

class CohortList extends Component {
    constructor(props) {
        super(props)
    }

    handleChange = e => {
        this.props.submit(e.target.value)
    }

    render() {
        let { currentItinerary, itineraries } = this.props
        let list = itineraries.map(i => (
            <option value={i._id} key={i._id}>
                {i.title}
            </option>
        ))

        return (
            <div className="itinerary-list">
                <select value={currentItinerary._id} className="custom-select" onChange={this.handleChange}>
                    {list}
                </select>
            </div>
        )
    }
}

export default CohortList
