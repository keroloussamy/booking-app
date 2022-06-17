import React from 'react'
import loaderImg from '../../images/loader.gif'

const Loader = ({ size = '5em' }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={loaderImg} alt='loader' style={{ height: size, width: size }} />
    </div>
  )
}

export default Loader