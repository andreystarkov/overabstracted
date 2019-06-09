import React, { Component } from 'react'
import { Image, Box } from 'grommet'
import { Timer } from 'react-soundplayer/components'
import styled from 'styled-components'
import ClassNames from 'classnames'

import { IntersectingCirclesSpinner } from 'react-epic-spinners'

import './Playlist.css'

export const PlaylistContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`

export const SpinnerContainer = styled.div`
  min-height: 70vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PlaylistItem = styled.div`
  display: flex;
  position: relative;
  width: 50%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width:480px) {
    width: 100%;
  }
`

export const TrackCover = styled(Image)`
  width: 100px;
  height: 100px;
  flex: inherit;
  border-radius: 15rem;
  margin-right: 2rem;
`

export const TrackTitle = styled.span`
  font-size: 1.1rem;
  font-weight: 300;
`

export const UserTitle = styled.span`
  font-size: 1.1rem;
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const TrackTime = styled.div`
  position: absolute;
  right: 2rem;
  top: 2rem;
  font-size: 0.9rem;
  font-weight: 200;
`
export default class Playlist extends Component {
  renderItems = (track, i) => {
    const { onChoose, soundCloudAudio } = this.props
    const { currentTime } = soundCloudAudio.audio

    const isActive = (soundCloudAudio._playlistIndex === i && soundCloudAudio.playing)
    const classNames = ClassNames('playlist-item p2 border-box', {
      'is-active': isActive
    })

    console.log({ ...track })
    return (
      <PlaylistItem
        key={track.id}
        className={classNames}
        onClick={() => onChoose(i, isActive)}>
        <TrackCover
          fit='cover'
          src={track.artwork_url} />
        <TitleContainer>
          <UserTitle>{track.user.username}</UserTitle>
          <TrackTitle>{track.title}</TrackTitle>
        </TitleContainer>
        <TrackTime>
          {isActive && currentTime > 0
            ? Timer.prettyTime((track.duration / 1000) - currentTime)
            : Timer.prettyTime(track.duration / 1000)}
        </TrackTime>
      </PlaylistItem>
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
      return <SpinnerContainer>
        <IntersectingCirclesSpinner size={600} color={'#111'} />
      </SpinnerContainer>
    }

    const list = this.filterList()
    const tracks = list.map(this.renderItems)

    return (
      <PlaylistContainer>{tracks}</PlaylistContainer>
    )
  }
}
