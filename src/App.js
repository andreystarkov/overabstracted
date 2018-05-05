import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { SoundPlayer } from 'Components'
import { soundCloudSettings } from 'Config'

class App extends Component {
  render () {
    return (
      <div className='root'>
        <SoundPlayer {...soundCloudSettings} />
      </div>
    )
  }
}

export default App
