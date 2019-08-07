import React from 'react'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'
import Uploader from '../../../util/forms/Uploader'
import Validator, {
    nameValidator,
    emailValidator,
    phoneValidator
} from '../../../util/validators'

export default function AddTravelerForm({ submit }) {
    const initialValues = {
        name: '',
        image: '',
        email: '',
        phone: '',
        personalNotes: ''
    }

    const schema = Validator({
        name: nameValidator,
        email: emailValidator,
        phone: phoneValidator
    })

    const button = {
        classes: 'btn btn-lg btn-primary',
        text: 'ADD A TRAVELER'
    }

    return (
        <ModalForm
            button={button}
            header="Add a traveler"
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
            <FormField
                name="personalNotes"
                label="Personal notes"
                component="textarea"
                placeholder="Any extra notes about this traveler"
                className="d-block"
            />
        </ModalForm>
    )
}
