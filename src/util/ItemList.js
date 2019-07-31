import React from 'react'

export default ({ items, update, remove, C }) =>
    items.map(item => (
        <C {...item} update={update} remove={remove} key={item._id} />
    ))
