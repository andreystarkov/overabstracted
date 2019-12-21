import React from 'react'
import { Timer } from 'react-soundplayer/components'

import { Spinner } from 'Components/UI'

import {
  PlaylistItem,
  TrackCover,
  TitleContainer,
  UserTitle,
  TrackTitle,
  TrackTime,
  PlaylistContainer
} from './PlaylistStyles'

function Playlist ({ onChoose, soundCloudAudio, playlist, searchString }) {
  const renderItem = (track, i) => {
    const { currentTime } = soundCloudAudio.audio
    const isActive = !!(soundCloudAudio._playlistIndex === i && soundCloudAudio.playing)
    return (
      <PlaylistItem
        key={track.id}
        isActive={isActive}
        onClick={() => onChoose(i, isActive)}>
        <TrackCover fit='cover' src={track.artwork_url} />
        <TitleContainer>
          <UserTitle>{track.user.username}</UserTitle>
          <TrackTitle>{track.title}</TrackTitle>
        </TitleContainer>
        <TrackTime>
          {isActive && currentTime > 0
            ? Timer.prettyTime(track.duration / 1000 - currentTime)
            : Timer.prettyTime(track.duration / 1000)}
        </TrackTime>
      </PlaylistItem>
    )
  }

  const searchFilter = () => {
    let tracks = playlist.tracks
    if (searchString) {
      tracks = tracks.filter(
        f =>
          f.title.toLowerCase().includes(searchString.toLowerCase()) ||
          f.description.toLowerCase().includes(searchString.toLowerCase())
      )
    }
    return tracks
  }

  if (!playlist) {
    return <Spinner />
  }

  const list = searchFilter()
  const tracks = list.map(renderItem)

  return <PlaylistContainer>{tracks}</PlaylistContainer>
}

export default Playlist
