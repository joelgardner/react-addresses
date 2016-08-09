import React from 'react'
import MapPanel from './MapPanel.jsx'
import { connect } from 'react-redux'
import { toggleAddressPanel } from '../actions/actions'

const mapStateToProps = (state) => {
  return {
    addresses : state.addresses,
    sizeMode : state.views.mapPanel.sizeMode,
    selectedAddressId: state.views.mapPanel.selectedAddressId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleAddressPanel: () => dispatch(toggleAddressPanel())
  }
}

const MapPanelContainer = connect(mapStateToProps, mapDispatchToProps)(MapPanel)

export default MapPanelContainer
