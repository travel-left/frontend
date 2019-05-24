import React, { Component } from 'react'
import DocumentForm from './DocumentForm'
import DocumentList from './DocumentList'
import { apiCall } from '../../services/api'

class Documents extends Component {
    state = {
        documents: [],
        showDocumentsList: false
    }

    constructor(props) {
        super(props)
        this.getDocuments()
    }

    getDocuments() {
        const id = this.props.currentTrip._id
        apiCall('get', `/api/documents/${id}`).then(documents => {
            if (documents.length > 0) {
                this.setState({
                    documents: documents,
                    showDocumentsList: true
                })
            }
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
        let showDocumentsList = this.state.showDocumentsList ? <DocumentList documents={documents} /> : null
        return (
            <>
                <DocumentForm submit={this.handleSubmit} />
                {showDocumentsList}
            </>
        )
    }
}

export default Documents
