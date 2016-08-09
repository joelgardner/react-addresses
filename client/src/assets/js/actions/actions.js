import Http from '../util/http'
import LocalStorage from '../util/utils'

// //
// /// Synchronous action creators
// //

export const NEW_ADDRESS = 'NEW_ADDRESS'
export function newAddress() {
 return { type : NEW_ADDRESS };
}

export const TOGGLE_ADDRESS_PANEL = 'TOGGLE_ADDRESS_PANEL'
export function toggleAddressPanel() {
 return { type : TOGGLE_ADDRESS_PANEL };
}

export const TOGGLE_AUTOFILL = 'TOGGLE_AUTOFILL'
export function toggleAutofill() {
 return { type : TOGGLE_AUTOFILL };
}

export const AUTOFILL_FROM_ADDRESS = 'AUTOFILL_FROM_ADDRESS'
export function autofillFromAddress(address) {
 return { type : AUTOFILL_FROM_ADDRESS, address: address };
}

export const DID_PUT_ADDRESS = 'DID_PUT_ADDRESS'
export function didPutAddress(address) {
 return { type : DID_PUT_ADDRESS, address: address };
}

export const CANCEL_EDIT_MODE = 'CANCEL_EDIT_MODE'
export function cancelEditMode() {
 return { type : CANCEL_EDIT_MODE };
}

export const SELECT_ADDRESS = 'SELECT_ADDRESS'
export function selectAddress(addressId) {
  return { type : SELECT_ADDRESS, id : addressId }
}

export const FILTER_ADDRESSES = 'FILTER_ADDRESSES'
export function filterAddresses(filterText) {
  return { type : FILTER_ADDRESSES, filterText : filterText }
}

export const EDIT_ADDRESS = 'EDIT_ADDRESS'
export function editAddress(address) {
  return { type : EDIT_ADDRESS, address : address }
}

export const DELETE_ADDRESS = 'DELETE_ADDRESS'
export function deleteAddress(address) {
  return { type : DELETE_ADDRESS, address : address }
}

export const TOGGLE_ADDRESS_ON_MAP = 'TOGGLE_ADDRESS_ON_MAP'
export function toggleAddressOnMap(address) {
  return { type : TOGGLE_ADDRESS_ON_MAP, address : address }
}

const LEAD_ENDPOINT = '/api/leads/lead_x';

/// thunk
export function saveAddress(address) {

  return function(dispatch) {
    return Http.put(LEAD_ENDPOINT, address)
          .then(res => {
            dispatch(didPutAddress(address));
          }, (err) => {
            console.error('uh oh, bad things (ignored): ' + err);
            dispatch(didPutAddress(address));
          });
  }
}
