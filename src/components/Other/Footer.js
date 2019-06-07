import React, { Component } from 'react'
import './Footer.css'

export default class Footer extends Component {
    render() {
        return (
            <footer class="container-fluid">
                <span>Made with 
                    <i className="fas fa-heart" style={{color: '#cd292a'}}></i>
                    in Costa Mesa, CA.
                </span>
            </footer>
        )
    }
}
