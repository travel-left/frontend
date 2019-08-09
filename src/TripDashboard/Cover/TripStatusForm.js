import React from 'react'
import SelectField from '../../util/forms/SelectField'
import * as Yup from 'yup'
import ModalForm from '../../util/forms/ModalForm'
import { tripStatusValidator } from '../../util/validators'
import TripStatus from '../../util/otherComponents/TripStatus'

export default function TripDatesForm({ status, submit }) {
    const initialValues = {
        status: status
    }

    const options = [
        {
            label: 'Planning',
            value: 'PLANNING'
        },
        {
            label: 'Completed',
            value: 'COMPLETED'
        },
        {
            label: 'LEFT',
            value: 'LEFT'
        },
        {
            label: 'Past',
            value: 'PAST'
        }
    ]

    const schema = Yup.object().shape({
        status: tripStatusValidator
    })

    const button = {
        classes: 'text-light hover',
        text: (
            <div className="text-light h5 ml-0 d-flex align-items-start flex-column">
                <h5 className="left-shadow">STATUS</h5>
                <div>
                    <TripStatus status={status} />
                    <i className="far fa-edit ml-2" />
                </div>
            </div>
        )
    }

    return (
        <ModalForm
            button={button}
            header="Change trip status"
            validationSchema={schema}
            initialValues={initialValues}
            submit={submit}
        >
            <SelectField options={options} name="status" label="Trip Status" />
        </ModalForm>
    )
}
