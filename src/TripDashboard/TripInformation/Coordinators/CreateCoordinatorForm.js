import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'
import Uploader from '../../../util/forms/Uploader'

export default function NewCoordinatorForm({ submit }) {
    const initialValues = {
        name: '',
        img: '',
        email: '',
        title: '',
        phone: ''
    }

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Please enter a longer name')
            .max(50, 'Please enter a shorter name')
            .required('Please enter a name'),
        email: Yup.string().email('please enter a valid email')
    })

    const button = {
        classes: 'btn btn-primary mb-4 rounded-pill',
        text: 'ADD NEW'
    }

    return (
        <ModalForm
            button={button}
            header="Add a new coordinator to your trip"
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
            <FormField name="title" label="Title" placeholder="CEO" />
        </ModalForm>
    )
}
