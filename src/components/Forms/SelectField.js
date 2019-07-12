import React from 'react'
import { ErrorMessage, Field } from 'formik'
import OptionList from './OptionList'

/**
 * Component for managing Formik Field and ErrorMessage Component
 * @param {name: string!, placeholder: string!, label: string!, type: string} props Data passed in from the parent element
 */
export default function SelectField({ name, options, label }) {
    return (
        <>
            <span className="d-block text-danger">
                <ErrorMessage name={name} />
            </span>
            <label htmlFor={name} className="d-block">
                {label}
            </label>
            <Field name={name} component="select" className="d-block form-control">
                <OptionList options={options} />
            </Field>
        </>
    )
}
