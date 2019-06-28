import React, { Component } from 'react'
import moment from 'moment'

class DayList extends Component {

    constructor(props) {
        super(props)
    }
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
            <select className='' value={currentDay} onChange={this.handleChange}>
                {dayList}
            </select>
        )
    }
}

export default DayList
