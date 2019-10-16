import React from 'react'
import ModalForm from '../../../util/forms/ModalForm'
import SelectField from '../../../util/forms/SelectField'

export default function ChangeStatusForm({ submit, travelers, selected }) {
    const initialValues = {
        status: ''
    }

    let travelerList = travelers.map(t =>
        selected[t._id] ? (
            <p key={t._id}>
                <div className="row">
                    <div className="col text-black-50">{t.name}</div>
                    <div className="col text-black-50">{t.phone}</div>
                </div>
            </p>
        ) : null
    )

    travelerList = travelerList.filter(t => t !== null)

    travelerList = travelerList.length ? (
        <>
            <h5>Selected travelers</h5>
            <div className="row">
                <div className="col ">Name</div>
                <div className="col ">Phone</div>
            </div>
            <hr />
            {travelerList}
        </>
    ) : (
            <p className="text-danger text-center">No Travelers Selected!</p>
        )

    return (
        <ModalForm
            buttonType='travelerEdit'
            header="Bulk update travelers status"
            initialValues={initialValues}
            submit={submit}
        >
            <div className="mb-4">{travelerList}</div>
            <SelectField
                name="status"
                options={[
                    { value: 'INVITED', label: 'Invited' },
                    { value: 'CONFIRMED', label: 'Confirmed' },
                    { value: 'ON-TRIP', label: 'On trip' },
                    { value: 'POST-TRIP', label: 'Post trip' },
                    { value: 'DOCS DUE', label: 'Docs due' },
                    { value: 'MONEY DUE', label: 'Money due' },
                    { value: 'PAPERWORK NEEDED', label: 'Paperwork needed' },
                    { value: 'PAYMENT NEEDED', label: 'Payment needed' },
                    { value: 'NOT-GOING', label: 'Not going' },
                    { value: 'OTHER', label: 'Other' }
                ]}
                label="New Status*"
            />
        </ModalForm>
    )
}