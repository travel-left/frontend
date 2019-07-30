import React from 'react'
import ModalForm from '../../../util/forms/ModalForm'
import SelectField from '../../../util/forms/SelectField'

export default function ChangeStatusForm({ submit, travelers }) {
    const initialValues = {
        status: ''
    }

    const button = {
        classes: 'btn btn-outline-primary btn-lg',
        text: 'STATUS'
    }

    let travelerList = travelers.map(t =>
        t.selected ? (
            <p key={t._id}>
                <div className="row">
                    <div className="col text-black-50">{t.name}</div>
                    <div className="col text-black-50">{t.status}</div>
                </div>
            </p>
        ) : (
                undefined
            )
    )

    return (
        <ModalForm button={button} header="Bulk update travelers status" initialValues={initialValues} submit={submit}>
            <div className='mb-4'>
                <h5>Selected travelers</h5>
                <div className="row">
                    <div className="col ">Name</div>
                    <div className="col ">Status</div>
                </div>
                <hr />
                {travelerList}
            </div>
            <SelectField name="status" options={[{ name: 'INVITED', value: 'INVITED' }, { name: 'CONFIRMED', value: 'CONFIRMED' }, { name: 'ON-TRIP', value: 'ON-TRIP' }, { name: 'POST-TRIP', value: 'POST-TRIP' }]} label='New Status' />
        </ModalForm>
    )
}
