import React from 'react'

export default ({ text, total, active, handleClick }) => {
    let classes =
        'list-group-item d-flex justify-content-between align-items-center border-right-0 border-left-0'
    if (active) {
        classes += ' active'
    } else {
        classes += ' text-dark'
    }
    return (
        <a href="/" className={classes} onClick={handleClick} name={text}>
            {text}
            <span className="badge badge-primary badge-pill">{total}</span>
        </a>
    )
}