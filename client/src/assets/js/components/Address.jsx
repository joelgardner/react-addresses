import React from 'react'
//import { connect } from 'react-redux'

let Address = ({ address, onAddressClick, selected, onToggleAddressOnMap, isOnMap }) => {
  return (
    <div className={"c-card__item u-pillar-box--large addresses__panel__address_item" + (selected ? ' addresses__panel__address_item--selected' : '')} onClick={() => onAddressClick(address)}>
      <div className="o-grid">
        <div className="o-grid__cell o-grid__cell--width-fixed  o-grid__cell--no-gutter u-center-block" style={{width:30}}>
            <div className="u-center-block__content u-center-block__content--vertical">
              <i className="material-icons">{getIconClass(address.label)}</i>
            </div>
        </div>
        <div className="o-grid__cell">
          {streetMarkup(address)}
        </div>
        <div className="o-grid__cell o-grid__cell--width-fixed u-center-block" style={{width:30}}>
            <div onClick={(e) => { e.stopPropagation(); onToggleAddressOnMap(address)}} className={"u-center-block__content u-center-block__content--vertical addresses__panel__address_item__map_icon" + (address.isOnMap ? " addresses__panel__address_item__map_icon--active" : "")}>
              <i className="material-icons md-18">map</i>
            </div>
        </div>
      </div>
    </div>
  )
}

let streetMarkup = (address) => {
  // yeah I know super weird
  return address.street2
    ? (
      <address className="c-address">
        {address.street1}
        <br />
        <span className="c-text--quiet">{address.street2}</span>
        <br />
        {address.city} {address.state}, {address.zip}
        <br />
        {address.country}
      </address>
    )
    : (
      <address className="c-address">
        {address.street1}
        <br />
        {address.city} {address.state}, {address.zip}
        <br />
        {address.country}
      </address>
    )
}

let getIconClass = (label) => {
  switch (label) {
    case 'business': return 'business'; // ha
    case 'mailing': return 'email';
    case 'other': return 'language';
  }
  return 'business'
}

export default Address
