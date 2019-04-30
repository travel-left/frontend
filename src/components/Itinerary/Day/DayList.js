import React, { Component } from "react"
import Day from './Day';

class DayList extends Component {

    constructor(props){
        super(props)
    }


    render(){
        let dayList = this.props.days.map((day, index) => {
            if(day._id === this.props.currentDayId) {
                return ( 
                    <Day key={index} date={day.date} dayId={day._id} setCurrentDay={this.props.setCurrentDay} isCurrentDay={true} hideEvents={this.props.hideEvents}/>
                )
            } else {
                return ( 
                    <Day key={index} date={day.date} dayId={day._id} setCurrentDay={this.props.setCurrentDay} isCurrentDay={false}/>
                )
            }
        })

        return (
            <div>
                <h4>Select a day <i className="fa fa-calendar-o" aria-hidden="true" style={{paddingLeft: '10px'}}></i></h4>
                { dayList }
            </div>

        )
    }

}

export default DayList