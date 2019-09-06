import React from 'react'

export default ({ items, update, remove, C, currentUserId }) =>
    items.map(item => (
        <C
            {...item}
            update={update}
            currentUserId={currentUserId}
            remove={remove}
            key={item._id}
        />
    ))
