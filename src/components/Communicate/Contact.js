import React from 'react'

const Contact = ({name, phone, email, photo}) => {
    return (
        <div className="col-4">
            <div class="card" style={{width: '15rem', display: 'flex', flexDirection: 'row', margin: '20px 20px 20px 20px'}}>
                <div className="">
                    <img src={photo} class="card-img-top" alt="..." style={{maxWidth: '100px', borderRadius: '50%'}}></img>
                </div>
                <div className="">
                    <h5 class="card-title">{name}</h5>
                    <a href="#" class="card-link">{phone}</a> <br/>
                    <a href="#" class="card-link">{email}</a>
                </div>
            </div>
        </div>
    )
}

export default Contact