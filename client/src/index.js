import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Link} from 'react-browser-router'
import Home from './Main'

ReactDOM.render(
    <BrowserRouter >
      <div>
        <Route exact path = "/" component = {Home}/>
      </div>
    </BrowserRouter>, document.getElementById('root')
)