import React from 'react'
import Moment from 'react-moment'
import FormField from '../../Forms/FormField'
import * as Yup from 'yup'
import ModalForm from '../../Forms/ModalForm'
import { dateValidator } from '../../../util/validators'

export default function TripDatesForm({ dateStart, dateEnd, submit }) {
    const initialValues = {
        dateStart: dateStart.split('T')[0],
        dateEnd: dateEnd.split('T')[0]
    }

    const schema = Yup.object().shape({
        dateStart: dateValidator,
        dateEnd: dateValidator
    })

    const button = {
        classes: 'text-light',
        text: (
            <h5>
                <Moment date={dateStart} format="MMMM DD" /> {' - '} <Moment date={dateEnd} format="MMMM DD" /> <i class="far fa-calendar-alt" />
            </h5>
        )
    }
    return (
        <ModalForm button={button} title="Trip name" validationSchema={schema} initialValues={initialValues} submit={submit}>
            <FormField name="dateStart" label="Trip Start Date" placeholder={initialValues.dateStart} type="date" />
            <FormField name="dateEnd" label="Trip End Date" placeholder={initialValues.dateEnd} type="date" />
        </ModalForm>
    )
}
