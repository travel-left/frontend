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

    const button = {
        classes: 'text-light hover pl-0',
        text: (
            <h5 className="text-light ml-0">Status:
            <span className="badge badge-primary badge-pill h5 align-self-center ml-2 bg-secondary">{status} </span>
                <i className="far fa-edit ml-2" />
            </h5 >
        )
    }

    return (
        <ModalForm button={button} header="Change trip status" validationSchema={schema} initialValues={initialValues} submit={submit}>
            <SelectField options={options} name="status" label="Trip Status" />
        </ModalForm>
    )
}
