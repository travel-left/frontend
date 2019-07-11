import React from 'react'
import SelectField from '../../Forms/SelectField'
import * as Yup from 'yup'
import ModalForm from '../../Forms/ModalForm'

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

    const statusValidator = Yup.string().required()

    const schema = Yup.object().shape({
        status: statusValidator
    })
    return (
        <ModalForm icon="far fa-edit pl-2 text-light hover" title="Trip name" validationSchema={schema} initialValues={initialValues} submit={submit}>
            <SelectField options={options} name="status" label="Trip Status" />
        </ModalForm>
    )
}
