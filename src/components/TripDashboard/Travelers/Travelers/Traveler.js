import React from 'react'
import Image from '../../../Other/Image'

export default function Traveler({ traveler }) {
    return (
        <div className="card py-3 shadow my-2">
            <div className="row no-gutters justify-content-between align-items-center px-3 px-md-0">
                <div className="col-md-1 d-none d-md-block">
                    <Image diameter="75px" src="https://pbs.twimg.com/profile_images/1114204041431605249/p_TkPVR-_400x400.png" />
                </div>
                <div className="d-none d-md-flex col-md-2">
                    {traveler.firstName} {traveler.lastName}
                </div>
                <div className="col-4 col-md-3">{traveler.email}</div>
                <div className="col-4 col-md-2">
                    <span class="badge badge-primary badge-pill">{traveler.status}</span>
                </div>
            </div>
        </div>
    )
}
