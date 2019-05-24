import React, { Component } from 'react'
import DocumentForm from './DocumentForm'
import DocumentList from './DocumentList'
import { apiCall } from '../../services/api'
import Alert from '../Other/Alert';
import DashboardHeader from "../Other/DashboardHeader";

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
        let documentsList = this.state.showDocumentsList ? <DocumentList documents={documents} /> : null
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <Alert />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <DashboardHeader title='Documents' description='Add all of the important documents to share with your travelers here.'/>
                        {documentsList}
                    </div>
                    <div className="col-4" style={{ backgroundColor: '#FBFBFB', height: '100vh', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px' }}>
                        <div class="card" style={{border: 'none', backgroundColor: '#FBFBFB'}}>
                            <div class="card-body" style={{marginTop: '20px'}}>
                                <DocumentForm submit={this.handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Documents
