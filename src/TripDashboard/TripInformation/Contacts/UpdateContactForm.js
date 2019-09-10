import React from 'react'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'
import Uploader from '../../../util/forms/Uploader'
import Validator, {
    nameValidator,
    emailValidator,
    phoneValidator
} from '../../../util/validators'

export default function UpdateCoordinatorForm(props) {
    const initialValues = {
        ...props
    }

    const schema = Validator({
        name: nameValidator,
        email: emailValidator,
        phone: phoneValidator
    })

    return (
        <ModalForm
            buttonType='edit'
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
        </ModalForm>
    )
}
