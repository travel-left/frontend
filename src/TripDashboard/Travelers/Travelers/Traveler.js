import React, { Component } from 'react'

import Image from '../../../util/otherComponents/Image'
import Checkbox from '../../../util/forms/Checkbox'
import TravelerStatus from '../../../util/otherComponents/TravelerStatus'

export default class Traveler extends Component {
    handleToggle = () => {
        this.props.toggle(this.props._id)
    }

    handleDoubleClick = () => {
        this.props.onDoubleClick(this.props._id)
    }

    render() {
        let { name, email, status, image, selected } = this.props

        return (
            <div
                className="d-flex left-shadow-sharp py-3 my-2 animated fadeIn hover col-12 justify-content-between align-items-center"
                onDoubleClick={this.handleDoubleClick}
            >
                <div className="col-md-1" onClick={this.handleToggle}>
                    <Checkbox
                        onChange={this.handleToggle}
                        checked={selected}
                    />
                </div>
                <div className="col-md-1">
                    <Image diameter="40px" src={image} name={name} />
                </div>
                <div className="col-md-4 Travelers-name">{name}</div>
                <div className="col-md-4">{email}</div>
                <div className="col-md-2">
                    <TravelerStatus status={status} />
                </div>
            </div>
        )
    }
}
