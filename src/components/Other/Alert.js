import React, { Component } from 'react'

class Alert extends Component {
    state = {
        show: true
    }

    constructor(props) {
        super(props)
    }

    closeAlert = () => {
        this.setState({ show: false })
    }

    render() {
        let { type, icon, text } = this.props
        let alert = this.state.show ? (
            <div className="row shadow m-4 bg-light text-primary align-items-center" style={{height: '65px'}}>
                <div className="col-1 d-flex align-self-stretch justify-content-center align-items-center bg-primary">
                    <i className="fas fa-thumbs-up fa-lg text-light" />
                </div>
                <div className="col-10">
                    <span>{text}</span>
                </div>
                <div className="col-1 d-flex align-self-stretch justify-content-center align-items-center">
                    <i className="fas fa-times fa-md text-dark" onClick={this.closeAlert} />
                </div>
            </div>
        ) : null

        return alert
    }
}

export default Alert
