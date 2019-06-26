import React from 'react'
import Day from './Day'

const DayList = ({ dates, days, currentDate, setCurrentDay }) => {
    let dayList = dates.map(date => {
        return date === currentDate ? (
            <Day key={date} date={date} setCurrentDay={setCurrentDay} isCurrentDay={true} />
        ) : (
                <Day key={date} date={date} setCurrentDay={setCurrentDay} isCurrentDay={false} />
            )
    })

    return (
        <div className='d-flex my-4'>
            {dayList}
        </div>
    )
}

export default DayList
