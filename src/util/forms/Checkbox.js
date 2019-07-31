import React from 'react'

export default ({
    name = '',
    label = '',
    className,
    checked,
    handleChange
}) => (
    <div
        className={`d-block custom-control custom-checkbox ${className}`}
        onClick={handleChange}
    >
        <input
            type="checkbox"
            className="custom-control-input"
            checked={checked}
            name={name}
            onChange={handleChange}
        />
        <label htmlFor={name} className="custom-control-label">
            {label}
        </label>
    </div>
)
