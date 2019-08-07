import React from 'react'
import Moment from 'react-moment'
import FormField from '../../util/forms/FormField'
import * as Yup from 'yup'
import ModalForm from '../../util/forms/ModalForm'
import { dateValidator } from '../../util/validators'

export default function TripDatesForm({ dateStart, dateEnd, submit }) {
    const initialValues = {
        dateStart: dateStart.split('T')[0],
        dateEnd: dateEnd.split('T')[0]
    }

    const schema = Yup.object().shape({
        dateStart: dateValidator,
        dateEnd: dateValidator
    })

    const dateStartMoment = dateStart.split('T')[0]
    const dateEndMoment = dateEnd.split('T')[0]

    const button = {
        classes: 'text-light hover',
        text: (
            <h5 className='left-shadow'>
                <Moment date={dateStartMoment} format="MMMM DD" /> {' - '}{' '}
                <Moment date={dateEndMoment} format="MMMM DD" />{' '}
                <i className="far fa-calendar-alt ml-1" />
            </h5>
        )
    }
    return (
        <ModalForm
            button={button}
            header="Trip dates"
            validationSchema={schema}
            initialValues={initialValues}
            submit={submit}
        >
            <FormField
                name="dateStart"
                label="Trip Start Date"
                placeholder={initialValues.dateStart}
                type="date"
            />
            <FormField
                name="dateEnd"
                label="Trip End Date"
                placeholder={initialValues.dateEnd}
                type="date"
            />
        </ModalForm>
    )
}
