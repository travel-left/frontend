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
        classes: 'btn btn-lg btn-secondary text-light float-right px-4',
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
        >
            <FormField name="name" label="Name" placeholder="John Appleseed" />
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
