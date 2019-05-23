import React, { Component } from 'react'
import DocumentForm from './DocumentForm'
import { apiCall } from '../../services/api'

class Documents extends Component {
    state = {
        name: '',
        link: ''
    }

    constructor(props) {
        super(props)
    }

    handleSubmit = e => {
        const id = this.props.currentTrip._id
        apiCall('post', `/api/document/${id}`, e)
            .then(() => {
                console.log('Document Submitted')
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let { name, link } = this.state
        return (
            <div>
                <div>Create Document</div>
                <DocumentForm submit={this.handleSubmit} />
                <div>Documents</div>
            </div>
        )
    }
}

export default Documents
