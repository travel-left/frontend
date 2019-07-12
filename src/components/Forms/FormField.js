import React from 'react'
import { ErrorMessage, Field } from 'formik'

/**
 * Component for managing Formik Field and ErrorMessage Component
 * @param {{name: string!, placeholder: string!, label: string!, type: string}} props Data passed in from the parent element
 */
export default function FormField({ name, placeholder, label, type }) {
    if (!type) {
        type = 'text'
    }
    return (
        <>
            <span className="d-block text-danger">
                <ErrorMessage name={name} />
            </span>
            <label htmlFor={name} className="d-block">
                {label}
            </label>
            <Field name={name} type={type} placeholder={placeholder} className="d-block form-control" />
        </>
    )
}
