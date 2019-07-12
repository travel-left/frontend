import React, { Component } from 'react'
import moment from 'moment'

class DayList extends Component {
    handleChange = e => {
        this.props.submit(e.target.value)
    }

    render() {
        let { days, currentDay } = this.props

        let dayList = days.map(day => (
            <option value={day} key={day}>
                {moment(day).format('MMM DD')}
            </option>
        ))

        return (
            <select className="form-control col-4" value={currentDay} onChange={this.handleChange}>
                {dayList}
            </select>
        )
    }
}

export default DayList
