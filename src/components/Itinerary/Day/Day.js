import React, { Component } from 'react'
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
        let { isCurrentDay, date } = this.props
        let day = isCurrentDay ? (
            <div class="card day selected" style={{minWidth: '150px', maxWidth: '200px'}}>
                <div class="card-body">
                    <h4 class="card-title mb-2 text-muted" style={{ display: 'inline-block', marginRight: '.2em' }}>
                        <Moment date={date} format="MMM" />
                    </h4>
                    <h4 class="card-title mb-2" style={{ color: '#0B62D4', display: 'inline-block' }}>
                        <Moment date={date} format="Do" />
                    </h4>
                    <hr />
                    <h5 class="card-title text-muted">
                        <Moment date={this.props.date} format="dddd" />{' '}
                    </h5>
                    <i class="fa fa-trash pull-right" aria-hidden="true" onClick={this.deleteDay} style={{ paddingTop: '30px', fontSize: '14px' }} />
                </div>
            </div>
        ) : (
            <div class="card day" style={{minWidth: '150px', maxWidth: '200px'}} onClick={this.onDayClick}>
                <div class="card-body">
                    <h4 class="card-title mb-2 text-muted" style={{ display: 'inline-block', marginRight: '.2em' }}>
                        <Moment date={date} format="MMM" />
                    </h4>
                    <h4 class="card-title mb-2" style={{ color: '#0B62D4', display: 'inline-block' }}>
                        <Moment date={date} format="Do" />
                    </h4>
                    <hr />
                    <h5 class="card-title text-muted">
                        <Moment date={this.props.date} format="dddd" />{' '}
                    </h5>
                </div>
            </div>
        )

        return (
            <div className="col" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                {day}
            </div>
        )
    }
}

export default Day
