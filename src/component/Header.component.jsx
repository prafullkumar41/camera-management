import React from 'react'

export default function Header() {
  return (
    <div>
      <div className="header">
        <h2>Camera <span className="tomato">Management</span></h2>
        <div className="avatar">
          <img src={require('../images/prafull.jpeg')} width="60" height="60"  alt="Avatar" />
          <p className="avatar-name">Prafull Singh</p>         
        </div>
      </div>
    </div>
  )
}
