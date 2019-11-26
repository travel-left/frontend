import React, { Component } from 'react'
import UpdateDocumentForm from './UpdateDocumentForm'
import { getIcon } from '../../../util/file-icons'
import './Document.css'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

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
            <Grid item xs={12} md={6}>
                <Card style={{ padding: 16, marginTop: 32, width: 420 }} className="animated fadeIn">
                    <div className="d-flex justify-content-between">
                        <Typography variant="h2" style={{ marginBottom: 16 }}>{name}</Typography>
                        <UpdateDocumentForm
                            {...this.props}
                            submit={this.handleEdit}
                            remove={this.handleDelete}
                        />
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
            </Grid>
        )
    }
}

export default Document
