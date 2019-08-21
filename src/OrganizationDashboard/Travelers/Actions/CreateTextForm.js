import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'

export default function CreateTextForm({ submit, travelers, selected }) {
    const initialValues = {
        body: ''
    }

    const schema = Yup.object().shape({
        body: Yup.string()
            .min(2, 'Please enter a longer body')
            .max(400, 'Please enter a shorter body')
            .required('Please enter a body')
    })

    let travelerList = travelers.map(t =>
        selected[t._id] ? (
            <p key={t._id}>
                <div className="row">
                    <div className="col text-black-50">{t.name}</div>
                    <div className="col text-black-50">{t.phone}</div>
                </div>
            </p>
        ) : null
    )

    travelerList = travelerList.filter(t => t !== null)

    travelerList = travelerList.length ? (
        <>
            <h5>Selected travelers</h5>
            <div className="row">
                <div className="col ">Name</div>
                <div className="col ">Phone</div>
            </div>
            <hr />
            {travelerList}
        </>
    ) : (
        <p className="text-danger text-center">No Travelers Selected!</p>
    )

    return (
        <ModalForm
            icon="far fa-comment fa-2x text-primary"
            header="Send a text to selected travelers"
            validationSchema={schema}
            initialValues={initialValues}
            submit={submit}
            submitButtonText="SEND"
        >
            <div className="mb-4">{travelerList}</div>
            <FormField
                name="body"
                label="Body*"
                component="textarea"
                placeholder="Your text body"
                className="d-block"
            />
        </ModalForm>
    )
}
