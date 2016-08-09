import React from 'react'
import AddressPanelContainer from './AddressPanelContainer.jsx'
import MapPanelContainer from './MapPanelContainer.jsx'

let App = ({ store }) => {
  return (
    <main className="o-grid o-grid--no-gutter o-panel">
      <AddressPanelContainer />
      <MapPanelContainer />
    </main>
  )
}

export default App
