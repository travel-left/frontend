import React from 'react'
import Day from './Day'

const DayList = ({ days, currentDate, setCurrentDay }) => {
    let dayList = days.map(day => {
        return day === currentDate ? (
            <Day key={day} date={day} setCurrentDay={setCurrentDay} isCurrentDay={true} />
        ) : (
                <Day key={day} date={day} setCurrentDay={setCurrentDay} isCurrentDay={false} />
            )
    })

    return (
        <div className='d-flex my-4'>
            {dayList}
        </div>
    )
}

export default DayList
