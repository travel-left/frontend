import React, { Component } from 'react'
import { getIcon } from '../../../util/file-icons'
import './Document.css'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import LeftModal from '../../../util/otherComponents/LeftModal'
import LeftItem from '../../../util/otherComponents/LeftItem'
import DocumentForm from '../../../Forms/DocumentForm'
import LeftFab from '../../../util/otherComponents/LeftFab'

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
        let { name, description, link, type } = this.props

        const linkImg = getIcon(link)

        return (
            <LeftItem>
                <Card style={{ padding: 16, minWidth: 350 }} className="animated fadeIn d-flex justify-content-between flex-column left-resource">
                    <div className="d-flex justify-content-between">
                        <Typography variant="subtitle2" style={{ marginBottom: 16 }}>{name}</Typography>
                        {!this.props.share && <LeftFab id="contact-edit-button"
                            onClick={this.openModal}
                            fab
                            text='EDIT'>
                        </LeftFab>}
                        {
                            this.state.isEditModalOpen && <LeftModal
                                isOpen={this.state.isEditModalOpen}
                                toggleModal={this.closeModal}
                                title='Edit a trip resource'
                                name={name}
                                description={description}
                                submit={this.handleEdit}
                                type={type}
                                link={link}
                                remove={this.handleDelete}
                                form={DocumentForm}
                            />
                        }
                    </div>
                    <Typography variant="caption">{description}</Typography>
                    {type === 'LINK' && <Typography variant="caption">{link}</Typography>}
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
                                {type === 'LINK' ? 'Open link' : 'Download'}
                            </a>
                        </div>
                    </Card>
                </Card>
            </LeftItem>
        )
    }
}

export default Document
