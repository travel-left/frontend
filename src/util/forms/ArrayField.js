import React from 'react'
import { ErrorMessage, FieldArray, Field, Form } from 'formik'

/**
 * Component for managing Formik Field and ErrorMessage Component
 * @param {{name: string!, properties: [{name: string!, placeholder: string! label: string!, type: string, component: Object, render: object}]!}} props Data passed in from the parent element
 */
const ArrayField = ({ name, properties }) => {
    return (
        <div className="mt-2">
            <FieldArray
                name={name}
                conponent={({ push, remove, form }) => {
                    const labels = properties.map(p =>
                        p.label ? (
                            <label
                                htmlFor={`${name}.${p.name}`}
                                className="d-block"
                            >
                                {p.label}
                            </label>
                        ) : null
                    )

                    // const nProp = Object.keys(properties).length

                    const rows = form.values[name].map((_value, i) => {
                        const fields = properties.map(p => (
                            <div>
                                <span className="d-block text-danger">
                                    <ErrorMessage
                                        name={`${name}.${i}.${p.name}`}
                                    />
                                </span>
                                <Field
                                    name={`${name}.${i}.${p.name}`}
                                    type={p.type || 'text'}
                                    placeholder={p.placeholder}
                                    render={p.render}
                                    component={p.component}
                                    className={`d-block form-control ${p.className ||
                                        ''}`}
                                />
                            </div>
                        ))

                        return (
                            <div key={i} className="form-row">
                                {fields}
                                <button type="button" onClick={() => remove(i)}>
                                    -
                                </button>
                            </div>
                        )
                    })

                    return (
                        <>
                            {labels}
                            <Form>{rows}</Form>
                            <button
                                type="button"
                                onClick={() => push({ name: '', age: '' })}
                            >
                                +
                            </button>
                        </>
                    )
                }}
            />
        </div>
    )
}

export default ArrayField
