import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withSoundCloudAudio } from 'react-soundplayer/addons'
import { PlayButton, PrevButton, NextButton, Progress, Timer, VolumeControl } from 'react-soundplayer/components'

import { Playlist } from 'Components'

import './SoundPlayer.css'

const controlButtonClassNames = 'flex-none h3 button button-narrow button-transparent button-grow rounded'

class PlaylistSoundPlayer extends Component {
  constructor () {
    super()

    this.state = {
      activeIndex: 0,
      searchString: ''
    }
  }

  playTrackAtIndex = (playlistIndex, isActive) => {
    const { soundCloudAudio } = this.props

    if (isActive) {
      soundCloudAudio.pause()
      this.setState({ activeIndex: 0 })
    } else {
      this.setState({ activeIndex: playlistIndex })
      soundCloudAudio.play({ playlistIndex })
    }
  }

  nextIndex = () => {
    const { playlist, soundCloudAudio } = this.props
    let { activeIndex } = this.state

    if (activeIndex >= playlist.tracks.length - 1) {
      this.setState({ activeIndex: 0 })
      soundCloudAudio.play({ playlistIndex: 0 })
    } else if (activeIndex || activeIndex === 0) {
      this.setState({ activeIndex: ++activeIndex })
    }
  }

  prevIndex = () => {
    let { activeIndex } = this.state
    const { soundCloudAudio, playlist } = this.props
    if (activeIndex <= 0) {
      this.setState({ activeIndex: playlist.tracks.length - 1 })
      soundCloudAudio.play({ playlistIndex: playlist.tracks.length - 1 })
    } else if (activeIndex || activeIndex === 0) {
      this.setState({ activeIndex: --activeIndex })
    }
  }

  handleSearchChange = (event) => {
    const searchString = event.target.value
    this.setState({ searchString })
  }

  renderPlaybackControls = () => {
    return (
    <div className='controls playback flex items-center'>
      <PrevButton
        className={controlButtonClassNames}
        onPrevClick={this.prevIndex}
        {...this.props} />
      <PlayButton
        className={controlButtonClassNames.split('h3').join('h2')}
        {...this.props} />
      <NextButton
        className={controlButtonClassNames}
        onNextClick={this.nextIndex}
        {...this.props} />
    </div>
    )
  }

  renderProgress = () => {
    const { currentTime, duration } = this.props
    return (
      <div className='controls flex items-center'>
        <Progress
          className='mt1 mb1 rounded'
          innerClassName='rounded-left'
          value={(currentTime / duration) * 100 || 0}
          {...this.props} />
      </div>
    )
  }

  renderVolumeControl = () => {
    return (
      <div className='controls flex items-center'>
        <VolumeControl
          className='flex flex-center  items-center'
          buttonClassName={controlButtonClassNames}
          {...this.props} />
      </div>
    )
  }

  renderSearchInput = () => {
    return (
      <div>
        <input
          type='search'
          style={{ width: '100%' }}
          placeholder='Search'
          onChange={this.handleSearchChange}
          className='input border-box border p2 block fit' />
      </div>
    )
  }

  renderHeader = () => {
    const { playlist } = this.props
    return (
      <div className='flex items-center' style={{ height: '7rem' }} >
        {playlist && playlist.artwork_url
          ? <img
            src={playlist.artwork_url}
            style={{ maxWidth: '6rem', marginLeft: '2.8rem' }}
            className='circle left mr3'/> : null}
        <h2
          style={{ fontWeight: 300 }}
          className='h2 border-bottom'>
          {playlist && playlist.title ? playlist.title : ''}
        </h2>
      </div>
    )
  }

  render () {
    const { searchString, activeIndex } = this.state

    return (
      <div className='soundplayer'>
        {this.renderHeader()}
        <div className='controls-container flex flex-wrap'>
          <div className='col-2'>
            {this.renderPlaybackControls()}
          </div>
          <div className='col-8'>
            {this.renderProgress()}
          </div>
          <div className='col-2'>
            {this.renderVolumeControl()}
          </div>
        </div>
        {this.renderSearchInput()}
        <Playlist
          searchString={searchString}
          onChoose={(index, isActive) => this.playTrackAtIndex(index, isActive)}
          {...this.props} />
      </div>
    )
  }
}


PlaylistSoundPlayer.propTypes = {
  resolveUrl: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired
};

export default withSoundCloudAudio(PlaylistSoundPlayer);