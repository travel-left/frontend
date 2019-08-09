import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'

export default function CreateEmailForm({ submit, travelers, selected }) {
    const initialValues = {
        subject: '',
        body: ''
    }

    const schema = Yup.object().shape({
        subject: Yup.string()
            .min(2, 'Please enter a longer subject')
            .max(200, 'Please enter a shorter subject')
            .required('Please enter a subject'),
        body: Yup.string()
            .min(2, 'Please enter a longer body')
            .max(5000, 'Please enter a shorter body')
            .required('Please enter a body')
    })

    let travelerList = travelers.map(t =>
        selected[t._id] ? (
            <p key={t._id}>
                <div className="row">
                    <div className="col text-black-50">{t.name}</div>
                    <div className="col text-black-50">{t.email}</div>
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
                <div className="col ">Email</div>
            </div>
            <hr />
            {travelerList}
        </>
    ) : (
        <p className="text-danger text-center">No Travelers Selected!</p>
    )

    return (
        <ModalForm
            icon="far fa-envelope fa-2x text-primary"
            header="Send an email to selected travelers"
            validationSchema={schema}
            initialValues={initialValues}
            submit={submit}
            submitButtonText="SEND"
        >
            <div className="mb-4">{travelerList}</div>
            <FormField
                name="subject"
                label="Subject"
                placeholder="Your email subject"
            />
            <FormField
                name="body"
                label="Body"
                component="textarea"
                placeholder="Your email body"
                className="d-block"
            />
        </ModalForm>
    )
}
