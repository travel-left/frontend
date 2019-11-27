import React, { Component } from 'react'
import UpdateDocumentForm from './UpdateDocumentForm'
import { getIcon } from '../../../util/file-icons'
import './Document.css'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import LeftModal from '../../../util/otherComponents/LeftModal'
import Fab from '@material-ui/core/Fab'
import LeftItem from '../../../util/LeftItem';

class Document extends Component {
    state = {
        isEditModalOpen: false
    }

    handleEdit = putObject => {
        this.props.update(this.props._id, putObject)
        this.closeModal()
    }

    handleDelete = () => {
        this.props.remove(this.props._id)
        this.closeModal()
    }

    closeModal = () => (this.setState({ isEditModalOpen: false }))
    openModal = () => (this.setState({ isEditModalOpen: true }))

    render() {
        let { name, description, link } = this.props

        const linkImg = getIcon(link)

        return (
            <LeftItem>
                <Card style={{ padding: 16 }} className="animated fadeIn d-flex justify-content-between flex-column">
                    <div className="d-flex justify-content-between">
                        <Typography variant="h2" style={{ marginBottom: 16 }}>{name}</Typography>
                        <Fab onClick={this.openModal} variant="extended" style={{ width: 54, height: 25, backgroundColor: '#475561', fontSize: 12, fontWeight: 600, color: 'white' }}>
                            Edit
                        </Fab>
                        {
                            this.state.isEditModalOpen && <LeftModal
                                isOpen={this.state.isEditModalOpen}
                                toggleModal={this.closeModal}
                                title='Edit a trip resource'
                                name={name}
                                description={description}
                                submit={this.handleEdit}
                                remove={this.handleDelete}
                                form={UpdateDocumentForm}
                            />
                        }
                    </div>
                    <Typography variant="subtitle1">{description}</Typography>
                    <Card className='d-flex flex-row justify-content-between' style={{ borderRadius: 3, marginTop: 16 }}>
                        <div className="Document-icon d-flex justify-content-center align-items-center">
                            <a
                                className="hover"
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                download>
                                <img
                                    src={linkImg}
                                    alt=""
                                    className='Document-image'
                                    style={{ objectFit: 'cover' }}
                                />
                            </a>
                        </div>
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <a
                                className="hover Document-open-text"
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download
                        </a>
                        </div>
                    </Card>
                </Card>
            </LeftItem>
        )
    }
}

export default Document
