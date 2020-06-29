import React from 'react'
import './Firms.scss'
import Navbar from '../../components/Navbar'

export default function Firms({ openSettingsModal }) {
  return (
    <>
      <Navbar
        className="navbar--discrete"
        openSettingsModal={openSettingsModal}
      />
      <main className="firms container"></main>
    </>
  )
}
