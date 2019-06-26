import React from 'react'
import Document from './Document'

const DocumentList = ({ documents }) => {
    let list = documents.map(d => {
        return <Document name={d.name} key={d._id} description={d.description} link={d.link} />
    })

    return (
        <div className="row justify-content-center">
            {list}
        </div>
    )
}

export default DocumentList
