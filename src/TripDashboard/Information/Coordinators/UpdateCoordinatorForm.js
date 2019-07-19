import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'
import Uploader from '../../../util/forms/Uploader'

export default function UpdateCoordinatorForm({ submit, name, image, email, title, phone, remove }) {
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

    const icon = 'hover far fa-2x fa-edit text-secondary float-right'

    return (
        <ModalForm icon={icon} title="Update coordinator" validationSchema={schema} initialValues={initialValues} submit={submit} remove={remove}>
            <FormField name="name" label="Name" placeholder="Steve Jobs" />
            <FormField name="image" label="Upload a new image" component={Uploader} />
            <FormField name="email" label="Email" placeholder="steve@apple.com" type="email" />
            <FormField name="phone" label="Phone number" placeholder="559-867-5309" type="text" />
            <FormField name="title" label="Title" placeholder="CEO" />
        </ModalForm>
    )
}
