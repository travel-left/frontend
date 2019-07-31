import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'
import Uploader from '../../../util/forms/Uploader'

export default function CreateContactForm({ submit }) {
    const initialValues = {
        name: '',
        image: '',
        email: '',
        phone: ''
    }

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Please enter a longer name')
            .max(50, 'Please enter a shorter name')
            .required('Please enter a name'),
        image: Yup.string().required('Please upload an image'),
        email: Yup.string().email('please enter a valid email')
    })

    const button = {
        classes: 'btn btn-primary mb-4',
        text: 'add new'
    }

    return (
        <ModalForm
            button={button}
            header="Add a new emergency contact"
            validationSchema={schema}
            initialValues={initialValues}
            submit={submit}
        >
            <FormField name="name" label="Name" placeholder="Steve Jobs" />
            <FormField
                component={Uploader}
                name="image"
                label="Upload an Image"
            />
            <FormField
                name="email"
                label="Email"
                placeholder="steve@apple.com"
                type="email"
            />
            <FormField
                name="phone"
                label="Phone number"
                placeholder="559-867-5309"
                type="phone"
            />
        </ModalForm>
    )
}
