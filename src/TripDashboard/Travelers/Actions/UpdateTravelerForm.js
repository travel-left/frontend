import React from 'react'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'
import Uploader from '../../../util/forms/Uploader'
import SelectField from '../../../util/forms/SelectField'
import Validator, {
    nameValidator,
    emailValidator,
    phoneValidator
} from '../../../util/validators'

export default function UpdateTravelerForm(props) {
    const initialValues = {
        ...props.traveler
    }

    const schema = Validator({
        name: nameValidator,
        email: emailValidator,
        phone: phoneValidator
    })

    const button = {
        classes: 'btn btn-lg btn-secondary float-right px-5 mt-5 mb-3',
        text: 'EDIT'
    }

    return (
        <ModalForm
            button={button}
            header="Edit traveler"
            validationSchema={schema}
            initialValues={initialValues}
            submit={props.submit}
            remove={props.remove}
            deleteText='Remove'
        >
            <FormField name="name" label="Name" placeholder="John Appleseed" />
            <SelectField
                name="status"
                options={[
                    { value: 'INVITED', label: 'Invited' },
                    { value: 'CONFIRMED', label: 'Confirmed' },
                    { value: 'ON-TRIP', label: 'On trip' },
                    { value: 'POST-TRIP', label: 'Post trip' },
                    { value: 'PAYMENT NEEDED', label: 'Payment needed' },
                    { value: 'PAPERWORK NEEDED', label: 'Paperwork needed' },
                    { value: 'OTHER', label: 'Other' }
                ]}
                label="Status"
            />
            <FormField
                name="image"
                label="Upload a new image"
                component={Uploader}
            />
            <FormField
                name="email"
                label="Email"
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
                name="personalNotes"
                label="Personal notes"
                component="textarea"
                placeholder="Any extra notes about this traveler"
                className="d-block"
            />
        </ModalForm>
    )
}
