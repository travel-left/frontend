import React, { Component } from 'react'
import { scroller } from 'react-scroll'
import moment from 'moment'

export default class Day extends Component {
    scrollToElement = e => {
        scroller.scrollTo(moment(this.props.day).format('MMM DD YYYY'), {
            duration: 1500,
            delay: 100,
            smooth: true,
            offset: 50, // Scrolls to element + 50 pixels down the page
        })
    }

    render() {
        return (
            <div>
                <button className="btn btn-link" onClick={this.scrollToElement}>{moment(this.props.day).format('MMM DD')}</button>
            </div>
        )
    }
}
