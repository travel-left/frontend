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
                className="card py-3 border my-2 shadow animated fadeIn hover"
                onDoubleClick={this.handleDoubleClick}
            >
                <div className="row no-gutters justify-content-around align-items-center">
                    <div className="col-md-1" onClick={this.handleToggle}>
                        <Checkbox
                            onChange={this.handleToggle}
                            className="mx-3"
                            checked={selected}
                        />
                    </div>
                    <div className="col-md-2 d-none d-md-block d-flex justify-content-center">
                        <Image diameter="75px" src={image} name={name} />
                    </div>
                    <div className="d-none d-md-flex col-md-2 d-flex justify-content-center">
                        {name}
                    </div>
                    <div className="col-4 col-md-4 d-flex justify-content-center">
                        {email}
                    </div>
                    <div className="col-4 col-md-2 d-flex justify-content-center">
                        <TravelerStatus status={status} />
                    </div>
                </div>
            </div>
        )
    }
}
