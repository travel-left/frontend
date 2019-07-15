import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../forms/FormField'
import ModalForm from '../../../forms/ModalForm'
import Uploader from '../../../forms/Uploader'

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
        img: Yup.string().required('Please upload an image'),
        email: Yup.string().email('please enter a valid email')
    })

    const button = {
        classes: 'btn btn-primary mb-4',
        text: 'add new'
    }

    return (
        <ModalForm button={button} title="Add a new coordinator to your trip" validationSchema={schema} initialValues={initialValues} submit={submit}>
            <FormField name="name" label="Name" placeholder="Steve Jobs" />
            <FormField component={Uploader} name="img" label="Upload an Image" />
            <FormField name="email" label="Email" placeholder="steve@apple.com" type="email" />
            <FormField name="phone" label="Phone number" placeholder="559-867-5309" type="phone" />
            <FormField name="title" label="Title" placeholder="CEO" />
        </ModalForm>
    )
}
