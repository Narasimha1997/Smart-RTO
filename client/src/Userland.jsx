import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma/css/bulma.css'
import {Users, Info, UploadNew} from './Admin'

class UserHome extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            prev_data : props,
            documents : []
        }
    }

    render() {
        return(
            <div>
                <p>Welcome user</p>
            </div>
        )
    }
}

class Admin extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            region : props.region,
            tab_id : 0
        }
        console.log(this.state.region)
    }

    render(){
        return (
            <div>
                <div style = {{backgroundColor : '#2196F3', padding : '10px 10px 10px 10px'}}>
                    <p className = "title is-5">Region name: {this.state.region}</p>
                </div>
                <div className = "card" style = {{margin : '10px auto', width : '85%'}}>
                   <div className = "card-image">
                      <figure className = "image">
                         <img src = "private.png" height = "300px"/>
                      </figure>
                   </div>
                   <div className = "card-content">
                      <p className = "title is-4"><i class="fas fa-exclamation-circle is-danger"></i> Alert</p>
                      <p>You are in access to personal information of all your users, misuse or sharing of any data in this page 
                          will be considered as a crime or violation of rules and will be subjected to respective law organizations.
                      </p>
                   </div>
                </div>
                <div className = "tabs is-boxed is-medium is-centered">
                  <ul>
                    <li>
                       <a onClick = {()=>{
                          this.setState({tab_id : 0})
                       }}><i className="fas fa-plus"></i> Create User</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                       <a onClick = {()=>this.setState({tab_id : 1})}> <i className ="fas fa-users"></i> Users</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                       <a onClick = {() => this.setState({tab_id : 2})}><i className="fas fa-info"></i> Info</a>
                    </li>
                  </ul>
                </div>
                {
                   (this.state.tab_id == 0) && (
                       <div style = {{margin : '10px auto'}}>
                          <UploadNew area = {this.state.region}/>
                       </div> 
                   )
                }
                {
                   (this.state.tab_id == 1) && (
                       <div style = {{margin : '10px auto'}}>
                          <Users area = {this.state.region}/>
                       </div> 
                   )
                }
                {
                   (this.state.tab_id == 2) && (
                       <div style = {{margin : '10px auto'}}>
                          <Info />
                       </div> 
                   )
                }
            </div>
        )
    }
}

export  {UserHome, Admin}