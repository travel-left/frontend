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
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required')
        })
    }

    render() {
        return (
            <ModalForm title='Trip name' validationSchema={this.TripNameSchema} initialValues={this.state} submit={this.props.submit} >
                <ErrorMessage name="name" />
                <label htmlFor="name">Trip name</label>
                <Field name="name" placeholder="Austrailia"></Field>
            </ModalForm>
        )
    }
}

export default TripNameForm