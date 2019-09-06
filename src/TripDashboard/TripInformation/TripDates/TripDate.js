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
        let icon

        switch (type) {
            case 'TRAVEL':
                icon = <i class="material-icons d-flex justify-content-center align-items-center TripDate-Icon" style={{ backgroundColor: '#29CB97' }}>card_travel</i>
                break
            case 'PAPERWORK':
                icon = <i class="material-icons d-flex justify-content-center align-items-center TripDate-Icon" style={{ backgroundColor: '#FEC400' }}>folder_open</i>
                break
            case 'MONEY':
                icon = <i class="material-icons d-flex justify-content-center align-items-center TripDate-Icon" style={{ backgroundColor: '#B558F6' }}>attach_money</i>
                break
            case 'OTHER':
                icon = <i class="material-icons d-flex justify-content-center align-items-center TripDate-Icon" style={{ backgroundColor: '#FFABAA' }}>calendar_today</i>
                break
            default:
                icon = <i class="material-icons d-flex justify-content-center align-items-center TripDate-Icon" style={{ backgroundColor: '#FFABAA' }}>calendar_today</i>
                break
        }

        const dateWithoutTimeorTZ = date.split('T')[0]

        return (
            <div className="row py-3 align-items-center justify-content-between px-2">
                <div className="d-flex align-items-center justify-content-between">
                    {icon}
                    <div className="d-flex flex-column justify-content-center align-items-start ml-4">
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
