import React from 'react'
import Traveler from './Traveler'
import Card from '@material-ui/core/Card'

export default ({ items, update, selected, remove, toggle, doubleClick, showTrip }) =>
    <Card style={{ marginTop: 16, marginBottom: 16 }}>
        {items.map((item, index) => (
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
        ))}
    </Card>


