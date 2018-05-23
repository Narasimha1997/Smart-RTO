import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma/css/bulma.css'
import {UserHome, Admin} from './Userland'
import {Profile} from './User'
import SpeechRecognition from './Developers'


var config = require('./IP.json');
let URL = "http://"+config.IP+":"+config.PORT

class Home extends React.Component {
   constructor(){
       super()
       this.state = {
           uname : '', password : '', req : '', admin_pwd : '', admin_res : '', admin_area : ''
       }
       this.simple_auth_impl = this.simple_auth_impl.bind(this);
       this.admin_auth_impl = this.admin_auth_impl.bind(this)
   }

   simple_auth_impl(){
       if(this.state.password == '' || this.state.uname == ''){
           this.setState({req : 'Please enter all the fields'})
           return
       }

       fetch(URL+'/simple_auth', {
           headers : {
               'Accept': 'application/json',
               'Content-Type' : 'application/json'
           },
           mode : 'cors',
           method : 'post',
           body : JSON.stringify({
               name : this.state.uname,
               password : this.state.password
           })
       }).then((data) => data.json()).then((data) => {
           if(data.success){
               ReactDOM.render(
                   <Profile user_id = {this.state.uname}/>, document.getElementById('root')
               )
           }else this.setState({req : 'Auth failed'})
       }).catch((Err) => console.log(Err))
   }

   admin_auth_impl(){
       if(this.state.admin_pwd == ''){
           this.setState({admin_res : 'Enter password'})
           return
       }
       fetch(URL+'/admin_auth', {
           headers : {
               'Content-type' : 'application/json',
               'Accept' : 'application/json'
           }, mode : 'cors', method : 'post', body : JSON.stringify({password : this.state.admin_pwd, area : this.state.admin_area})
       }).then((data) => data.json()).then((json) => {
           if(json.success){
               console.log(json)
               ReactDOM.render(
                   <Admin region = {json.region} />, document.getElementById('root')
               )
           }else this.setState({admin_res : 'Admin auth failed'})
       })
   }

   render(){
       return(
           <div>
               <div className = "container" style = {{background : "url(\'tr.gif\')", height : "270px"}}>
                  <div style = {{textAlign : 'center', padding : '80px', width : '95%'}}>
                     <h4 className = "title">Smart RTO Documents</h4>
                     <p>Travel without fear!</p>
                  </div>
               </div>
               <div className = "box" style = {{margin : '20px auto', width : '90%'}}>
                  <h4 className = "title is-4" style = {{textAlign : 'center'}}>Login</h4>
                  <div style = {{margin : '10px auto'}}>
                      <div className = "field">
                         <label className = "label is-smal"  >Username: </label>
                         <input className = "input is-info is-rounded" value = {this.state.uname} onChange = {(e) =>{
                             this.setState({uname : e.target.value})
                         }} validate = "true"/>
                      </div>
                  </div>
                  <div style = {{margin : '10px auto'}}>
                      <div className = "field">
                         <label className = "label is-small">Password: </label>
                         <input className = "input is-info is-rounded" type = "password" validate = "true" value = {this.state.password}
                          onChange = {(e) => {
                              this.setState({password : e.target.value})
                          }}/>
                      </div>
                  </div>
                  <p>{this.state.req}</p>
                  <div style = {{margin : '20px auto'}}>
                      <button className = "button is-info is-rounded" style = {{marginRight: '20px'}} onClick = {this.simple_auth_impl}>Login</button>
                  </div>
               </div>
               <div className = "card" style = {{margin : '30px auto', width : '85%'}}>
                   <div className = "card-image">
                      <figure className = "image">
                         <img src = "police.jpg" height = '300px'/>
                      </figure>
                   </div>
                   <div className = "card-content">
                     <p className = "title is-4">Admin access: </p>
                     <p>Admin (RTO) can login using his unique area password which helps him to upload and manage
                         documents of clients, he can upload new documents, delete and create new clients by providing their
                         details.
                     </p>
                     <div style = {{marginTop : '20px'}}>
                         <div className = "field">
                            <label className = "label is-small">Area Name: </label>
                            <input className = "input is-info is-rounded" type = "text" value = {this.state.admin_area}
                             onChange = {(e) => this.setState({admin_area : e.target.value})}/>
                         </div>
                         <div className = "field">
                            <label className = "label is-small">Area Password: </label>
                            <input className = "input is-info is-rounded" type = "password" value = {this.state.admin_pwd}
                             onChange = {(e) => this.setState({admin_pwd : e.target.value})}/>
                         </div>
                         <p>{this.state.admin_res}</p>
                         <button className = "button is-info is-rounded" onClick = {this.admin_auth_impl}>Login</button>
                     </div>
                     <div className = "field">
                            <label className = "label is-small">Area Password: </label>
                            <input className = "input is-info is-rounded" type = "password" value = {this.state.admin_pwd}
                             onChange = {(e) => this.setState({admin_pwd : e.target.value})}/>
                         </div>
                         <p>{this.state.admin_res}</p>
                         <button className = "button is-info is-rounded" onClick = {
                             ()=>{
                                 ReactDOM.render(<SpeechRecognition />, document.getElementById('root'))
                             }
                         }>Speech</button>
                     </div>
                   </div>
           </div>
       )
   }
}

class RegistrationFrom extends React.Component {
    constructor(){
        super()
        this.state = {
            fullname : '',
            uname : '',
            dob : '',
            license_type : '',
            photo : '',
            vehicle_number : ''
        }
    }

    render(){
        return (
            <div>
            <p>Hello, world</p>
            </div>
        )
    }
}

export default Home