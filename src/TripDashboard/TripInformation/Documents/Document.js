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
            <div className="col-md-12 p-3 my-3 Document">
                <div className="row d-flex justify-content-between px-3">
                    <h4 className="Document-title">{name}</h4>
                    <UpdateDocumentForm
                        {...this.props}
                        submit={this.handleEdit}
                        remove={this.handleDelete}
                    />
                </div>
                <p className="Document-description">{description}</p>
                <div className="row">
                    <div className="col-md-12">
                        <div className="Document-card">
                            <div className="row no-gutters">
                                <a
                                    className="hove d-flex alighn-self-center py-1"
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={linkImg}
                                        alt=""
                                        style={{ objectFit: 'cover' }}
                                    />
                                </a>
                                <div className="card-body d-flex flex-column justify-content-around">
                                    <a
                                        className="hover card-text"
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <small className="text-muted">
                                            Open
                                            </small>
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
