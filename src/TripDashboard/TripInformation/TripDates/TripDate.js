import React, { Component } from 'react'
import UpdateTripDateForm from './UpdateTripDateForm'
import moment from 'moment'
import './TripDate.css'

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
            <div className="row align-items-center justify-content-between py-2">
                {/* <i className={icon.string} style={{ color: icon.color, width: '30px' }} /> */}
                <div className="d-flex flex-column justify-content-center align-items-start">
                    <span className="" style={{
                        fontFamily: 'Roboto',
                        fontSize: '14px',
                        color: '#31394D',
                        letterSpacing: 0
                    }}>{name}</span>
                    <span className="" style={{
                        fontFamily: 'Roboto',
                        fontSize: '12px',
                        color: '#748AA1',
                        letterSpacing: 0
                    }}>{moment(dateWithoutTimeorTZ).format('MMMM DD')}</span>
                </div>
                <UpdateTripDateForm
                    {...this.props}
                    submit={this.handleUpdate}
                    remove={this.handleDelete}
                />
            </div>
        )
    }
}
