import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <footer class="container-fluid py-3 bg-secondary d-flex d-row justify-content-center shadow font-weight-light mt-3" style={{zIndex: 2}}>
                <span className='text-light'>Made with 
                    <i className="fas fa-heart px-2" style={{color: '#cd292a'}}></i>
                    in Costa Mesa, CA.
                </span>
            </footer>
        )
    }
}
