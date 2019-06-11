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
            <div className="card border border-primary mx-2" style={{minWidth: '150px', maxWidth: '200px'}}>
                <div className="card-body">
                    <h5 className="card-title mb-2 text-muted">
                        <Moment date={date} format="MMM" />
                    </h5>
                    <h4 className="card-title mb-2 text-primary">
                        <Moment date={date} format="Do" />
                    </h4>
                    <hr />
                    <h5 className="card-title text-muted">
                        <Moment date={this.props.date} format="dddd" />{' '}
                    </h5>
                    <i className="fa fa-trash float-right" aria-hidden="true" onClick={this.deleteDay} />
                </div>
            </div>
        ) : (
            <div className="card mx-2" style={{minWidth: '150px', maxWidth: '200px'}} onClick={this.onDayClick}>
                <div className="card-body">
                    <h4 className="card-title mb-2 text-muted">
                        <Moment date={date} format="MMM" />
                    </h4>
                    <h4 className="card-title mb-2 text-primary">
                        <Moment date={date} format="Do" />
                    </h4>
                    <hr />
                    <h5 className="card-title text-muted">
                        <Moment date={this.props.date} format="dddd" />{' '}
                    </h5>
                </div>
            </div>
        )

        return (
            <>
                {day}
            </>
        )
    }
}

export default Day
