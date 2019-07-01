import React, { Component } from 'react'
import UpdateTripDateForm from './UpdateTripDateForm'
import Moment from 'react-moment'

class TripDate extends Component {

    handleEditTripDate = putObject => {
        this.props.updateTripDate(this.props._id, putObject)
    }

    render() {
        let { name, date, type, _id } = this.props
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
            <div class="card-body px-0">
                <div className="row no-gutters d-flex justify-space-around">
                    <div className="col-md-3 d-flex flex-row align-items-center justify-content-center">
                        <i className={icon.string} style={{ color: icon.color }}></i>
                    </div>
                    <div className="col-md-7">
                        <p className="text-bold my-1">{name}</p>
                        <p className="my-1"><small class="text-muted"><Moment date={date} format="MMMM DD" /></small></p>
                    </div>
                    <div className="col-md-2 d-flex d-row align-items-center justify-content-center hover">
                        <UpdateTripDateForm id={_id} name={name} date={date} type={type} submit={this.handleEditTripDate} />
                    </div>
                </div>
            </div>
        )
    }
}

export default TripDate