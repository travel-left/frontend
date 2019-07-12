import React from 'react'
import { Field } from 'formik'
import * as Yup from 'yup'
import ModalForm from '../Forms/ModalForm'
import Uploader from '../Other/Uploader'
import FormField from '../Forms/FormField'
import { dateValidator } from '../../util/validators'

export default function AddTrip({ submit }) {
    const initialValues = {
        name: '',
        image: '',
        dateStart: '',
        dateEnd: '',
        description: ''
    }

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Please enter a longer trip name')
            .max(50, 'Please enter a shorter trip name')
            .required('Please enter a trip name'),
        image: Yup.string()
            .required('Please upload an image'),
        dateStart: dateValidator,
        dateEnd: dateValidator,
        description: Yup.string()
            .min(2, 'Please enter a longer description')
            .max(50, 'Please enter a short description')
            .required('Please enter a description'),
    })


    const button = {
        classes: 'btn btn-lg btn-primary',
        text: 'NEW TRIP'
    }

    return (
        <ModalForm button={button} title='Create your new trip' validationSchema={schema} initialValues={initialValues} submit={submit} >
            <FormField name="name" label="Name" placeholder="Austrailia" />
            <Field component={Uploader} />
            <FormField name="dateStart" label="Trip Start Date" placeholder={initialValues.dateStart} type="date" />
            <FormField name="dateEnd" label="Trip End Date" placeholder={initialValues.dateEnd} type="date" />
            <FormField name="description" label="Trip Description" component="textarea" placeholder="A description for your trip" className='d-block' />
        </ModalForm>

    )
}

