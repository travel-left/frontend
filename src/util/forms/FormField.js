import React from 'react'
import { ErrorMessage, Field } from 'formik'

export default function FormField({
    name,
    placeholder,
    label,
    type,
    component,
    className,
    render
}) {
    if (!type) {
        type = 'text'
    }

    if (!className) {
        className = ''
    }

    const displayLabel = label ? (
        <label htmlFor={name} className="d-block Modal-Form-label">
            {label}
        </label>
    ) : null

    return (
        <div className="mt-2">
            <span className="d-block text-danger">
                <ErrorMessage name={name} />
            </span>
            {displayLabel}
            <Field
                name={name}
                type={type}
                placeholder={placeholder}
                render={render}
                component={component}
                className={`d-block form-control ${className}`}
            />
        </div>
    )
}
