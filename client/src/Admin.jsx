import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma/css/bulma.css'
import {DocumentList} from './User'

var config = require("./IP.json")

let URL = 'http://'+config.IP+":"+config.PORT

class UploadNew extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            full_name : '',
            uid : '',
            email : '',
            mobile : '',
            password : '',
            DOB : '',
            reg_date : '',
            vehicle_type : '',
            c_password : '',
            v_number : '',
            area : this.props.area
        }
        this.send_to_server = this.send_to_server.bind(this)
    }

    send_to_server(){
        fetch(URL+'/new_user', {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, mode : 'cors', method : 'post', body : JSON.stringify({data : this.state})
        }).then((resp) => resp.json()).then((data) => console.log(data)).catch((err) => console.log(err))
    }

    render(){
        return (
            <div>
                <div style = {{margin : '20px auto', width : '90%'}}>
                    <p className = "title is-5">Create a new registration: </p>
                    <div className = "field" style = {{margin : '10px auto'}}>
                       <label className = "label is-small">Full Name: </label>
                       <input className = "input is-info is-rounded" onChange = {(e) =>{
                    this.setState({full_name : e.target.value})
                }}/>
                    </div>

                    <div className = "field" style = {{margin : '10px auto'}}>
                       <label className = "label is-small">UserID (uname): </label>
                       <input className = "input is-info is-rounded" onChange = {(e) =>{
                    this.setState({user_id : e.target.value})
                }}/>
                    </div>

                    <div className = "field" style = {{margin : '10px auto'}}>
                       <label className = "label is-small">Mobile: </label>
                       <input className = "input is-info is-rounded" onChange = {(e) =>{
                    this.setState({mobile : e.target.value})
                }}/>
                    </div>

                    <div className = "field" style = {{margin : '10px auto'}}>
                       <label className = "label is-small">Email: </label>
                       <input className = "input is-info is-rounded" onChange = {(e) =>{
                    this.setState({email : e.target.value})
                }}/>
                    </div>

                    <div className = "field" style = {{margin : '10px auto'}}>
                       <label className = "label is-small">Password: (password) </label>
                       <input className = "input is-info is-rounded" type = "password" onChange = {(e) =>{
                    this.setState({password : e.target.value})
                }}/>
                    </div>

                    <div className = "field" style = {{margin : '10px auto'}}>
                       <label className = "label is-small">Confirm Password: </label>
                       <input className = "input is-info is-rounded" type = "password" onChange = {(e) =>{
                    this.setState({c_password : e.target.value})
                }}/>
                    </div>

                    <div className = "field" style = {{margin : '10px auto'}}>
                       <label className = "label is-small">Vehicle Number: </label>
                       <input className = "input is-info is-rounded" type = "text" onChange = {(e) =>{
                    this.setState({v_number : e.target.value})
                }}/>
                    </div>

                    <div className = "field" style = {{margin : '10px auto'}}>
                       <label className = "label is-small">DOB: </label>
                       <input className = "input is-info is-rounded" type = "date" onChange = {(e) =>{
                    this.setState({DOB : e.target.value})
                }}/>
                    </div>

                    <div className = "field" style = {{margin : '10px auto'}}>
                       <label className = "label is-small">Registration date: </label>
                       <input className = "input is-info is-rounded" type = "date" onChange = {(e) =>{
                    this.setState({reg_date : e.target.value})
                }}/>
                    </div>

                    <div className = "field" style = {{margin : '10px auto'}}>
                       <label className = "label is-small">Vehicle Type: </label>
                       <input className = "input is-info is-rounded" type = "text" onChange = {(e) =>{
                    this.setState({vehicle_type : e.target.value})
                }}/>
                    </div>
                    <div className = "field" style = {{margin : '20px auto'}}>
                        <button className = "button is-info is-rounded" onClick = {this.send_to_server}>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}

class Users extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            response : null,
            respond : false,
            area : props.area
        }
    }

    componentWillMount(){
        fetch(URL+'/get_user_by_area', {
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, mode : 'cors', method : 'post', body : JSON.stringify({
                area : this.state.area
            })
        }).then((data) => data.json()).then((data) => {
            this.setState({response : data.result})
            this.setState({respond : true})
        })
    }

    render(){
        console.log('Hello')
        return (
            <div>
                <div style = {{margin : '20px auto', width : '95%'}}>
                   { (this.state.respond) &&
                       this.state.response.map((k,v) => {
                           console.log(k)
                           return(
                               <div className = "box" style = {{margin : '20px auto', width : '95%'}}>
                                 <p className = "title is-4">{k.full_name}</p>
                                 <p>Registration date : {k.reg_date}</p>
                                 <p>Vehicle Number : {k.v_number}</p>
                                 <button className = "button is-rounded is-info" onClick = {
                                     () => ReactDOM.render(
                                         <DocumentList user_id = {k.user_id}/>, document.getElementById('root')
                                     )
                                 }>View documents</button>
                               </div>
                           )
                       })
                   }
                </div>
            </div>
        )
    }
}

class Info extends React.Component {
    constructor(){
        super();
    }

    render(){
        return(
            <div style = {{margin : '20px auto', width : '95%'}}>Hello, info</div>
        )
    }
}

export {Users, Info, UploadNew}