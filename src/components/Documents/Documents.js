import React, { Component } from 'react'
import DocumentForm from './DocumentForm'
import DocumentList from './DocumentList'
import { apiCall } from '../../services/api'

class Documents extends Component {
    state = {
        documents: []
    }

    constructor(props) {
        super(props)
        this.getDocuments()
    }

    getDocuments() {
        const id = this.props.currentTrip._id
        apiCall('get', `/api/documents/${id}`).then(documents => {
            this.setState(() => {
                return { documents: documents }
            })
        })
    }

    handleSubmit = e => {
        const id = this.props.currentTrip._id
        apiCall('post', `/api/documents/${id}`, e)
            .then(() => {
                console.log('Document Submitted')
                this.getDocuments()
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let documents = this.state.documents
        return (
            <>
                <DocumentForm submit={this.handleSubmit} />
                {documents.length > 0 ? <DocumentList documents={documents} /> : null}
            </>
        )
    }
}

export default Documents
