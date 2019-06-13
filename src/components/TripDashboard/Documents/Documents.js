import React, { Component } from 'react'
import DocumentForm from './DocumentForm'
import DocumentList from './DocumentList'
import { apiCall } from '../../../util/api'
import Alert from '../../Other/Alert'
import DashboardHeader from '../../Other/DashboardHeader'
import SideBar from '../SideBar'

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
        let cohortId = this.props.currentCohort._id

        apiCall('get', `/api/trips/${tripId}/cohorts/${cohortId}/documents`).then(documents => {
            this.setState({
                documents: documents.length > 0 ? documents : null,
                showDocumentsList: documents.length > 0 ? true : false
            })
        })
    }

    handleSubmit = doc => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.props.currentCohort._id

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
                <div className="row">
                    <div className="col-12">
                        <Alert text="Insert links to the most important documents for your travelers here." />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <DashboardHeader title="Documents" description="Add all of the important documents to share with your travelers here." currentTrip={this.props.currentTrip} />
                        {documentsList}
                    </div>
                    <SideBar ctr={[<DocumentForm submit={this.handleSubmit} />]} />
                </div>
            </div>
        )
    }
}

export default Documents
