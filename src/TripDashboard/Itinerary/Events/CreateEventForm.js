import React from 'react'
import moment from 'moment-timezone'
import FormField from '../../../util/forms/FormField'
import SelectField from '../../../util/forms/SelectField'
import Uploader from '../../../util/forms/Uploader'
import ModalForm from '../../../util/forms/ModalForm'
import { schema, types, timezones } from './EventHelpers'
import { FieldArray } from 'formik'

export default function CreateEventForm({ submit, initDay }) {
    const initialValues = {
        name: '',
        tzStart: moment.tz.guess(),
        tzEnd: moment.tz.guess(),
        type: 'Category',
        description: '',
        documents: [
            {
                name: '',
                link: '',
                description: ''
            }
        ],
        links: [
            {
                link: '',
                description: ''
            }
        ],
        address: '',
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
        <ModalForm
            button={button}
            header="Add an Event"
            validationSchema={schema}
            initialValues={initialValues}
            submit={submit}
        >
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
                    <SelectField name="tzStart" options={timezones} />
                </div>
                <div className="col-6">
                    <SelectField name="tzEnd" options={timezones} />
                </div>
            </div>
            <FormField
                component="textarea"
                name="description"
                cols="70"
                rows="2"
                placeholder="A description of your event"
                label="Description"
            />
            <FormField
                name="address"
                label="Address"
                placeholder="1 World Way, Los Angeles, CA, US"
            />
            <FieldArray name="links">
                {({ form, push, remove }) => (
                    <>
                        {form.values.links.map((_document, index) => (
                            <div key={index} className="form-row">
                                <div className="col-5">
                                    <FormField
                                        name={`links.${index}.link`}
                                        type="url"
                                        label="Link"
                                    />
                                </div>

                                <div className="col-5">
                                    <FormField
                                        name={`links.${index}.description`}
                                        label="Description"
                                    />
                                </div>

                                <div className="col-2 mt-5">
                                    <button
                                        type="button"
                                        className="d-block btn btn-primary"
                                        onClick={() => remove(index)}
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="form-row">
                            <button
                                type="button"
                                className="btn btn-primary btn-lg mt-3"
                                onClick={() =>
                                    push({ link: '', description: '' })
                                }
                            >
                                +
                            </button>
                        </div>
                    </>
                )}
            </FieldArray>
            <FieldArray name="documents">
                {({ form, push, remove }) => (
                    <>
                        {form.values.documents.map((_doc, index) => (
                            <>
                                <div key={index * 2} className="form-row">
                                    <div className="col-4">
                                        <FormField
                                            name={`documents.${index}.name`}
                                            label="Document Name"
                                        />
                                    </div>

                                    <div className="col-8">
                                        <FormField
                                            name={`documents.${index}.description`}
                                            label="Document Description"
                                        />
                                    </div>
                                </div>
                                <div key={index * 2 + 1} className="form-row">
                                    <div className="col-10">
                                        <FormField
                                            name="image"
                                            component={Uploader}
                                            label="Upload a Document"
                                        />
                                    </div>
                                    <div className="col-2 mt-5">
                                        <button
                                            type="button"
                                            className="d-block btn btn-primary"
                                            onClick={() => remove(index)}
                                        >
                                            -
                                        </button>
                                    </div>
                                </div>
                            </>
                        ))}
                        <div key="b" className="form-row">
                            <button
                                type="button"
                                className="btn btn-primary btn-lg mt-3"
                                onClick={() =>
                                    push({
                                        link: '',
                                        description: '',
                                        name: ''
                                    })
                                }
                            >
                                +
                            </button>
                        </div>
                    </>
                )}
            </FieldArray>
        </ModalForm>
    )
}
