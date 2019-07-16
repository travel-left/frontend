import React from 'react'
import moment from 'moment-timezone'
import FormField from '../../../util/forms/FormField'
import SelectField from '../../../util/forms/SelectField'
import Uploader from '../../../util/forms/Uploader'
import * as Yup from 'yup'
import ModalForm from '../../../util/forms/ModalForm'
import { nameValidator, dateValidator, fileValidator, descriptionValidator } from '../../../util/validators'

export default function EventForm(props) {
    const edit = props.formType === 'edit'
    const { event } = props
    const initialValues = {
        title: edit ? event.title : '',
        tzStart: edit ? event.tzStart.replace(' ', '_') : moment.tz.guess(),
        tzEnd: edit ? event.tzEnd.replace(' ', '_') : moment.tz.guess(),
        category: edit ? event.category : 'Category',
        summary: edit ? event.summary : '',
        image: edit ? event.image : '',
        link: edit ? event.link : '',
        linkText: edit ? event.linkText : '',
        dateStart: edit ? event.dateStart : props.initDay.split('T')[0],
        timeStart: edit ? event.dtStart.split(' ')[0] : '09:00',
        dateEnd: edit ? event.dateEnd : props.initDay.split('T')[0],
        timeEnd: edit ? event.dtEnd.split(' ')[0] : '12:00'
    }

    let names = moment.tz.names().map(name => {
        const offset = moment.tz(name).format('Z')
        const abbrev = moment.tz(name).format('z')
        return {
            name: `(UTC${offset}) ${name.replace('_', ' ')} (${abbrev})`,
            value: name,
            offset: offset
        }
    })

    names = names.sort((f, s) => {
        return parseInt(f.offset, 10) - parseInt(s.offset, 10)
    })

    const categories = [
        {
            name: 'Category',
            value: '',
            hidden: true,
            default: true
        },
        {
            name: 'Lodging',
            value: 'lodging'
        },
        {
            name: 'Event',
            value: 'event'
        },
        {
            name: 'Transportation',
            value: 'transportation'
        },
        {
            name: 'Flight',
            value: 'flight'
        }
    ]

    const editButton = {
        classes: 'btn btn btn-secondary text-light',
        text: 'edit'
    }

    const submitButton = {
        classes: 'btn-primary btn-lg text-light mx-5 my-2',
        text: 'Add Event'
    }

    const schema = Yup.object().shape({
        title: nameValidator,
        tzStart: Yup.string('Time zone must be a string'),
        tzEnd: Yup.string('Time zone must be a string'),
        category: Yup.string('Category must be a string'),
        summary: descriptionValidator,
        image: fileValidator,
        link: Yup.string('Link must be a string'),
        linkText: Yup.string('Link text must be a string'),
        dateStart: dateValidator,
        timeStart: Yup.string('Time is not valid'),
        dateEnd: dateValidator,
        timeEnd: Yup.string('Time is not valid')
    })

    const formTypeStyle = edit ? { button: editButton } : { button: submitButton }
    return (
        <ModalForm {...formTypeStyle} title="Add an Event" validationSchema={schema} initialValues={initialValues} submit={props.submit}>
            <div className="form-row">
                <div className="col-6">
                    <FormField name="title" label="Title" placeholder="Title" />
                </div>
                <div className="col-6">
                    <SelectField name="category" options={categories} label="Categories" />
                </div>
            </div>
            <div className="form-row">
                <div className="col-6">
                    <FormField name="dateStart" label="Start Time" type="date" />
                </div>
                <div className="col-6">
                    <FormField name="dateEnd" label="End Time" type="date" />
                </div>
            </div>
            <div className="form-row">
                <div className="col-6">
                    <FormField name="timeStart" type="time" />
                </div>
                <div className="col-6">
                    <FormField name="timeEnd" type="time" />
                </div>
            </div>
            <div className="form-row">
                <div className="col-6">
                    <SelectField name="tzStart" options={names} />
                </div>
                <div className="col-6">
                    <SelectField name="tzEnd" options={names} />
                </div>
            </div>
            <FormField component="textarea" name="summary" cols="70" rows="2" placeholder="A summary of your event" />
            <div className="form-row">
                <div className="col-6">
                    <FormField name="image" component={Uploader} label="Image Link" />
                </div>
                <div className="col-6">
                    <FormField name="link" placeholder="https://travel-left.com" type="link" label="Link about Event" />
                </div>
            </div>
            <FormField name="linkText" placeholder="name of your link" />
        </ModalForm>
    )
}
