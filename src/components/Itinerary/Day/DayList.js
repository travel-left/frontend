import React from "react"
import Day from './Day';

const DayList = ({days, currentDayId, removeDay, setCurrentDay}) => {

    let dayList = days.map(day => {
        return day._id === currentDayId
        ?
            <Day key={day._id} date={day.date} dayId={day._id} setCurrentDay={setCurrentDay} isCurrentDay={true} removeDay={removeDay}/>
        :
            <Day key={day._id} date={day.date} dayId={day._id} setCurrentDay={setCurrentDay} isCurrentDay={false} removeDay={removeDay}/>
    })

    return (
        <div>
            <h4>Select a day <i className="fa fa-calendar-o" aria-hidden="true" style={{paddingLeft: '10px'}}></i></h4>
            { dayList }
        </div>

    )
}

export default DayList