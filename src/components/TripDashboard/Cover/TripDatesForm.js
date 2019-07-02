import React, { Component } from 'react'
import Moment from 'react-moment'

class TripDatesForm extends Component {
    state = {
        dateStart: this.props.dateStart.split('T')[0],
        dateEnd: this.props.dateEnd.split('T')[0]
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.submit(this.state)
    }

    render() {
        let { dateStart, dateEnd } = this.state

        return (
            <>
                <h5 className="text-light hover" data-toggle="modal" data-target="#newDates">
                    <Moment date={dateStart} format="MMMM DD" /> {' - '} <Moment date={dateEnd} format="MMMM DD" /> <i class="far fa-calendar-alt"></i>
                </h5>
                <div class="modal fade" id="newDates" tabindex="-1" role="dialog" aria-labelledby="addnewDatesModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addnewDatesModal">
                                    Trip dates
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-10">
                                            <label htmlFor="dateStart">Start date</label>
                                            <input name="dateStart" className="form-control col-8" type="date" value={dateStart} onChange={this.handleChange} />
                                            <label htmlFor="dateEnd">End date</label>
                                            <input name="dateEnd" className="form-control col-8" type="date" value={dateEnd} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button onClick={this.handleSubmit} type="button" class="btn btn-primary" data-dismiss="modal">
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default TripDatesForm
