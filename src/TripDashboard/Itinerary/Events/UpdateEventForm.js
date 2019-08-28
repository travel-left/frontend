import React from 'react'
import FormField from '../../../util/forms/FormField'
import SelectField from '../../../util/forms/SelectField'
import Uploader from '../../../util/forms/Uploader'
import ModalForm from '../../../util/forms/ModalForm'
import { schema, types, timezones } from './EventHelpers'
import { FieldArray } from 'formik'
import moment from 'moment'

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
        timeStart: moment(event.dtStart, ["h:mm A"]).format("HH:mm"),
        dateEnd: event.dateEnd,
        timeEnd: moment(event.dtEnd, ["h:mm A"]).format("HH:mm"),
    }

    return (
        <ModalForm
            icon="hover fas fa-ellipsis-h text-muted float-right"
            header="Edit your event"
            validationSchema={schema}
            initialValues={initialValues}
            submit={props.submit}
            remove={props.remove}
        >
            <div className="form-row">
                <div className="col-6">
                    <FormField name="name" label="Name*" placeholder="Name" />
                </div>
                <div className="col-6">
                    <SelectField name="type" options={types} label="Type" />
                </div>
            </div>
            <div className="form-row">
                <div className="col-6">
                    <FormField
                        name="dateStart"
                        label="Start Time*"
                        type="date"
                    />
                </div>
                <div className="col-6">
                    <FormField name="dateEnd" label="End *" type="date" />
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
            <div className="mt-2">Documents</div>

            <FieldArray name="documents">
                {({ form, push, remove }) => (
                    <>
                        {form.values.documents.map((_doc, index) => (
                            <>
                                <div className="card shadow p-4 mt-3">
                                    <div key={index * 2} className="form-row">
                                        <div className="col-4">
                                            <FormField
                                                name={`documents.${index}.name`}
                                                label="Name"
                                                placeholder="Document Name"
                                            />
                                        </div>

                                        <div className="col-8">
                                            <FormField
                                                name={`documents.${index}.description`}
                                                label="Description"
                                                placeholder="A description for your document"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        key={index * 2 + 1}
                                        className="form-row"
                                    >
                                        <div className="col-12">
                                            <FormField
                                                name={`documents.${index}.link`}
                                                component={Uploader}
                                                label=""
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-md btn-danger float-right mt-2"
                                                onClick={() => remove(index)}
                                            >
                                                remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}

                        <button
                            key="b"
                            type="button"
                            className="btn btn-secondary text-light mt-3"
                            onClick={() =>
                                push({
                                    link: 'https://',
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
