import React from 'react'
import * as Yup from 'yup'
import ModalForm from '../../Forms/ModalForm'
import FormField from '../../Forms/FormField'

export default function TripNameForm({ name, submit }) {
    const initialValues = {
        name: name
    }

    const nameValidator = Yup.string()
        .min(2, 'Please enter a longer name')
        .max(50, 'Please enter a shorter name')
        .required('Please enter a trip name')

    const schema = Yup.object().shape({
        name: nameValidator
    })
    return (
        <ModalForm icon="far fa-edit fa-2x text-primary text-secondary" title="Trip name" validationSchema={schema} initialValues={initialValues} submit={submit}>
            <FormField name="name" placeholder="Australia" label="Trip Name" />
        </ModalForm>
    )
}
