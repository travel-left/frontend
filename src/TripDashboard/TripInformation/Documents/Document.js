import React, { Component } from 'react'
import UpdateDocumentForm from './UpdateDocumentForm'
import { getIcon } from '../../../util/file-icons'
import './Document.css'

class Document extends Component {
    handleEdit = putObject => {
        this.props.update(this.props._id, putObject)
    }

    handleDelete = () => {
        this.props.remove(this.props._id)
    }

    render() {
        let { name, description, link } = this.props

        const linkImg = getIcon(link)

        return (
            <div className="col-md-12 p-4 my-3 Document">
                <div className="row d-flex justify-content-between px-3">
                    <span className="Document-title">{name}</span>
                    <UpdateDocumentForm
                        {...this.props}
                        submit={this.handleEdit}
                        remove={this.handleDelete}
                    />
                </div>
                <p className="Document-description my-4">{description}</p>
                <div className="row">
                    <div className="col-md-12">
                        <div className="Document-card">
                            <div className="row no-gutters">
                                <div className="Document-icon d-flex justify-content-center align-items-center">
                                    <a
                                        className="hover"
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={linkImg}
                                            alt=""
                                            className='Document-image'
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </a>
                                </div>
                                <div className="card-body d-flex flex-column justify-content-around">
                                    <a
                                        className="hover"
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className='Document-open-text pr-1'>
                                            Download
                                        </span>


                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Document
