import React from 'react'
import FormField from '../../../util/forms/FormField'
import SelectField from '../../../util/forms/SelectField'
import * as Yup from 'yup'
import ModalForm from '../../../util/forms/ModalForm'
import { nameValidator, dateValidator, tripDateTypeValidator } from '../../../util/validators'

export default function TripDateForm({ name, date, type, _id, submit, formType, remove }) {
    const initialValues = {
        _id: _id || '',
        name: name || '',
        date: date ? date.split('T')[0] : '',
        type: type || 'TRAVEL'
    }

    const options = [
        {
            name: 'Travel Date',
            value: 'TRAVEL'
        },
        {
            name: 'Money Date',
            value: 'MONEY'
        },
        {
            name: 'Paperwork Date',
            value: 'PAPERWORK'
        },
        {
            name: 'Other Date',
            value: 'OTHER'
        }
    ]

    const schema = Yup.object().shape({
        name: nameValidator,
        date: dateValidator,
        type: tripDateTypeValidator
    })
    const submitButton = {
        classes: 'btn btn-primary mb-4',
        text: 'add new'
    }

    const editButton = {
        classes: 'btn btn-secondary text-light mb-4',
        text: 'edit'
    }

    const formTypeStyle = formType === 'add' ? { button: submitButton } : { button: editButton }

    return (
        <ModalForm {...formTypeStyle} title="Add a Trip Date" validationSchema={schema} initialValues={initialValues} submit={submit} remove={remove}>
            <FormField name="name" label="Name" placeholder="Payment Due" />
            <FormField name="date" label="Date" type="date" />
            <SelectField name="type" options={options} label="Type" />
        </ModalForm>
    )
}
