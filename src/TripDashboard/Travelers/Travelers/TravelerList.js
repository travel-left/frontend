import React from 'react'
import Traveler from './Traveler'

export default ({ items, update, selected, remove, toggle, doubleClick }) =>
    items.map((item, index) => (
        <Traveler
            {...item}
            selected={selected[item._id] === true}
            update={update}
            remove={remove}
            key={item._id}
            toggle={toggle}
            onDoubleClick={doubleClick}
            index={index + 1}
        />
    ))


