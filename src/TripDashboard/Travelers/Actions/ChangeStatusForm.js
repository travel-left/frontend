import React from 'react'
import ModalForm from '../../../util/forms/ModalForm'
import SelectField from '../../../util/forms/SelectField'

export default function ChangeStatusForm({ submit, travelers }) {
    const initialValues = {
        status: ''
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
        <ModalForm
            icon='far fa-edit fa-lg text-primary fa-2x'
            header="Bulk update travelers status"
            initialValues={initialValues}
            submit={submit}
        >
            <div className="mb-4">
                <h5>Selected travelers</h5>
                <div className="row">
                    <div className="col ">Name</div>
                    <div className="col ">Status</div>
                </div>
                <hr />
                {travelerList}
            </div>
            <SelectField
                name="status"
                options={[
                    { label: 'INVITED', value: 'INVITED' },
                    { label: 'CONFIRMED', value: 'CONFIRMED' },
                    { label: 'ON-TRIP', value: 'ON-TRIP' },
                    { label: 'POST-TRIP', value: 'POST-TRIP' }
                ]}
                label="New Status"
            />
        </ModalForm>
    )
}
