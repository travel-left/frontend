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
        ...props
    }

    const schema = Validator({
        name: nameValidator,
        email: emailValidator,
        phone: phoneValidator
    })

    const icon = 'hover far fa-2x fa-edit text-secondary float-right'

    return (
        <ModalForm
            icon={icon}
            header="Edit traveler"
            validationSchema={schema}
            initialValues={initialValues}
            {...props}
        >
            <FormField name="name" label="Name" placeholder="Steve Jobs" />
            <SelectField
                name="status"
                options={[
                    { label: 'INVITED', value: 'INVITED' },
                    { label: 'CONFIRMED', value: 'CONFIRMED' },
                    { label: 'ON-TRIP', value: 'ON-TRIP' },
                    { label: 'POST-TRIP', value: 'POST-TRIP' }
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
                placeholder="steve@apple.com"
                type="email"
            />
            <FormField
                name="phone"
                label="Phone number"
                placeholder="559-867-5309"
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
