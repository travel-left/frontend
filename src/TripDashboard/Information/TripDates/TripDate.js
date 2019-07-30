import React, { Component } from 'react'
import UpdateTripDateForm from './UpdateTripDateForm'
import moment from 'moment'

export default class TripDate extends Component {
    handleUpdate = putObject => {
        this.props.update(this.props._id, putObject)
    }

    handleDelete = () => {
        this.props.remove(this.props._id)
    }

    render() {
        let { name, date, type } = this.props
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

        const dateWithoutTimeorTZ = date.split('T')[0]

        return (
            <div className="row my-2">
                <div className="col-md-3 d-flex align-items-center">
                    <i className={icon.string} style={{ color: icon.color }} />
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center">
                    <p className="m-0">{name}</p>
                    <p className="m-0">
                        <small className="text-muted">
                            {moment(dateWithoutTimeorTZ).format('MMM DD')}
                        </small>
                    </p>
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-center">
                    <UpdateTripDateForm
                        {...this.props}
                        submit={this.handleUpdate}
                        remove={this.handleDelete}
                    />
                </div>
            </div>
        )
    }
}
