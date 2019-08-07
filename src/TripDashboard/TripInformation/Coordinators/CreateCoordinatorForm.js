import React from 'react'
import * as Yup from 'yup'
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
        img: '',
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
        classes: 'btn btn-primary mb-4',
        text: 'add new'
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
