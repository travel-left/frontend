import React from 'react'

const Document = ({ name, description, link }) => {
    return (
        <div className="col-12 my-2">
            <div className="card shadow mx-3">
                <div className="px-3 pt-3">
                    <h4 className='d-inline card-title'>{name}</h4>
                    <i class="far fa-edit fa-2x float-right text-secondary hover"></i>
                    <p className='py-2'>{description}</p>
                </div>
                <div className="card shadow mb-3 mx-4">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <a className='hover' href={link} target="_blank">
                                <img src="http://media.idownloadblog.com/wp-content/uploads/2016/04/52ff0e80b07d28b590bbc4b30befde52-484x320.png" class="card-img" alt="..." style={{ maxHeight: '100px' }}></img>
                            </a>
                        </div>
                        <div class="col-md-8 d-flex justify-content-center">
                            <div class="card-body d-flex flex-column justify-content-around">
                                <h5 class="card-title">{link}</h5>
                                <p class="card-text"><small class="text-muted">Download</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Document