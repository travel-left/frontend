import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'
import Uploader from '../../../util/forms/Uploader'
import SelectField from '../../../util/forms/SelectField';

export default function UpdateTravelerForm(props) {
    const initialValues = {
        ...props
    }

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Please enter a longer name')
            .max(50, 'Please enter a shorter name')
            .required('Please enter a name'),
        img: Yup.string().required('Please upload an image'),
        email: Yup.string().email('please enter a valid email')
    })

    const icon = 'hover far fa-2x fa-edit text-secondary float-right'

    return (
        <ModalForm icon={icon} header="Edit traveler" validationSchema={schema} initialValues={initialValues} {...props}>
            <FormField name="name" label="Name" placeholder="Steve Jobs" />
            <SelectField name="status" options={[{ name: 'INVITED', value: 'INVITED' }, { name: 'CONFIRMED', value: 'CONFIRMED' }, { name: 'ON-TRIP', value: 'ON-TRIP' }, { name: 'POST-TRIP', value: 'POST-TRIP' }]} label='Status' />
            <FormField name="img" label="Upload a new image" component={Uploader} />
            <FormField name="email" label="Email" placeholder="steve@apple.com" type="email" />
            <FormField name="phone" label="Phone number" placeholder="559-867-5309" type="text" />
            <FormField name="personalNotes" label="Personal notes" component="textarea" placeholder="Any extra notes about this traveler" className="d-block" />
        </ModalForm>
    )
}
