import React, { Component } from 'react'
import UpdateTravelerForm from './UpdateTravelerForm'
import Image from '../../../util/otherComponents/Image'

export default class Traveler extends Component {
    updateTraveler = updateObject => {
        this.props.update(this.props._id, updateObject)
    }

    handleToggle = () => {
        this.props.toggle(this.props._id)
    }

    handleRemove = () => {
        this.props.remove(this.props._id)
    }

    render() {
        let { firstName, lastName, email, status, img, _id, personalNotes, phone, selected, remove } = this.props

        return (
            <div className="card py-3 border bg-white my-2">
                <div className="row no-gutters justify-content-around align-items-center px-3 px-md-0" onClick={this.handleToggle}>
                    <div className="col-md-1"><input onClick={this.handleToggle} type="checkbox" className='ml-3' checked={selected} onChange={this.handleToggle}></input></div>
                    <div className="col-md-2 d-none d-md-block">
                        <Image diameter="75px" src={img} />
                    </div>
                    <div className="d-none d-md-flex col-md-2">
                        {firstName} {lastName}
                    </div>
                    <div className="col-4 col-md-3">{email}</div>
                    <div className="col-4 col-md-2">
                        <span className="badge badge-primary badge-pill">{status}</span>
                    </div>
                    <div className="col-4 col-md-1">
                        <UpdateTravelerForm name={firstName + ' ' + lastName} email={email} phone={phone} personalNotes={personalNotes} status={status} img={img} _id={_id} submit={this.updateTraveler} remove={this.handleRemove}></UpdateTravelerForm>
                    </div>
                </div>
            </div>
        )
    }
}
