import styled, { css } from 'styled-components'
import { rem } from 'polished'

import { infiniteRotateAnimation } from 'Styles/Animations'
import { Colors } from 'Theme'

export const PlaylistContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`

export const PlaylistItem = styled.div`
  display: flex;
  position: relative;
  width: 50%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: ${rem('10px')};
  transition: 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-bottom: 3px solid rgba(0, 0, 0, 0.03);
  cursor: pointer;
  ${props =>
    props.isActive &&
    css`
      background-color: ${Colors.bglight};
      border-bottom: 3px solid rgba(0, 0, 0, 0.1);
      ${TrackCover} {
        ${infiniteRotateAnimation}
      }
    `}
  &:hover {
    background-color: #f1efee;
    border-bottom: 3px solid #e4e0e0;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`

export const TrackCover = styled.img`
  width: ${rem('100px')};
  height: ${rem('100px')};
  flex: inherit;
  border-radius: ${rem('50px')};
`

export const TrackTitle = styled.span`
  font-size: ${rem('15px')};
  font-weight: 400;
`

export const UserTitle = styled.span`
  font-size: ${rem('12px')};
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${rem('15px')};
`

export const TrackTime = styled.div`
  position: absolute;
  right: 2rem;
  top: 2rem;
  font-size: 0.9rem;
  font-weight: 200;
`
