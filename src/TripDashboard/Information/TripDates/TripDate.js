import React, { Component } from 'react'
import TripDateForm from './TripDateForm'
import Moment from 'react-moment'

export default class TripDate extends Component {

    constructor(props) {
        super(props)
    }

    handleDelete = () => {
        this.props.deleteTripDate(this.props._id)
    }

    render() {
        let { name, date, type, editTripDate, _id, deleteTripDate } = this.props
        let icon = {
            string: '',
            color: ''
        }

        switch (type) {
            case 'TRAVEL':
                icon.string = 'fas fa-suitcase fa-2x'
                icon.color = '#29CB97'
                break
            case 'PAPERWORK':
                icon.string = 'fas fa-sticky-note fa-2x '
                icon.color = '#FEC400'
                break
            case 'MONEY':
                icon.string = 'fas fa-money-bill-alt fa-2x'
                icon.color = '#B558F6'
                break
            case 'OTHER':
                icon.string = 'fas fa-calendar-minus fa-2x'
                icon.color = '#FFABAA'
                break
            default:
                icon.string = 'fas fa-calendar-minus fa-2x'
                icon.color = '#FFABAA'
                break
        }
        return (
            <div className="card-body px-0">
                <div className="row no-gutters d-flex justify-space-around">
                    <div className="col-md-3 d-flex flex-row align-items-center justify-content-center">
                        <i className={icon.string} style={{ color: icon.color }} />
                    </div>
                    <div className="col-md-7 d-flex flex-column justify-content-center">
                        <p className="text-bold my-1">{name}</p>
                        <p className="my-1">
                            <small className="text-muted">
                                <Moment date={date} format="MMMM DD" />
                            </small>
                        </p>
                    </div>
                    <div className="col-md-2 d-flex d-row align-items-center flex-column justify-content-around">
                        <TripDateForm formType="edit" name={name} date={date} type={type} submit={editTripDate} />
                        <button class="btn btn-danger" onClick={this.handleDelete}>delete</button>
                    </div>
                </div>
            </div>
        )
    }
}
