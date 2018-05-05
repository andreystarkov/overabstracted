import React, { Component } from 'react'

import { Timer } from 'react-soundplayer/components'

import ClassNames from 'classnames'

import './Playlist.css'
 
export default class Playlist extends Component {
  renderItems = (track, i) => {
    const { onChoose, soundCloudAudio } = this.props
    const { currentTime } = soundCloudAudio.audio
  
    const isActive = (soundCloudAudio._playlistIndex === i && soundCloudAudio.playing)
  
    const classNames = ClassNames('playlist-item p2 border-box', {
      'is-active': isActive
    })
  
    return (
      <div
        key={track.id}
        className={classNames}
        onClick={() => onChoose(i, isActive)}>
        <span className='track-title flex-auto'>{track.user.username} - {track.title}</span>
        <span className='track-time right'>
          {isActive && currentTime > 0
            ? Timer.prettyTime((track.duration / 1000) - currentTime)
            : Timer.prettyTime(track.duration / 1000)}
        </span>
      </div>
    )
  }

  filterList = () => {
    const { playlist, searchString } = this.props
    let tracks = playlist.tracks
    if (searchString) {
      tracks = tracks.filter(f =>
        f.title.toLowerCase().includes(searchString.toLowerCase()) ||
        f.description.toLowerCase().includes(searchString.toLowerCase()
      ))
    }
    return tracks
  }

  render () {
    const { playlist } = this.props

    if (!playlist) {
      return <div className='mt4 p4 center'>
        <span style={{ fontWeight: 300 }} className='h3'>Loading...</span>
      </div>
    }

    const list = this.filterList()
    const tracks = list.map(this.renderItems)

    return (
      <div className='playlist'>{tracks}</div>
    )
  }
}
