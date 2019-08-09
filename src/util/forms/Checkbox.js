import React from 'react'

export default ({ name = '', label = '', className, checked, onChange }) => (
    <div
        className={`custom-control custom-checkbox ${className} hover`}
        // onClick={onChange}
        onClick={label === 'noshow' ? onChange : null}
    >
        <input
            type="checkbox"
            className="custom-control-input hover"
            checked={checked}
            name={name}
            onChange={onChange}
            id={name}
        />
        <label htmlFor={name} className="custom-control-label hover">
            {label && label !== 'noshow' ? label : null}
        </label>
    </div>
)
