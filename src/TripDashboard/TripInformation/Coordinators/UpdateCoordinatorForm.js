import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'
import Uploader from '../../../util/forms/Uploader'

export default function UpdateCoordinatorForm(props) {
    const initialValues = {
        ...props
    }

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Please enter a longer name')
            .max(50, 'Please enter a shorter name')
            .required('Please enter a name'),
        email: Yup.string().email('please enter a valid email')
    })

    const icon = 'hover far fa-2x fa-edit text-secondary float-right'

    return (
        <ModalForm
            icon={icon}
            header="Edit coordinator"
            validationSchema={schema}
            initialValues={initialValues}
            {...props}
        >
            <FormField name="name" label="Name*" placeholder="John Appleseed" />
            <FormField
                name="image"
                label="Upload a new image"
                component={Uploader}
            />
            <FormField
                name="email"
                label="Email*"
                placeholder="john@travel-left.com"
                type="email"
            />
            <FormField
                name="phone"
                label="Phone number"
                placeholder="5598675309"
                type="text"
            />
            <FormField
                name="title"
                label="Title"
                placeholder="Travel Coordinator"
            />
        </ModalForm>
    )
}
