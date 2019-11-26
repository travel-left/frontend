import React, { Component } from 'react'
import UpdateTripDateForm from './UpdateTripDateForm'
import moment from 'moment'
import './TripDate.css'
import IconButton from '@material-ui/core/IconButton'
import LeftModal from '../../../util/otherComponents/LeftModal'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export default class TripDate extends Component {

    state = {
        isModalOpen: false
    }

    handleUpdate = putObject => {
        this.props.update(this.props._id, putObject)
    }

    handleDelete = () => {
        console.log('hi')
        this.props.remove(this.props._id)
    }

    closeModal = () => this.setState({ isModalOpen: false })
    openModal = () => this.setState({ isModalOpen: true })

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
            <div className="row align-items-center justify-content-between" style={{ padding: '16px 32px' }}>
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
                <IconButton onClick={this.openModal} style={{ color: '#475561' }}>
                    <MoreHorizIcon />
                </IconButton>
                {
                    this.state.isModalOpen && <LeftModal
                        isOpen={this.state.isModalOpen}
                        toggleModal={() => this.closeModal('updateTripDate')}
                        title='Update trip date'
                        submit={this.handleUpdate}
                        remove={this.handleDelete}
                        date={moment(date).format('MM-DD-YYYY')}
                        category={type}
                        name={name}
                        form={UpdateTripDateForm}
                    />
                }
            </div>
        )
    }
}
