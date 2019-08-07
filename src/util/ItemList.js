import React, { Component } from 'react'
import { apiCall } from './api'
import LeftCard from './LeftCard'

export default ({ items, update, remove, C, otherProps }) =>
    items.map(item => (
        <C {...item} update={update} {...otherProps} remove={remove} key={item._id} />
    ))

// export default class ItemList extends Component {
//     state = {
//         items: []
//     }

//     type = this.props.type

//     tripId = this.props.tripId

//     constructor(props) {
//         super(props)
//         this.getItems()
//     }

//     updateItem = async (_id, updateObject) => {
//         const updatedItem = await apiCall(
//             'put',
//             `/api/trips/${this.tripId}/${this.type}/${_id}`,
//             updateObject
//         )
//         const { items } = this.state
//         const index = items.findIndex(i => i._id === _id)
//         items[index] = updatedItem
//         this.setState({ items })
//     }

//     getItems = async () => {
//         let items = await apiCall(
//             'get',
//             `/api/trips/${this.tripId}/${this.type}`
//         )
//         this.setState({ items })
//     }

//     createItem = async item => {
//         const createdItem = await apiCall(
//             'post',
//             `/api/trips/${this.tripId}/${this.type}`,
//             item
//         )
//         const { items } = this.state
//         items.push(createdItem)
//         this.setState({ items })
//     }

//     removeItem = async _id => {
//         await apiCall('delete', `/api/trips/${this.tripId}/${this.type}/${_id}`)
//         const { items } = this.state
//         const newItems = items.filter(i => i._id !== _id)
//         this.setState({ items: newItems })
//     }

//     render() {
//         const { Component, Create, name, otherProps } = this.props
//         const { items } = this.state
//         let itemList =
//             items && items.length
//                 ? items.map(item => (
//                       <Component
//                           {...item}
//                           update={this.updateItem}
//                           remove={this.removeItem}
//                           key={item._id}
//                           {...otherProps}
//                       />
//                   ))
//                 : null
//         if (this.type === 'tripDates') {
//             itemList = <LeftCard>{itemList}</LeftCard>
//         }

//         return (
//             <>
//                 <h4 className="text-dark my-3">{name}</h4>
//                 <Create formType="add" submit={this.createItem} />
//                 <div className="row">{itemList}</div>
//             </>
//         )
//     }
// }
