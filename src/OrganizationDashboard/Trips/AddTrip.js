import React, { Component } from 'react'
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
        dates: {
            startDate: moment(),
            endDate: moment().add(7, 'days')
        },
        description: ''
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

    const CustomInputComponent = ({ field, form: { touched, errors, setFieldValue }, ...props }) => (
        <DateRangePickerWrapper {...field} {...props} onChange={e => setFieldValue('dates', e)} />
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
            <Field name='dates' component={CustomInputComponent} />
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

class DateRangePickerWrapper extends Component {
    state = {
        focusedInput: moment()
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.setState({
            startDate,
            endDate
        });
    }

    onFocusChange = (focusedInput) => {
        this.setState({ focusedInput });
    }

    render() {
        const { focusedInput } = this.state;
        const { value } = this.props
        console.log(this.props)
        return (
            <div>
                <DateRangePicker
                    onDatesChange={this.props.onChange}
                    onFocusChange={this.onFocusChange}
                    focusedInput={focusedInput}
                    startDate={value.startDate}
                    startDateId="your_unique_start_date_id"
                    endDateId="your_unique_end_date_id"
                    endDate={value.endDate}
                />
            </div>
        );
    }
}
