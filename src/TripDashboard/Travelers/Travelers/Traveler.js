import React, { Component } from 'react'
import UpdateTravelerForm from '../Actions/UpdateTravelerForm'
import Image from '../../../util/otherComponents/Image'
import Checkbox from '../../../util/forms/Checkbox'

export default class Traveler extends Component {
    handleUpdate = updateObject => {
        this.props.update(this.props._id, updateObject)
    }

    handleToggle = () => {
        this.props.toggle(this.props._id)
    }

    handleRemove = () => {
        this.props.remove(this.props._id)
    }

    handleDoubleClick = () => {
        this.props.onDoubleClick(this.props._id)
    }

    render() {
        let { name, email, status, image, selected } = this.props

        return (
            <div
                className="card py-3 border my-2 shadow animated fadeIn"
                onDoubleClick={this.handleDoubleClick}
            >
                <div
                    className="row no-gutters justify-content-around align-items-center px-3 px-md-0"
                    onClick={this.handleToggle}
                >
                    <div className="col-md-1">
                        <Checkbox
                            onChange={this.handleToggle}
                            className="ml-3"
                            checked={selected}
                        />
                    </div>
                    <div className="col-md-2 d-none d-md-block">
                        <Image diameter="75px" src={image} />
                    </div>
                    <div className="d-none d-md-flex col-md-2">{name}</div>
                    <div className="col-4 col-md-3">{email}</div>
                    <div className="col-4 col-md-2">
                        <span className="badge badge-primary badge-pill">
                            {status}
                        </span>
                    </div>
                    <div className="col-4 col-md-1">
                        <UpdateTravelerForm
                            {...this.props}
                            remove={this.handleRemove}
                            submit={this.handleUpdate}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
