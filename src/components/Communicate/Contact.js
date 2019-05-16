import React from 'react'

const Contact = ({name, phone, email, photo}) => {
    return (
        <div className="col-4">
            <div class="card" style={{width: '15rem', display: 'flex', flexDirection: 'row', margin: '20px 20px 20px 20px'}}>
                <div className="">
                    <img src="https://pbs.twimg.com/profile_images/1114204041431605249/p_TkPVR-_400x400.png" class="card-img-top" alt="..." style={{maxWidth: '100px', borderRadius: '50%'}}></img>
                </div>
                <div className="">
                    <h5 class="card-title">Jordan Boudreau</h5>
                    <a href="#" class="card-link">559-393-5872</a> <br/>
                    <a href="#" class="card-link">jordan@travel-left.com</a>
                </div>
            </div>
        </div>
    )
}

export default Contact