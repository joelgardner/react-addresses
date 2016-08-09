import React from 'react'
import Map from './Map.jsx'

//import { connect } from 'react-redux'

let MapPanel = ({ addresses, onToggleAddressPanel, sizeMode, selectedAddressId }) => {
  return (
    <div className={"o-panel-container map__panel--" + sizeMode}>

      <nav className="c-nav c-nav--inline c-nav--light">
        <span className="c-nav__item" onClick={onToggleAddressPanel}>
          <i className="material-icons md-18">{sizeMode === 'open' ? 'navigate_before' : 'navigate_next'}</i>
        </span>
      </nav>

      <Map
        addresses={addresses}
        selectedAddressId={selectedAddressId} />

    </div>
  );
}
//Address = connect()(Address)

export default MapPanel
