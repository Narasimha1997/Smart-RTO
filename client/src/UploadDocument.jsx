import React from 'react'
import ReactDOM from 'react-dom'
import ReactFileReader from 'react-file-reader';
import { join } from 'path';


var config = require('./IP.json')
let URL = "http://"+config.IP+":"+config.PORT

class UserDocumentUpload extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user_id : this.props.user_id,
            file_name : '',
            document_name : '',
            document: '',
            file_tag : '',
            response : ''
        }
        this.upload = this.upload.bind(this)
    }

    upload(file){
       this.setState({file_name : file.fileList[0].name})
       //create file-tag and document encoding:
       let file_tags = file.base64.split(",")
       this.setState({document : file_tags[1]})
       this.setState({file_tag : file_tags[0]})
       //console.log(this.state)
       fetch(URL+"/upload_document", {
           headers : {
               "Content-Type" : "application/json",
               "Accept" : "application/json"
           }, mode: "cors", method : "post", body : JSON.stringify(this.state)
       }).then((response) => response.json()).then((resp) => {
           if(resp.success) this.setState({response : 'File uploaded successfully'})
           else this.setState({response : "failed to upload, contact developer, or office"}) 
       }).catch((err) => this.setState({response : err}))
    }

    render(){
        return(
            <div className = "box" style = {{margin : '30px auto', width : "95%"}}>
                <div className = "field">
                            <label className = "label is-small">Title (DOcument name): </label>
                            <input className = "input is-info is-rounded" type = "text" value = {this.state.document_name}
                             onChange = {(e) => this.setState({document_name : e.target.value})}/>
                </div>
                <div className = "field">
                <ReactFileReader fileTypes={[".pdf",".jpg", ".png"]} base64={true}  handleFiles={this.upload}>
                    <button className='button is-rounded is-info'>Upload</button>
                </ReactFileReader>
                </div>
                <p>{this.state.response}</p>
            </div>
        )
    }
}

export default UserDocumentUpload

