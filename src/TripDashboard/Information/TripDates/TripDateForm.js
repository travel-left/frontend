import React from 'react'
import FormField from '../../../forms/FormField'
import SelectField from '../../../forms/SelectField'
import * as Yup from 'yup'
import ModalForm from '../../../forms/ModalForm'
import { nameValidator, dateValidator, tripDateTypeValidator } from '../../../util/validators'

export default function TripDateForm({ name, date, type, submit, formType }) {
    const initialValues = {
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
    const button = {
        classes: 'btn-primary text-light mx-5 my-2',
        text: 'Add New'
    }
    const icon = 'fas fa-ellipsis-h h5 text-muted'

    const formTypeStyle = formType === 'add' ? { button } : { icon: icon }
    return (
        <ModalForm {...formTypeStyle} title="Add a Trip Date" validationSchema={schema} initialValues={initialValues} submit={submit}>
            <FormField name="name" label="Name" placeholder="Payment Due" />
            <FormField name="date" label="Date" type="date" />
            <SelectField name="type" options={options} label="Type" />
        </ModalForm>
    )
}
