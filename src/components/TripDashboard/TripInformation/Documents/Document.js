import React, { Component } from 'react'
import UpdateDocumentForm from './UpdateDocumentForm'
import { getIcon } from '../../../../util/file-icons'

class Document extends Component {
    handleEditDocument = putObject => {
        this.props.updateDocument(this.props._id, putObject)
    }

    render() {
        let { name, description, link, _id } = this.props

        const linkImg = getIcon(link)

        return (
            <div className="col-md-4 my-2">
                <div className="card shadow mx-3">
                    <div className="px-3 pt-3">
                        <h4 className="d-inline card-title">{name}</h4>
                        <UpdateDocumentForm id={_id} name={name} description={description} link={link} submit={this.handleEditDocument} />
                        <p className="py-2">{description}</p>
                    </div>
                    <div className="card shadow mb-3 mx-4">
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <a className="hover" href={link} target="_blank" rel="noopener noreferrer">
                                    <img src={linkImg} alt="" style={{ objectFit: 'cover' }} />
                                </a>
                            </div>
                            <div className="col-md-8 d-flex justify-content-center">
                                <div className="card-body d-flex flex-column justify-content-around">
                                    {/* <h5 className="card-title">{link}</h5> */}
                                    <a className="hover card-text" href={link} target="_blank" rel="noopener noreferrer">
                                        <small className="text-muted">Download</small>
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
