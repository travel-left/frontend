import React from 'react'

export default ({ name = '', label = '', className, checked, onChange }) => (
    <div
        className={`d-block custom-control custom-checkbox ${className}`}
        onClick={onChange}
    >
        <input
            type="checkbox"
            className="custom-control-input"
            checked={checked}
            name={name}
            onChange={onChange}
        />
        <label htmlFor={name} className="custom-control-label">
            {label}
        </label>
    </div>
)
