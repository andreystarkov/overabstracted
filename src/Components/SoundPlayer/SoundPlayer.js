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
      searchString: '',
      hoverPercent: null
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
    const { hoverPercent } = this.state
    const { currentTime, duration } = this.props
    const progressPercent = (currentTime / duration) * 100 || 0
    const percent = hoverPercent || progressPercent
    const onMouseEnter = () => {
      const el = document.getElementById('ProgressContainer')
      el.addEventListener('mousemove', e => {
        const x = e.offsetX
        const width = el.offsetWidth
        const hoverPercent = (x / width) * 100
        this.setState({ hoverPercent })
      })
    }
    const onMouseLeave = () => {
      const el = document.getElementById('ProgressContainer')
      el.removeEventListener('mousemove', () => {})
      this.setState({ hoverPercent: null })
    }
    return (
      <ProgressContainer id='ProgressContainer'
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}>
        <Progress
          style={!!hoverPercent ? { transition: 'none' } : {}}
          className='mt1 mb1 rounded'
          innerClassName='rounded-left'
          value={percent}
          hover={!!hoverPercent}
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
        <div style={{ paddingTop: '40px', paddingLeft: '30px'}}>
          <h1>Welcome to <a href="https://soundcloud.com/starcowsky" target="_blank">Abstracted</a> soundcloud hightlights.</h1>
          <h3><a href="https://t.me/overabstracted" target="_blank">Telegram channel</a> with <b>loseless</b> podcasts. Only near-romanian scene.</h3>
          <h4><a href="https://t.me/touchableopacity" target="_blank">PM me in telegram</a> for any reason.</h4>
          <h5><a href="https://github.com/andreystarkov/overabstracted" target="_blank">Github repo</a> waiting for your PR.</h5>

        </div>

      </div>
    )
  }
}


PlaylistSoundPlayer.propTypes = {
  resolveUrl: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired
};

export default withSoundCloudAudio(PlaylistSoundPlayer);
