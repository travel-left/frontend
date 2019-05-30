import React from 'react'
import Document from './Document'

const DocumentList = ({ documents }) => {
    let list = documents.map(d => {
        return <Document name={d.name} key={d._id} description={d.description} link={d.link} />
    })

    return (
        <ul className="row" className="list-group" style={{ display: 'flex', flexDirection: 'column' }}>
            {list}
        </ul>
    )
}

export default DocumentList
