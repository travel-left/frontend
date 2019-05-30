import React from 'react'
import Contact from './Contact'

const ContactList = ({ contacts }) => {
    let list = contacts.map(c => {
        return <Contact name={c.firstName + ' ' + c.lastName} phone={c.phone} email={c.email} photo={c.photo} />
    })

    return (
        <ul className="list-group" style={{ display: 'flex', flexDirection: 'column' }}>
            {list}
        </ul>
    )
}

export default ContactList
