import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'

export default function CreateEmailForm({ submit, travelers }) {
    const initialValues = {
        subject: '',
        text: ''
    }

    const schema = Yup.object().shape({
        subject: Yup.string()
            .min(2, 'Please enter a longer subject')
            .max(50, 'Please enter a shorter subject')
            .required('Please enter a subject'),
        text: Yup.string()
            .min(2, 'Please enter a longer body')
            .max(50, 'Please enter a shorter body')
            .required('Please enter a body')
    })

    const button = {
        classes: 'btn btn-info btn-lg',
        text: 'new email'
    }

    let travelerList = travelers.map(t => (t.selected ? <p>{t.firstName} {t.lastName} -- {t.email}</p> : undefined))
    console.log(travelerList)
    return (
        <ModalForm button={button} header="Send an email to selected travelers" validationSchema={schema} initialValues={initialValues} submit={submit}>
            <div>
                <h5>Selected travelers</h5>
                <hr />
                {travelerList}
            </div>
            <FormField name="subject" label="Subject" placeholder="Your email subject" />
            <FormField name="text" label="Body" component="textarea" placeholder="Your email body" className="d-block" />
        </ModalForm>
    )
}
