import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'

export default function CreateTextForm({ submit, travelers }) {
    const initialValues = {
        body: ''
    }

    const schema = Yup.object().shape({
        body: Yup.string()
            .min(2, 'Please enter a longer body')
            .max(160, 'Please enter a shorter body')
            .required('Please enter a body')
    })

    const button = {
        classes: 'btn btn-outline-primary btn-lg',
        text: 'TEXT'
    }

    let travelerList = travelers.map(t =>
        t.selected ? (
            <p key={t._id}>
                <div className="row">
                    <div className="col text-black-50">{t.name}</div>
                    <div className="col text-black-50">{t.phone}</div>
                </div>
            </p>
        ) : (
                undefined
            )
    )

    return (
        <ModalForm
            button={button}
            header="Send a text to selected travelers"
            validationSchema={schema}
            initialValues={initialValues}
            submit={submit}
        >
            <div className='mb-4'>
                <h5>Selected travelers</h5>
                <div className="row">
                    <div className="col ">Name</div>
                    <div className="col ">Phone</div>
                </div>
                <hr />
                {travelerList}
            </div>
            <FormField
                name="body"
                label="Body"
                component="textarea"
                placeholder="Your text body"
                className="d-block"
            />
        </ModalForm>
    )
}
