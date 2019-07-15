import React from 'react'
import { Field } from 'formik'
import * as Yup from 'yup'
import FormField from '../../../Forms/FormField'
import ModalForm from '../../../Forms/ModalForm'
import Uploader from '../../../Forms/Uploader'

export default function UpdateCoordinatorForm({ submit, name, image, email, title, phone }) {
    const initialValues = {
        name,
        image,
        email,
        title,
        phone
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
        classes: 'btn btn-secondary text-light mb-4',
        text: 'edit'
    }

    return (
        <ModalForm button={button} title="Update coordinator" validationSchema={schema} initialValues={initialValues} submit={submit}>
            <FormField name="name" label="Name" placeholder="Steve Jobs" />
            <Field component={Uploader} />
            <FormField name="email" label="Email" placeholder="steve@apple.com" type="email" />
            <FormField name="phone" label="Phone number" placeholder="559-867-5309" type="text" />
            <FormField name="title" label="Title" placeholder="CEO" />
        </ModalForm>
    )
}
