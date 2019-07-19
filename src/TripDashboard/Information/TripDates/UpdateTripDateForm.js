import React from 'react'
import FormField from '../../../util/forms/FormField'
import SelectField from '../../../util/forms/SelectField'
import * as Yup from 'yup'
import ModalForm from '../../../util/forms/ModalForm'
import { nameValidator, dateValidator, tripDateTypeValidator } from '../../../util/validators'

export default function UpdateTripDateForm(props) {
    const initialValues = {
        ...props
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

    const icon = 'hover far fa-2x fa-edit text-secondary float-right'

    return (
        <ModalForm icon={icon} header="Add a Trip Date" validationSchema={schema} initialValues={initialValues} {...props}>
            <FormField name="name" label="Name" placeholder="Payment Due" />
            <FormField name="date" label="Date" type="date" />
            <SelectField name="type" options={options} label="Type" />
        </ModalForm>
    )
}
