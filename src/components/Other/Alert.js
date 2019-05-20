import React from 'react'

const Alert = ({type, icon, text}) => {
    return (
        <div className='row' style={{margin: '15px 50px 30px 0px', backgroundColor: '#FBFBFB', border: 'none', color: '#0F61D8', height: '55px', alignItems: 'center', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px'}}>
            <div className="col-1" style={{backgroundColor: '#0F61D8', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <i class="fas fa-thumbs-up fa-5 fa-lg" style={{color: '#FBFBFB'}}></i>
            </div>
            <div className="col-10">
                <span>Welcome to left. Choose "add new trip" to get started. Feel free to contact us at <span style={{color: '#8ECFF5'}}>support@travel-left.com</span> if you have questions.</span>
            </div>
            <div className="col-1" style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <i class="fas fa-times" style={{color: '#717171'}}></i>
            </div>
        </div>
    )
}

export default Alert