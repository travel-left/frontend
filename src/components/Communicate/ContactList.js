import React from 'react'
import Contact from './Contact'

const ContactList = ({ contacts }) => {
    let list = contacts.map(c => {
        return <Contact name={c.firstName + ' ' + c.lastName} phone={c.phone} email={c.email} photo={c.photo} />
    })

    return (
        <div className="row" style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
            {list}
        </div>
    )
}

export default ContactList
