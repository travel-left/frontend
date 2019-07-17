import React from 'react'
import Document from './Document'

const DocumentList = ({ documents, updateDocument, deleteDocument }) => {
    let list = documents.map(d => {
        return <Document name={d.name} key={d._id} description={d.description} link={d.link} _id={d._id} updateDocument={updateDocument} deleteDocument={deleteDocument} />
    })

    return (
        list
    )
}

export default DocumentList
