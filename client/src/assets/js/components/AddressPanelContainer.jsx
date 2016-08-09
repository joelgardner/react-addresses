import React from 'react'
import AddressPanel from './AddressPanel.jsx'
import { connect } from 'react-redux'
import {
  newAddress,
  toggleAutofill,
  autofillFromAddress,
  saveAddress,
  cancelEditMode,
  selectAddress,
  filterAddresses,
  editAddress,
  deleteAddress,
  toggleAddressOnMap
} from '../actions/actions'

const mapStateToProps = (state) => {
  return {
    addresses: state.addresses,
    isVisible: state.views.addressPanel.isVisible,
    mode: state.views.addressPanel.mode,
    autofillAddressInfo: state.views.addressPanel.autofillAddressInfo,
    editingAddress: state.views.addressPanel.editingAddress,
    selectedAddressId: state.views.addressPanel.selectedAddressId,
    filterText: state.views.addressPanel.filterText
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddAddressClick: () =>
      dispatch(newAddress()),
    onToggleAutofill: () =>
      dispatch(toggleAutofill()),
    onDidSelectAddressFromAutocomplete: (address) =>
      dispatch(autofillFromAddress(address)),
    onSaveNewAddress: (address, addresses) =>
      dispatch(saveAddress(address, addresses)),
    onCancelEditMode: () =>
      dispatch(cancelEditMode()),
    onAddressClick: (address) =>
      dispatch(selectAddress(address.id)),
    onFilterAddresses: (filterText) =>
      dispatch(filterAddresses(filterText)),
    onEditAddress: (address) =>
      dispatch(editAddress(address)),
    onDeleteAddress: (address) =>
      dispatch(deleteAddress(address)),
    onToggleAddressOnMap: (address) =>
      dispatch(toggleAddressOnMap(address))
  }
}

const AddressPanelContainer = connect(mapStateToProps, mapDispatchToProps)(AddressPanel)

export default AddressPanelContainer
