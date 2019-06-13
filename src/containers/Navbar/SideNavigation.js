import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

class SideNavigation extends Component {
    constructor(props) {
        super(props)
        
    }

    handleChange = e => {
        this.props.submit(e.target.value)
    }

    selectFeature = e => {
        e.preventDefault()
        let { history, currentTrip } = this.props

        switch (e.target.name) {
            case 'info':
                return history.push(`/trips/${currentTrip._id}/edit`)
            case 'itinerary':
                return history.push(`/trips/${currentTrip._id}/itinerary`)
            case 'travelers':
                return history.push(`/trips/${currentTrip._id}/manage`)
            case 'communicate':
                return history.push(`/trips/${currentTrip._id}/communicate`)
            case 'documents':
                return history.push(`/trips/${currentTrip._id}/documents`)
            default:
                return
        }
    }

    render() {
        let { currentTrip } = this.props
        return (
            <div className="">
                <img className="" src={currentTrip.image} style={{maxWidth: '100%'}}/>
                <h3 className='h3 px-4 pt-3'>Trip to {currentTrip.name}</h3>
                <hr />
                <div className="pl-3">
                    <ul className="list-group list-group-flush bg-light">
                        <SideNavLink text='Trip Information' name='info' action={this.selectFeature}></SideNavLink>
                        <SideNavLink text='Itinerary' name='itinerary' action={this.selectFeature}></SideNavLink>
                        <SideNavLink text='Documents' name='documents' action={this.selectFeature}></SideNavLink>
                        <SideNavLink text='Travelers' name='travelers' action={this.selectFeature}></SideNavLink>
                        <SideNavLink text='Mobile App' name='mobile' action={this.selectFeature}></SideNavLink>
                        <SideNavLink text='Communicate' name='communicate' action={this.selectFeature}></SideNavLink>
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(SideNavigation)

const SideNavLink = ({text, action, name}) => {
    return (<a className='text-primary font-weight-bold py-3' onClick={action} name={name}>{text} </a>)
}