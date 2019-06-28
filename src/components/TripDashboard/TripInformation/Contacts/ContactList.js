import React from 'react'
import Contact from './Contact'

const ContactList = ({ contacts, updateContact }) => {
    let list = contacts.map(c => {
        return <Contact updateContact={updateContact} name={c.firstName + ' ' + c.lastName} _id={c._id} phone={c.phone} email={c.email} photo={c.photo} key={c._id} />
    })

    return (
        list
    )
}

export default ContactList
