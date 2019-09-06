import React from 'react'
import FormField from '../../../util/forms/FormField'
import SelectField from '../../../util/forms/SelectField'
import * as Yup from 'yup'
import ModalForm from '../../../util/forms/ModalForm'
import {
    nameValidator,
    dateValidator,
    tripDateTypeValidator
} from '../../../util/validators'

export default function UpdateTripDateForm(props) {
    const initialValues = {
        ...props,
        date: props.date.split('T')[0]
    }

    const options = [
        {
            label: 'Travel Date',
            value: 'TRAVEL'
        },
        {
            label: 'Money Date',
            value: 'MONEY'
        },
        {
            label: 'Paperwork Date',
            value: 'PAPERWORK'
        },
        {
            label: 'Other Date',
            value: 'OTHER'
        }
    ]

    const schema = Yup.object().shape({
        name: nameValidator,
        date: dateValidator,
        type: tripDateTypeValidator
    })

    const icon = <i class="material-icons TripDate-Edit hover">more_horiz</i>

    return (
        <ModalForm
            mIcon={icon}
            header="Add a Trip Date"
            validationSchema={schema}
            initialValues={initialValues}
            {...props}
        >
            <FormField name="name" label="Name*" placeholder="Trip Date Name" />
            <FormField name="date" label="Date*" type="date" />
            <SelectField name="type" options={options} label="Type*" />
        </ModalForm>
    )
}
