import React, { Component } from 'react'
import moment from 'moment'

class DayList extends Component {

    render() {
        let { days, currentDay } = this.props

        let dayList = days.map(day => (
            <a href='#spongebob' key={day} onClick={e => e.preventDefault()} >
                {moment(day).format('MMM DD')}
            </a>
        ))

        return (
            <div>
                <h2>Trip Days</h2>
                <hr />
                {dayList}
            </div>

        )
    }
}

export default DayList
