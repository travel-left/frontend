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
                {t.name} -- {t.phone}
            </p>
        ) : (
                undefined
            )
    )

    return (
        <ModalForm button={button} header="Bulk update travelers status" initialValues={initialValues} submit={submit}>
            <div>
                <h5>Selected travelers</h5>
                <hr />
                {travelerList}
            </div>
            <SelectField name="status" options={[{ name: 'INVITED', value: 'INVITED' }, { name: 'CONFIRMED', value: 'CONFIRMED' }, { name: 'ON-TRIP', value: 'ON-TRIP' }, { name: 'POST-TRIP', value: 'POST-TRIP' }]} label='Status' />
        </ModalForm>
    )
}
