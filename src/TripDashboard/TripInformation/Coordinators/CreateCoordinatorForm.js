import React from 'react'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'
import Uploader from '../../../util/forms/Uploader'
import Validator, {
    nameValidator,
    emailValidator,
    phoneValidator
} from '../../../util/validators'

export default function NewCoordinatorForm({ submit }) {
    const initialValues = {
        name: '',
        image: 'https://',
        email: '',
        title: '',
        phone: ''
    }

    const schema = Validator({
        name: nameValidator,
        email: emailValidator,
        phone: phoneValidator
    })

    const button = {
        classes: 'btn btn-primary rounded-pill',
        text: 'ADD NEW'
    }

    return (
        <ModalForm
            buttonType='add'
            header="Add a new coordinator to your trip"
            validationSchema={schema}
            initialValues={initialValues}
            submit={submit}
        >
            <FormField name="name" label="Name*" placeholder="John Appleseed" />
            <FormField
                component={Uploader}
                name="image"
                label="Upload an Image"
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
                type="phone"
            />
            <FormField
                name="title"
                label="Title"
                placeholder="Travel Coordinator"
            />
        </ModalForm>
    )
}
