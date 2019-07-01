import React, { Component } from 'react'
import UpdateDocumentForm from './UpdateDocumentForm'

class Document extends Component {

    constructor(props) {
        super(props)
    }

    handleEditDocument = putObject => {
        this.props.updateDocument(this.props._id, putObject)
    }

    render() {
        let { name, description, link, _id } = this.props

        return (
            <div className="col-md-4 my-2">
                <div className="card shadow mx-3">
                    <div className="px-3 pt-3">
                        <h4 className='d-inline card-title'>{name}</h4>
                        <UpdateDocumentForm id={_id} name={name} description={description} link={link} submit={this.handleEditDocument}></UpdateDocumentForm>
                        <p className='py-2'>{description}</p>
                    </div>
                    <div className="card shadow mb-3 mx-4">
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <a className='hover' href={link} target="_blank">
                                    <img src="http://media.idownloadblog.com/wp-content/uploads/2016/04/52ff0e80b07d28b590bbc4b30befde52-484x320.png" class="card-img" alt="..." style={{ maxHeight: '100px' }}></img>
                                </a>
                            </div>
                            <div className="col-md-8 d-flex justify-content-center">
                                <div className="card-body d-flex flex-column justify-content-around">
                                    {/* <h5 class="card-title">{link}</h5> */}
                                    <a className='hover' href={link} target="_blank" className="card-text"><small class="text-muted">Download</small></a>
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