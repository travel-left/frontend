import React from 'react'
import Traveler from './Traveler'

export default ({ items, update, selected, remove, toggle, doubleClick, showTrip }) =>
    items.map((item, index) => (
        <Traveler
            {...item}
            selected={item.selected === true}
            update={update}
            remove={remove}
            key={item._id}
            toggle={toggle}
            onDoubleClick={doubleClick}
            index={index + 1}
            showTrip={showTrip}
        />
    ))


