import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma/css/bulma.css'
import UserDocumentUpload from './UploadDocument'
import Reader from './FileReader'

var config = require('./IP.json')

let URL = "http://"+config.IP+":"+config.PORT

class DocumentList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user_id : this.props.user_id,
            files : {},
            resp : '',
            flag : false
        }
    }

    componentWillMount(){
        fetch(URL+'/get_documents_of_user', {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, mode : 'cors', method : 'post', body : JSON.stringify({
                user_id : this.state.user_id
            })
        }).then((data) => data.json()).then((data) => {
            this.setState({files : data})
            this.setState({flag : true})
        }).catch((Err) => {this.setState({resp : Err})})
    }

    render(){
        return (
            <div>{
                <div className = "box" style = {{margin : '30px auto', width : '95%'}}>
               <p className = "title is-4">Your documents:</p>
               <p>This acts as a valut for all your documents realted to vehicle, These documents are also available for
                   RTO department for use:
               </p>
               <button className = "button is-info is-rounded" onClick = {()=>{
                   ReactDOM.render(
                       <UserDocumentUpload user_id = {this.state.user_id}/>, document.getElementById('root')
                   )
               }}>Upload new document</button>
               {   (this.state.flag) && 
                   this.state.files.doc_list.map((k, v) => {
                       return (
                           <div className = "box" style = {{margin: '10px auto'}}>
                              <p className = "title is-4">{k.document_name}</p>
                              <p>{k.file_name}</p>
                              <button className = "button is-info is-rounded" onClick = {
                                  () => {
                                      ReactDOM.render(
                                          <Reader user_id = {this.state.user_id} document_name = {k.document_name} />,
                                          document.getElementById('root')
                                      )
                                  }
                              }>View</button>
                           </div>
                       )
                   })
               }
            </div>
            }</div>
        )
    }
}

class Profile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user_id : this.props.user_id,
            details : {}
        }
        console.log(this.state.user_id)
    }

    componentWillMount(){
        fetch(URL+"/get_profile", {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, mode : 'cors', method : 'post', body : JSON.stringify({user_id : this.state.user_id})
        }).then((data) => data.json()).then((data) => {
            this.setState({details : data})
        }).catch((err) => console.log(err))
    }

    render(){
        return (
            <div>
            <div className = "box" style = {{margin : '30px auto', width : '95%'}}>
               <p className = "title is-4">{this.state.details.full_name}</p>
               <p>Vehicle Number : {this.state.details.email}</p>
               <p>Vehicle Type : {this.state.details.vechicle_type}</p>
               <p>User ID : {this.state.details.user_id}</p>
               <p>Registration date : {this.state.details.reg_date}</p>
               <p>Vehicle number : {this.state.details.v_number}</p>
            </div>
            <DocumentList user_id = {this.state.user_id} />
            </div>
        )
    }
}

export {Profile, DocumentList};