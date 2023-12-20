import React from 'react'
import loading from '../assets/images/Loading.gif';

const Loading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <img src={loading} alt="" />
      <h4>Loading...</h4>
    </div>
  )
}

export default Loading