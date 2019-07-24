import React from 'react'
import moment from 'moment-timezone'
import FormField from '../../../util/forms/FormField'
import SelectField from '../../../util/forms/SelectField'
import Uploader from '../../../util/forms/Uploader'
import ModalForm from '../../../util/forms/ModalForm'
import { schema, types, timezones } from "./EventHelpers"

export default function CreateEventForm({ submit, initDay }) {
    const initialValues = {
        name: '',
        tzStart: moment.tz.guess(),
        tzEnd: moment.tz.guess(),
        type: 'Category',
        description: '',
        image: '',
        link: '',
        linkDescription: '',
        dateStart: initDay.split('T')[0],
        timeStart: '09:00',
        dateEnd: initDay.split('T')[0],
        timeEnd: '12:00'
    }

    const button = {
        classes: 'btn-primary btn-lg',
        text: 'New Event'
    }

    return (
        <ModalForm button={button} header="Add an Event" validationSchema={schema} initialValues={initialValues} submit={submit}>
            <div className="form-row">
                <div className="col-6">
                    <FormField name="name" label="Name" placeholder="Name" />
                </div>
                <div className="col-6">
                    <SelectField name="type" options={types} label="Type" />
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
                    <SelectField name="tzStart" options={timezones} />
                </div>
                <div className="col-6">
                    <SelectField name="tzEnd" options={timezones} />
                </div>
            </div>
            <FormField component="textarea" name="description" cols="70" rows="2" placeholder="A description of your event" label='Description' />
            <div className="form-row">
                <div className="col-10">
                    <FormField name="image" component={Uploader} label="Image" />
                </div>
            </div>
            <div className="form-row">
                <div className="col-6">
                    <FormField name="link" placeholder="https://travel-left.com" type="link" label="Link" />
                </div>
                <div className="col-6">
                    <FormField name="linkDescription" placeholder="Link description" label='Link description' />
                </div>
            </div>

        </ModalForm>
    )
}
