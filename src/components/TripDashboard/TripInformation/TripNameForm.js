import React, { Component } from 'react'
import { Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import ModalForm from '../../Other/ModalForm'

class TripNameForm extends Component {

    state = {
        name: this.props.name
    }

    constructor(props) {
        super(props)

        this.TripNameSchema = Yup.object().shape({
            name: Yup.string()
                .min(2, 'Please enter a longer name')
                .max(50, 'Please enter a short name')
                .required('Please enter a trip name')
        })
    }

    render() {
        return (
            <ModalForm title='Trip name' validationSchema={this.TripNameSchema} initialValues={this.state} submit={this.props.submit} >
                <span className='d-block text-danger'>
                    <ErrorMessage name="name" />
                </span>
                <label htmlFor="name" className='d-block'>Trip name</label>
                <Field name="name" placeholder="Austrailia" className='d-block'></Field>
            </ModalForm>
        )
    }
}

export default TripNameForm