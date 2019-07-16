import React from 'react'
import { ErrorMessage, Field } from 'formik'

/**
 * Component for managing Formik Field and ErrorMessage Component
 * @param {{name: string!, placeholder: string!, label: string!, type: string}} props Data passed in from the parent element
 */
export default function FormField({ name, placeholder, label, type, component, className }) {
    if (!type) {
        type = 'text'
    }

    if (!className) {
        className = ''
    }

    const displayLabel = label ? (
        <label htmlFor={name} className="d-block">
            {label}
        </label>
    ) : null

    return (
        <div >
            <span className="d-block text-danger">
                <ErrorMessage name={name} />
            </span>
            {displayLabel}
            <Field name={name} type={type} placeholder={placeholder} component={component} className={`d-block form-control ${className}`} />
        </div>
    )
}
