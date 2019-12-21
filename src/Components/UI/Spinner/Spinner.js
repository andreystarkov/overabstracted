import React from 'react'
import { IntersectingCirclesSpinner } from 'react-epic-spinners'
import { SpinnerContainer } from './SpinnerStyles'

function Spinner (props) {
  return (
    <SpinnerContainer>
      <IntersectingCirclesSpinner
        size={window.innerWidth / 5}
        color={'#111'}
        {...props} />
    </SpinnerContainer>
  )
}

export default Spinner
