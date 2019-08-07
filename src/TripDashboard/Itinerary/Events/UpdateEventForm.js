import React from 'react'
import FormField from '../../../util/forms/FormField'
import SelectField from '../../../util/forms/SelectField'
import Uploader from '../../../util/forms/Uploader'
import ModalForm from '../../../util/forms/ModalForm'
import { schema, types, timezones } from './EventHelpers'
import { FieldArray } from 'formik'

export default function UpdateEventForm(props) {
    const { event } = props

    const initialValues = {
        name: event.name,
        tzStart: event.tzStart.replace(' ', '_'),
        tzEnd: event.tzEnd.replace(' ', '_'),
        type: event.type,
        description: event.description,
        documents: event.documents,
        address: event.address,
        dateStart: event.dateStart,
        timeStart: event.dtStart.split(' ')[0],
        dateEnd: event.dateEnd,
        timeEnd: event.dtEnd.split(' ')[0]
    }

    return (
        <ModalForm
            icon="hover far fa-edit fa-2x text-secondary"
            header="Edit your event"
            validationSchema={schema}
            initialValues={initialValues}
            submit={props.submit}
            remove={props.remove}
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
                placeholder="A summary of your event"
                label="Event summary"
            />
            <FormField
                name="address"
                label="Address"
                placeholder="1 World Way, Los Angeles, CA, US"
            />
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
                                            placeholder="A form to fill out"
                                        />
                                    </div>

                                    <div className="col-8">
                                        <FormField
                                            name={`documents.${index}.description`}
                                            label="Document Description"
                                            placeholder="Please fill out"
                                        />
                                    </div>
                                </div>
                                <div key={index * 2 + 1} className="form-row">
                                    <div className="col-10">
                                        <FormField
                                            name={`documents.${index}.link`}
                                            component={Uploader}
                                            label="Upload a Document"
                                        />
                                    </div>
                                    <div className="col-2 mt-5">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger float-right"
                                            onClick={() => remove(index)}
                                        >
                                            -
                                        </button>
                                    </div>
                                </div>
                            </>
                        ))}
                        <button
                            key="b"
                            type="button"
                            className="btn btn-primary btn-sm ml-1"
                            onClick={() =>
                                push({
                                    link: '',
                                    description: '',
                                    name: ''
                                })
                            }
                        >
                            Add Another Document
                        </button>
                    </>
                )}
            </FieldArray>
        </ModalForm>
    )
}
