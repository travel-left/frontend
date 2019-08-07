import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'

export default function CreateEmailForm({ submit, travelers }) {
    const initialValues = {
        subject: '',
        body: ''
    }

    const schema = Yup.object().shape({
        subject: Yup.string()
            .min(2, 'Please enter a longer subject')
            .max(50, 'Please enter a shorter subject')
            .required('Please enter a subject'),
        body: Yup.string()
            .min(2, 'Please enter a longer body')
            .max(50, 'Please enter a shorter body')
            .required('Please enter a body')
    })

    let travelerList = travelers.map(t =>
        t.selected ? (
            <p key={t._id}>
                <div className="row">
                    <div className="col text-black-50">{t.name}</div>
                    <div className="col text-black-50">{t.email}</div>
                </div>
            </p>
        ) : (
                undefined
            )
    )

    return (
        <ModalForm
            icon='far fa-envelope fa-2x text-primary'
            header="Send an email to selected travelers"
            validationSchema={schema}
            initialValues={initialValues}
            submit={submit}
        >
            <div className="mb-4">
                <h5>Selected travelers</h5>
                <div className="row">
                    <div className="col ">Name</div>
                    <div className="col ">Email</div>
                </div>
                <hr />
                {travelerList}
            </div>
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
