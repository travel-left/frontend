import React from 'react'
import TripDateForm from './TripDateForm'
import Moment from 'react-moment'

export default function TripDate({ name, date, type, editTripDate }) {
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
                <div className="col-md-7">
                    <p className="text-bold my-1">{name}</p>
                    <p className="my-1">
                        <small className="text-muted">
                            <Moment date={date} format="MMMM DD" />
                        </small>
                    </p>
                </div>
                <div className="col-md-2 d-flex d-row align-items-center justify-content-center hover">
                    <TripDateForm formType="edit" name={name} date={date} type={type} submit={editTripDate} />
                </div>
            </div>
        </div>
    )
}
