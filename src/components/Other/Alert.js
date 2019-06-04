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
            <div className="row" style={{ margin: '15px 50px 30px 0px', backgroundColor: '#FBFBFB', border: 'none', color: '#0F61D8', height: '55px', alignItems: 'center', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px' }}>
                <div className="col-1" style={{ backgroundColor: '#0F61D8', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <i className="fas fa-thumbs-up fa-5 fa-lg" style={{ color: '#FBFBFB' }} />
                </div>
                <div className="col-10">
                    <span>{text}</span>
                </div>
                <div className="col-1" style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <i className="fas fa-times" onClick={this.closeAlert} style={{ color: '#717171' }} />
                </div>
            </div>
        ) : null

        return alert
    }
}

export default Alert
