import React, { Component } from 'react'

import Image from '../../../util/otherComponents/Image'
import Checkbox from '@material-ui/core/Checkbox'
import TravelerStatus from '../../../util/otherComponents/TravelerStatus'

export default class Traveler extends Component {
    handleToggle = () => {
        console.log('toggling')
        this.props.toggle(this.props._id)
    }

    handleDoubleClick = () => {
        this.props.onDoubleClick(this.props._id)
    }

    render() {
        let { name, email, status, image, selected, index } = this.props
        let bgColor = index % 2 !== 0 ? '#F6FAFF' : '#FFFFFF'
        return (
            <div
                className="d-flex py-2 animated fadeIn col-12 justify-content-around align-items-center px-0 hover"
                style={{
                    backgroundColor: bgColor
                }}
                onDoubleClick={this.handleDoubleClick}
            >
                <div className="col-md-1">
                    <Checkbox
                        onChange={this.handleToggle}
                        checked={selected}
                        color='primary'
                    />
                </div>
                <div className="col-md-1">
                    <Image diameter="48px" src={image} name={name} />
                </div>
                <div className="col-md-3 Travelers-name">{name}</div>
                <div className="col-md-4" style={{
                    fontFamily: 'Roboto',
                    fontSize: '14px',
                    color: '#475561'
                }}>{email}</div>
                <div className="col-md-2">
                    <TravelerStatus status={status} />
                </div>
                <div className="col-md-1 d-flex align-items-center justify-content-center">
                    <i class="material-icons hover" style={{ color: '#AAB5C0', fontSize: '24px' }}
                        onClick={this.handleDoubleClick}>more_vert</i>
                </div>
            </div>
        )
    }
}
