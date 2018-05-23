import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma/css/bulma.css'
import PDFReader from 'mgr-pdf-viewer-react'
var config = require('./IP.json')

let URL = "http://"+config.IP+":"+config.PORT

class Reader extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user_id : this.props.user_id,
            document_name : this.props.document_name,
            response : {

            }, 

            flag : false
        }
    }

    componentWillMount(){
        fetch(URL+"/get_single_document", {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, mode : 'cors', method : 'post', body : JSON.stringify({
                user_id : this.state.user_id,
                document_name : this.state.document_name
            })
        }).then((data) => data.json()).then((data) => {
            this.setState({response : data})
            console.log(data)
            this.setState({flag : true})
        })
    }

    render(){
        return(
            <div className = "box" style = {{}}>
               {
                   (this.state.flag) && (
                       <div>
                           <p className = "title is-4">{this.state.response.document_name}</p>
                            <div>
                                {
                               (this.state.response.document_type == 'image')&&(
                                   <div><img src = {this.state.response.url_string_basex64}/></div>
                               )
                                }
                            </div>
                            <div>{
                                (this.state.response.document_type == 'document') && (
                                    <div><PDFReader document = {{url : this.state.response.url_string_basex64}} scale = {1}/></div>
                                )
                            }</div>
                       </div>
                   )
               }
            </div>
        )
    }
}

export default Reader