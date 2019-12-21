import React, { Component } from 'react'
import moment from 'moment'
import './TripDate.css'
import IconButton from '@material-ui/core/IconButton'
import LeftModal from '../../../util/otherComponents/LeftModal'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Typography from '@material-ui/core/Typography'
import TripDateForm from '../../../Forms/TripDateForm'

export default class TripDate extends Component {

    state = {
        isModalOpen: false
    }

    handleUpdate = putObject => {
        this.props.update(this.props._id, putObject)
    }

    handleDelete = () => {
        this.props.remove(this.props._id)
        this.closeModal()
    }

    closeModal = () => this.setState({ isModalOpen: false })
    openModal = () => this.setState({ isModalOpen: true })

    render() {
        let { name, date, type } = this.props
        let icon

        switch (type) {
            case 'TRAVEL':
                icon = <i class="material-icons d-flex justify-content-center align-items-center TripDate-Icon" style={{ backgroundColor: '#29CB97', height: 56, width: 56, fontSize: 24 }}>card_travel</i>
                break
            case 'PAPERWORK':
                icon = <i class="material-icons d-flex justify-content-center align-items-center TripDate-Icon" style={{ backgroundColor: '#FEC400', height: 56, width: 56, fontSize: 24 }}>folder_open</i>
                break
            case 'MONEY':
                icon = <i class="material-icons d-flex justify-content-center align-items-center TripDate-Icon" style={{ backgroundColor: '#B558F6', height: 56, width: 56, fontSize: 24 }}>attach_money</i>
                break
            case 'OTHER':
                icon = <i class="material-icons d-flex justify-content-center align-items-center TripDate-Icon" style={{ backgroundColor: '#FFABAA', height: 56, width: 56, fontSize: 24 }}>calendar_today</i>
                break
            default:
                icon = <i class="material-icons d-flex justify-content-center align-items-center TripDate-Icon" style={{ backgroundColor: '#FFABAA', height: 56, width: 56, fontSize: 24 }}>calendar_today</i>
                break
        }

        const dateWithoutTimeorTZ = date.split('T')[0]

        return (
            <div className="row align-items-center justify-content-between" style={{ padding: '16px 32px' }}>
                <div className="d-flex align-items-center justify-content-between">
                    {icon}
                    <div className="d-flex flex-column justify-content-center align-items-start ml-4">
                        <Typography variant="subtitle2">{name}</Typography>
                        <Typography variant="caption">{moment(dateWithoutTimeorTZ).format('MMMM DD')}</Typography>
                    </div>
                </div>
                {!this.props.share && <IconButton onClick={this.openModal} style={{ color: '#475561' }}>
                    <MoreHorizIcon />
                </IconButton>}
                {
                    this.state.isModalOpen && <LeftModal
                        isOpen={this.state.isModalOpen}
                        toggleModal={this.closeModal}
                        title='Update trip date'
                        submit={this.handleUpdate}
                        remove={this.handleDelete}
                        date={moment(date).format('MM-DD-YYYY')}
                        category={type}
                        name={name}
                        form={TripDateForm}
                    />
                }
            </div>
        )
    }
}
