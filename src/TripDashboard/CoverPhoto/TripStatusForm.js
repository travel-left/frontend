import React from 'react'
import SelectField from '../../util/forms/SelectField'
import * as Yup from 'yup'
import ModalForm from '../../util/forms/ModalForm'
import { tripStatusValidator } from '../../util/validators'

export default function TripDatesForm({ status, submit }) {
    const initialValues = {
        status: status
    }

    const options = [
        {
            name: 'Planning',
            value: 'PLANNING',
            default: true
        },
        {
            name: 'Published',
            value: 'PUBLISHED'
        },
        {
            name: 'In Progress',
            value: 'IN PROGRESS'
        },
        {
            name: 'Completed',
            value: 'COMPLETED'
        }
    ]

    const schema = Yup.object().shape({
        status: tripStatusValidator
    })
    return (
        <ModalForm icon="far fa-edit pl-2 text-light hover" title="Trip name" validationSchema={schema} initialValues={initialValues} submit={submit}>
            <SelectField options={options} name="status" label="Trip Status" />
        </ModalForm>
    )
}
