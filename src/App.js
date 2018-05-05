import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { SoundPlayer } from './Components'

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const sources = [
  'https://soundcloud.com/blumarten/sets/podcasts',
  'https://soundcloud.com/lokomotiv-music/sets/podcast-series',
  'https://soundcloud.com/afterhours-uk-au/sets/afterhours-podcast',
  'https://soundcloud.com/atmoteka/sets/atmoteka-season-4',
  'https://soundcloud.com/atmoteka/sets/atmoteka-season-3',
  'https://soundcloud.com/dinsubsol/sets/romanian-artists-mixes',
  'https://soundcloud.com/soundroom-studio/sets/soundroom-podcast',
  'https://soundcloud.com/rtsfm/sets/rts-fm-bucharest',
  'https://soundcloud.com/tzinah-records/sets/tzinah-family-artists-podcasts',
  'https://soundcloud.com/blumarten/sets/blu-mar-ten-music-guest-mixes'
]

const soundCloudSettings = {
  clientId: '310e867035eacd04d104cedd5705b31e',
  resolveUrl: sources[random(0, sources.length - 1)]
}

class App extends Component {
  render () {
    return (
      <div className='root'>
        <SoundPlayer {...soundCloudSettings} />
      </div>
    )
  }
}

/*
  TODO:
  x When user opens the page, he sees the list of tracks and a player in
  unplayed state.
  x When user clicks on the track, it turns into selected mode in the playlist
  and shows the elapsed time while playing
  x When user clicks on the track, player starts the playback and turns into the
  playing state, showing the progress
  x When user clicks on the currently playing track in the playlist OR on the
  pause in the player interface, the playback stops
  x When user clicks on the player's progress bar, the playback begins at the
  selected timestamp, the elapsed time in the playlist should be changed
  accordingly
  ч When user clicks on the "play next" button, the next track in the playlist
  starts. If the track is the last in the playlist, the first in the playlist starts. The
  same applies to the "play previous"
  x When user clicks on the volume adjuster, the volume level changes
  accordingly
  x When user searches in the input, the list is filtered to match the query.
  Make a simple search to match on the first 3 letters and more.
*/

export default App
