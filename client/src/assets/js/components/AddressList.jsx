import React from 'react'
import Address from './Address.jsx'
//import { connect } from 'react-redux'

class AddressList extends React.Component {

  render()  {
    return (
      <div>
        {this._renderAddresses(this.props.addresses)}
      </div>
    )
  }

  _renderAddresses(addresses) {
    if (!addresses || !addresses.length) {
      return this._renderEmpty();
    }

    return (
      <div className="o-panel o-panel--nav-top o-panel--nav-bottom">
        <div className="c-card c-card--highest">
          {addresses.map((a, i) => (
            !a.isVisible
            ? null
            : <Address key={i}
                address={a}
                onAddressClick={this.props.onAddressClick}
                selected={this.props.selectedAddressId === a.id}
                onToggleAddressOnMap={this.props.onToggleAddressOnMap} />
          ))}
        </div>
      </div>
    )
  }

  _renderEmpty() {
    return (
      <div className="addresses__indicator_icon">
        <p>
          <i className="material-icons">error_outline</i>
        </p>
        <p>
          <span>No addresses associated with this contact.</span>
        </p>
        <button className="c-button c-button--success" onClick={this.props.onAddAddressClick}>Create one!</button>
      </div>
    )
  }
}

export default AddressList

