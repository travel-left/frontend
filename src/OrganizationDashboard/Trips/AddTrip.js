import React from 'react'
import * as Yup from 'yup'
import ModalForm from '../../util/forms/ModalForm'
import Uploader from '../../util/forms/Uploader'
import FormField from '../../util/forms/FormField'
import moment from 'moment'
import { ErrorMessage, Field } from 'formik'
import { DatePicker } from 'antd'
import 'antd/es/date-picker/style/css'
import 'react-dates/initialize'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import {
    dateValidator,
    nameValidator,
    descriptionValidator
} from '../../util/validators'

export default function AddTrip({ submit }) {
    const initialValues = {
        name: '',
        image: 'https://',
        dateStart: '',
        dateEnd: '',
        description: '',
        date: [moment(), moment()]
    }

    const schema = Yup.object().shape({
        name: nameValidator,
        image: Yup.string().required('Please upload an image'),
        description: descriptionValidator
    })

    const button = {
        classes: 'btn btn-lg btn-primary AddTrip-button',
        text: 'ADD NEW TRIP'
    }

    const { RangePicker } = DatePicker
    const CustomInputComponent = ({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        ...props
    }) => (
            <div>
                <RangePicker {...field} {...props} onChange={e => setFieldValue('date', e)} />
                {touched[field.name] &&
                    errors[field.name] && <div className="error">{errors[field.name]}</div>}
            </div>
        )

    return (
        <ModalForm
            button={button}
            header="Create your new trip"
            validationSchema={schema}
            initialValues={initialValues}
            submit={submit}
        >
            <FormField name="name" label="Name*" placeholder="Austrailia" />
            <FormField
                name="image"
                label="Upload an image*"
                component={Uploader}
            />
            <label htmlFor="date" className="d-block Modal-Form-label">
                TRIP DATES
            </label>
            <Field name='date' component={CustomInputComponent} />
            <FormField
                name="description"
                label="Trip Description"
                component="textarea"
                placeholder="A description for your trip"
                className="d-block"
            />
        </ModalForm>
    )
}
