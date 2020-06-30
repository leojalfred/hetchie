import React from 'react'
import './Firms.scss'
import Navbar from '../../components/Navbar'

export default function Firms({ openSettingsModal, openPreferencesModal }) {
  return (
    <>
      <Navbar
        className="navbar--discrete"
        openSettingsModal={openSettingsModal}
        openPreferencesModal={openPreferencesModal}
      />
      <main className="firms container"></main>
    </>
  )
}
