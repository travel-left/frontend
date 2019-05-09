import React, { Component } from 'react'

class Notification extends Component {

    constructor(props) {
        super(props)
        
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h4>{this.props.text}</h4>
                </div>
            </div>
        )
    }
}

export default Notification