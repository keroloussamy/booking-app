import React from 'react'
import "./loader.css";

const Loader = ({ text = '', size = '5em' }) => {
  const header = text ? <h4>{text}</h4> : null
  return (
    <div className="spinner">
      {header}
      <div className="loader" style={{ height: size, width: size }} />
    </div>
  )
}

export default Loader