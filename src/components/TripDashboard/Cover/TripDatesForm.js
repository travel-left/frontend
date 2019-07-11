import React from 'react'
import Moment from 'react-moment'
import FormField from '../../Forms/FormField'
import * as Yup from 'yup'
import ModalForm from '../../Forms/ModalForm'

export default function TripDatesForm({ dateStart, dateEnd, submit }) {
    const initialValues = {
        dateStart: dateStart.split('T')[0],
        dateEnd: dateEnd.split('T')[0]
    }

    const dateValidator = Yup.date()
        .min(new Date(), 'Please enter a date in the future')
        .required('Please enter a date')

    const schema = Yup.object().shape({
        dateStart: dateValidator,
        dateEnd: dateValidator
    })
    return (
        <>
            <h5 className="text-light hover" data-toggle="modal" data-target="#newDates">
                <Moment date={dateStart} format="MMMM DD" /> {' - '} <Moment date={dateEnd} format="MMMM DD" /> <i class="far fa-calendar-alt" />
            </h5>
            <ModalForm icon="far fa-edit fa-2x text-primary text-secondary" title="Trip name" validationSchema={schema} initialValues={initialValues} submit={submit}>
                <FormField name="dateStart" label="Trip Start Date" placeholder={initialValues.dateStart} type="date" />
                <FormField name="dateEnd" label="Trip End Date" placeholder={initialValues.dateEnd} type="date" />
            </ModalForm>
        </>
    )
}
