import React, { Component } from 'react'
import UpdateDocumentForm from './UpdateDocumentForm'
import { getIcon } from '../../../util/file-icons'
import LeftCard from '../../../util/LeftCard';

class Document extends Component {
    handleEdit = putObject => {
        this.props.update(this.props._id, putObject)
    }

    handleDelete = () => {
        this.props.remove(this.props._id)
    }

    render() {
        let { name, description, link, _id } = this.props

        const linkImg = getIcon(link)

        return (
            <LeftCard>
                <div className="row">
                    <div className="col-md-10">
                        <h4 className="d-inline card-title">{name}</h4>
                    </div>
                    <div className="col-md-2">
                        <UpdateDocumentForm
                            {...this.props}
                            submit={this.handleEdit}
                            remove={this.handleDelete} />
                    </div>
                </div>
                <p className="py-2">{description}</p>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow mb-3 mx-4">
                            <div className="row no-gutters">
                                <a className="hove d-flex alighn-self-center py-1" href={link} target="_blank" rel="noopener noreferrer">
                                    <img src={linkImg} alt="" style={{ objectFit: 'cover' }} />
                                </a>
                                <div className="card-body d-flex flex-column justify-content-around">
                                    <a className="hover card-text" href={link} target="_blank" rel="noopener noreferrer">
                                        <small className="text-muted">Open</small>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LeftCard>
        )
    }
}

export default Document
