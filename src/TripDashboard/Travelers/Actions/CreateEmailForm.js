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

    const button = {
        classes: 'btn btn-outline-primary btn-lg',
        text: 'EMAIL'
    }

    let travelerList = travelers.map(t =>
        t.selected ? (
            <p key={t._id}>
                {t.name} -- {t.email}
            </p>
        ) : (
                undefined
            )
    )

    return (
        <ModalForm
            button={button}
            header="Send an email to selected travelers"
            validationSchema={schema}
            initialValues={initialValues}
            submit={submit}
        >
            <div>
                <h5>Selected travelers</h5>
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
