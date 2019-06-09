import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withSoundCloudAudio } from 'react-soundplayer/addons'
import { PlayButton, PrevButton, NextButton, Progress, VolumeControl } from 'react-soundplayer/components'
import styled from 'styled-components'

import { Playlist } from 'Components'

import './SoundPlayer.css'

export const PlaybackControlsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 222;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  height: 100px;
`

export const ProgressContainer = styled.div`
  position: relative;
  width: 60%;
`


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
      <ProgressContainer>
        <Progress
          className='mt1 mb1 rounded'
          innerClassName='rounded-left'
          value={(currentTime / duration) * 100 || 0}
          {...this.props} />
      </ProgressContainer>
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
          className='input border-box border p2 block fit mb3' />
      </div>
    )
  }

  renderHeader = () => {
    const { playlist } = this.props
    console.log({ ...this.props })
    return (
      <div className='flex items-center' style={{ height: '7rem' }} >
        {playlist && playlist.artwork_url
          ? <img
            alt={playlist && playlist.title}
            src={playlist.artwork_url}
            style={{ maxWidth: '6rem', marginLeft: '2.8rem' }}
            className='circle left mr3'/> : null}
          <h2
            style={{ fontWeight: 300 }}
            className='h2 border-bottom'>
            {playlist && playlist.title}
          </h2>
      </div>
    )
  }

  render () {
    const { searchString } = this.state
    return (
      <div className='soundplayer'>
        {this.renderHeader()}
        <PlaybackControlsContainer>
          {this.renderPlaybackControls()}
          {this.renderProgress()}
          {this.renderVolumeControl()}
        </PlaybackControlsContainer>
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
