import React from 'react'
import * as Yup from 'yup'
import ModalForm from '../../Forms/ModalForm'
import FormField from '../../Forms/FormField'
import { nameValidator } from '../../../util/validators'

export default function TripNameForm({ name, submit }) {
    const initialValues = {
        name: name
    }

    const schema = Yup.object().shape({
        name: nameValidator
    })
    return (
        <ModalForm icon="far fa-edit fa-2x text-primary text-secondary" title="Trip name" validationSchema={schema} initialValues={initialValues} submit={submit}>
            <FormField name="name" placeholder="Australia" label="Trip Name" />
        </ModalForm>
    )
}
