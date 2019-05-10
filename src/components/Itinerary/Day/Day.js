import React, { Component } from "react"
import Moment from 'react-moment'

class Day extends Component {

    constructor(props) {
        super(props)
    }

    onDayClick = () => {
        this.props.setCurrentDay(this.props.dayId)
    }
    
    deleteDay = () => {
        this.props.removeDay(this.props.dayId)
    }

    render() {
        let {isCurrentDay, date} = this.props
        let day = isCurrentDay
            ? (
                <div class="card day selected" style={{width: 'auto'}}>
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted"><Moment date={date} format="MMM Do"/></h6>
                        <h5 class="card-title"><Moment date={this.props.date} format="dddd"/> </h5>
                        <i class="fa fa-trash" aria-hidden="true" onClick={this.deleteDay} style={{ zIndex: 10}}></i>
                        <i class="fa fa-arrow-circle-o-right fa-2x pull-right" aria-hidden="true" ></i>
                    </div>
                </div>
            )
            : (
                <div class="card day" style={{width: 'auto'}} onClick={this.onDayClick}>
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted"><Moment date={date} format="MMM Do"/></h6>
                        <h5 class="card-title"><Moment date={this.props.date} format="dddd"/> </h5>
                        <i class="fa fa-arrow-circle-o-right fa-2x pull-right" aria-hidden="true" ></i>
                    </div>
                </div> 
            )

        return (
            <div>
                {day}
            </div>
        )
    }
}

export default Day