import React from 'react'
import * as Yup from 'yup'
import ModalForm from '../../util/forms/ModalForm'
import FormField from '../../util/forms/FormField'
import { nameValidator } from '../../util/validators'

export default function TripNameForm({ name, submit }) {
    const initialValues = {
        name: name
    }

    const schema = Yup.object().shape({
        name: nameValidator
    })
    return (
        <ModalForm
            icon="far fa-edit fa-2x text-white"
            header="Edit trip name"
            validationSchema={schema}
            initialValues={initialValues}
            submit={submit}
        >
            <FormField name="name" placeholder="Australia" label="Trip Name" />
        </ModalForm>
    )
}
