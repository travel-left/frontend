import React, { Component } from 'react'
import SideNavigation from '../containers/SideNavigation'

export default function withSideNav (ComponentToBeRendered) {
    class SideNav extends Component {
        render() {
            return (
                <div className='row'>
                    <SideNavigation />
                    <ComponentToBeRendered {...this.props} />
                </div>
            )
        }
    }

    return SideNav
}

