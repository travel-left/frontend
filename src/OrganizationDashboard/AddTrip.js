import React from 'react'
import * as Yup from 'yup'
import ModalForm from '../util/forms/ModalForm'
import Uploader from '../util/forms/Uploader'
import FormField from '../util/forms/FormField'
import { dateValidator, nameValidator, descriptionValidator } from '../util/validators'

export default function AddTrip({ submit }) {
    const initialValues = {
        name: '',
        image: '',
        dateStart: '',
        dateEnd: '',
        description: ''
    }

    const schema = Yup.object().shape({
        name: nameValidator,
        image: Yup.string().required('Please upload an image'),
        dateStart: dateValidator,
        dateEnd: dateValidator,
        description: descriptionValidator
    })

    const button = {
        classes: 'btn btn-lg btn-primary',
        text: 'NEW TRIP'
    }

    return (
        <ModalForm button={button} title="Create your new trip" validationSchema={schema} initialValues={initialValues} submit={submit}>
            <FormField name="name" label="Name" placeholder="Austrailia" />
            <FormField name="image" label="Upload an image" component={Uploader} />
            <FormField name="dateStart" label="Trip Start Date" placeholder={initialValues.dateStart} type="date" />
            <FormField name="dateEnd" label="Trip End Date" placeholder={initialValues.dateEnd} type="date" />
            <FormField name="description" label="Trip Description" component="textarea" placeholder="A description for your trip" className="d-block" />
        </ModalForm>
    )
}
