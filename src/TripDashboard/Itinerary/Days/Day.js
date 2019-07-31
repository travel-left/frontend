import React, { Component } from 'react'
import moment from 'moment'

export default class Day extends Component {
    handleClick = e => {
        this.props.handleClick(this.props.day)
    }

    render() {
        return (
            <li className={`animated fadeIn list-group-item d-flex hover justify-content-between align-items-center border-right-0 border-left-0 text-dark h6 ${this.props.selectedDay && 'active'}`} onClick={this.handleClick}>{moment(this.props.day).format('MMM DD')}</li>
        )
    }
}
