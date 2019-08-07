import React from 'react'

export default ({ name = '', label = '', className, checked, onChange }) => (
    <div
        className={`custom-control custom-checkbox ${className}`}
        // onClick={onChange}
        onClick={label === 'noshow' ? onChange : null}
    >
        <input
            type="checkbox"
            className="custom-control-input"
            checked={checked}
            name={name}
            onChange={onChange}
            id={name}
        />
        <label htmlFor={name} className="custom-control-label">
            {label && (label !== 'noshow')}
        </label>
    </div>
)
