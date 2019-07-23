import React from 'react'
import moment from 'moment-timezone'
import FormField from '../../../util/forms/FormField'
import SelectField from '../../../util/forms/SelectField'
import Uploader from '../../../util/forms/Uploader'
import * as Yup from 'yup'
import ModalForm from '../../../util/forms/ModalForm'
import {
    nameValidator,
    dateValidator,
    fileValidator,
    descriptionValidator
} from '../../../util/validators'

export default function EventForm(props) {
    const { event } = props
    const initialValues = {
        title: event.title,
        tzStart: event.tzStart.replace(' ', '_'),
        tzEnd: event.tzEnd.replace(' ', '_'),
        category: event.category,
        summary: event.summary,
        image: event.image,
        link: event.link,
        linkText: event.linkText,
        dateStart: event.dateStart,
        timeStart: event.dtStart.split(' ')[0],
        dateEnd: event.dateEnd,
        timeEnd: event.dtEnd.split(' ')[0]
    }

    let timeZones = moment.tz.names().map(name => {
        const offset = moment.tz(name).format('Z')
        const abbrev = moment.tz(name).format('z')
        return {
            name: `(UTC${offset}) ${name.replace('_', ' ')} (${abbrev})`,
            value: name,
            offset: offset
        }
    })

    timeZones = timeZones.sort((f, s) => {
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
            value: 'LODGING'
        },
        {
            name: 'Event',
            value: 'EVENT'
        },
        {
            name: 'Transportation',
            value: 'TRANSPORTATION'
        },
        {
            name: 'Flight',
            value: 'FLIGHT'
        },
        {
            name: 'Other',
            value: 'OTHER'
        }
    ]

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

    return (
<<<<<<< HEAD:src/TripDashboard/Itinerary/Event/EventForm.js
        <ModalForm
            {...formTypeStyle}
            title="Add an Event"
            validationSchema={schema}
            initialValues={initialValues}
            submit={props.submit}
        >
=======
        <ModalForm icon='hover far fa-edit fa-2x text-secondary' header="Edit your event" validationSchema={schema} initialValues={initialValues} submit={props.submit} remove={props.remove}>
>>>>>>> develop:src/TripDashboard/Itinerary/Event/UpdateEventForm.js
            <div className="form-row">
                <div className="col-6">
                    <FormField name="title" label="Title" placeholder="Title" />
                </div>
                <div className="col-6">
                    <SelectField
                        name="category"
                        options={categories}
                        label="Categories"
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col-6">
                    <FormField
                        name="dateStart"
                        label="Start Time"
                        type="date"
                    />
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
                    <SelectField name="tzStart" options={timeZones} />
                </div>
                <div className="col-6">
                    <SelectField name="tzEnd" options={timeZones} />
                </div>
            </div>
<<<<<<< HEAD:src/TripDashboard/Itinerary/Event/EventForm.js
            <FormField
                component="textarea"
                name="summary"
                cols="70"
                rows="2"
                placeholder="A summary of your event"
            />
            <div className="form-row">
                <div className="col-6">
                    <FormField
                        name="image"
                        component={Uploader}
                        label="Image Link"
                    />
=======
            <FormField component="textarea" name="summary" cols="70" rows="2" placeholder="A summary of your event" label='Event summary' />
            <div className="form-row">
                <div className="col-10">
                    <FormField name="image" component={Uploader} label="Image Link" />
>>>>>>> develop:src/TripDashboard/Itinerary/Event/UpdateEventForm.js
                </div>
            </div>
            <div className="form-row">
                <div className="col-6">
                    <FormField name="link" placeholder="https://travel-left.com" type="link" label="Link" />
                </div>
                <div className="col-6">
<<<<<<< HEAD:src/TripDashboard/Itinerary/Event/EventForm.js
                    <FormField
                        name="link"
                        placeholder="https://travel-left.com"
                        type="link"
                        label="Link about Event"
                    />
=======
                    <FormField name="linkText" placeholder="link title" label='Link Title' />
>>>>>>> develop:src/TripDashboard/Itinerary/Event/UpdateEventForm.js
                </div>
            </div>

        </ModalForm>
    )
}
