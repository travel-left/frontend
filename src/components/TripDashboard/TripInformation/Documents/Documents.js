import React, { Component } from 'react'
import DocumentList from './DocumentList'
import { apiCall } from '../../../../util/api'
import AddDocument from './AddDocument'

class Documents extends Component {
    state = {
        documents: [],
        showDocumentsList: false
    }

    constructor(props) {
        super(props)
        this.getDocuments()
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentCohort !== prevProps.currentCohort) {
            this.getDocuments()
        }
    }

    getDocuments() {
        let tripId = this.props.currentTrip._id
        let cohortId = this.props.currentTrip.cohorts[1]

        apiCall('get', `/api/trips/${tripId}/cohorts/${cohortId}/documents`).then(documents => {
            this.setState({
                documents: documents.length > 0 ? documents : null,
                showDocumentsList: documents.length > 0 ? true : false
            })
        })
    }

    handleSubmit = doc => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.props.currentTrip.cohorts[1]

        apiCall('post', `/api/trips/${tripId}/cohorts/${cohortId}/documents`, doc)
            .then(() => this.getDocuments())
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let { documents } = this.state
        let documentsList = this.state.showDocumentsList ? <DocumentList documents={documents} /> : null
        return (
            <div>
                <AddDocument submit={this.handleSubmit} />
                {documentsList}
            </div>
        )
    }
}

export default Documents
