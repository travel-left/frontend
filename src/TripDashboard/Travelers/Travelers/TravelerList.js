import React from 'react'

export default ({ items, update, remove, C, toggle, doubleClick }) =>
    items.map(item => (
        <C
            {...item}
            update={update}
            remove={remove}
            key={item._id}
            toggle={toggle}
            onDoubleClick={doubleClick}
        />
    ))
