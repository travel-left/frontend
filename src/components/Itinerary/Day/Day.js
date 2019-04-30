import React, { Component } from "react"
import Moment from 'react-moment'
import { apiCall } from '../../../services/api';

// An event has a title, a date, a time start, a time end, a summary, a picture, a link, and link text
class Day extends Component {

    state = {
        show: true
    }

    constructor(props){
        super(props)
    }

    onTileClick = index => {
        this.props.setCurrentDay(index)
    }

    deleteDay = () => {
        console.log('hello')
        apiCall('delete', `/api/itinerary/day/${this.props.dayId}`)
        .then(() => {
            this.props.hideEvents()
        })
        .catch(err => {
            console.log(err)
        })
        this.setState({
            show: false
        })

    }

    render(){
        return (
            <div className={this.state.show ? 'show' : 'd-none'}>
                { this.props.isCurrentDay ? 
                    <div class="card day selected" style={{width: 'auto'}}>
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted"><Moment date={this.props.date} format="MMM Do"/></h6>
                            <h5 class="card-title"><Moment date={this.props.date} format="dddd"/> </h5>
                            <i class="fa fa-trash" aria-hidden="true" onClick={this.deleteDay} style={{ zIndex: 10}}></i>
                            <i class="fa fa-arrow-circle-o-right fa-2x pull-right" aria-hidden="true" ></i>
                        </div>
                    </div> : 
                <div class="card day" style={{width: 'auto'}} onClick={() => this.onTileClick(this.props.dayId)}>
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted"><Moment date={this.props.date} format="MMM Do"/></h6>
                        <h5 class="card-title"><Moment date={this.props.date} format="dddd"/> </h5>
                        <i class="fa fa-arrow-circle-o-right fa-2x pull-right" aria-hidden="true" ></i>
                    </div>
                </div> 
                }
            </div>

        )
    }
}

export default Day