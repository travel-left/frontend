import React from 'react'
import Traveler from './Traveler'

export default ({ items, update, selected, remove, toggle, doubleClick }) =>
    items.map(item => (
        <Traveler
            {...item}
            selected={selected[item._id]}
            update={update}
            remove={remove}
            key={item._id}
            toggle={toggle}
            onDoubleClick={doubleClick}
        />
    ))
