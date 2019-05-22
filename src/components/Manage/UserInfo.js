import React, {Component} from 'react'

class UserInfo extends Component {
    constructor(props){
        super(props)
    }

    onEditClick = () => {
        console.log('hello')
        // this.props.edit(this.props.id)
    }

    render() {
        let {name, date, image} = this.props

        return (
            <div class="card" style={{border: 'none', backgroundColor: '#FBFBFB'}}>
                <img src="https://images.unsplash.com/photo-1500839690715-11c1f02ffcd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80" class="card-img-top" style={{boxShadow: 'rgb(136, 136, 136) 0px 2px 4px', border: 'none', borderRadius: '0%', marginTop: '15px'}}alt="..."></img>
                <div class="card-body" style={{marginTop: '20px'}}>
                    <span style={{fontSize: '1.3em', color: '#3A3A3A', fontWeight: '600', display: 'block'}}>Add Travelers</span>  
                    <button onClick={this.onEditClick} className="btn btn-lg btn-square dark pull-right">ADD TRAVELER</button>
                    <button className="btn btn-lg btn-square light">IMPORT BULK</button>
                    <span style={{fontSize: '1.3em', color: '#3A3A3A', fontWeight: '600', display: 'block'}}>Add Cohorts</span>  
                    <button className="btn btn-lg btn-square light">ADD COHORT</button>
                </div>
            </div>
        )
    }
}

export default UserInfo