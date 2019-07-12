import React, { Component } from 'react'
import { Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

class AddTrip extends Component {

    constructor(props) {
        super(props)

        this.InitialSchema = {
            name: '',
            image: '',
            dateStart: '',
            dateEnd: '',
            description: ''
        }

        this.NewTripSchema = Yup.object().shape({
            name: Yup.string()
                .min(2, 'Please enter a longer trip name')
                .max(50, 'Please enter a shorter trip name')
                .required('Please enter a trip name'),
            image: Yup.string()
                .required('Please upload an image'),
            dateStart: Yup.string()
                .required('Please enter a start date'),
            dateEnd: Yup.string()
                .required('Please enter an end date'),
            description: Yup.string()
                .min(2, 'Please enter a longer description')
                .max(50, 'Please enter a short description')
                .required('Please enter a description'),
        })
    }

    render() {
        return (
            <ModalForm button={{ classes: 'btn btn-lg btn-primary', text: 'NEW TRIP' }} title='Create your new trip' validationSchema={this.NewTripSchema} initialValues={this.InitialSchema} submit={this.props.submit} >
                <span className='d-block text-danger'>
                    <ErrorMessage name="name" />
                </span>
                <label htmlFor="name" className='d-block'>Trip name</label>
                <Field name="name" placeholder="Austrailia" className='d-block'></Field>
                <Field component={Uploader} />
                <span className='d-block text-danger'>
                    <ErrorMessage name="dateStart" />
                </span>
                <label htmlFor="dateStart" className='d-block'>Start date</label>
                <Field name="dateStart" type="date" placeholder="23/23/2343" className='d-block'></Field>
                <span className='d-block text-danger'>
                    <ErrorMessage name="dateEnd" />
                </span>
                <label htmlFor="dateEnd" className='d-block'>End date</label>
                <Field name="dateEnd" type="date" placeholder="12/12/1234" className='d-block'></Field>
                <span className='d-block text-danger'>
                    <ErrorMessage name="description" />
                </span>
                <label htmlFor="description" className='d-block'>Description</label>
                <Field name="description" type="textarea" placeholder="A description for your trip" className='d-block'></Field>
            </ModalForm>

        )
    }
}

export default AddTrip

