import { combineReducers } from 'redux'
import {
	NEW_ADDRESS,
  TOGGLE_ADDRESS_PANEL,
  TOGGLE_AUTOFILL,
  AUTOFILL_FROM_ADDRESS,
  DID_PUT_ADDRESS,
  CANCEL_EDIT_MODE,
  UPDATE_ADDRESS_IN_STATE,
  SAVE_ADDRESS,
  SELECT_ADDRESS,
  FILTER_ADDRESSES,
  EDIT_ADDRESS,
  DELETE_ADDRESS,
  TOGGLE_ADDRESS_ON_MAP
} from "../actions/actions"
import { AddressSubviews } from '../util/enums'
import Utils from '../util/utils'

/**
ADDRESSES STATE
**/

function addresses(state = [], action) {
  let result
  let i;
	switch (action.type) {
    // case DID_PUT_ADDRESS:
    //   return state.slice().concat([ action.address ]);
    case DID_PUT_ADDRESS:
      result = state.slice();

      // attempt to find an address of the same id.
      // if we find it, the save was an edit. find it in the array and update its values.
      for(i = 0;i < result.length;++i) {
        if (result[i].id === action.address.id) {
          return (
            result
              .slice(0, i)
              .concat([ action.address ])
              .concat(result.slice(i + 1))
          )
        }
      }

      // setting the id would normally be done on the server of course but we're faking it here
      if (!action.address.id) {
        action.address.id = 'lead_x-address-' + result.length
        action.address.isOnMap = true;
      }

      // if we made it here we can assume we added it
      result.push(action.address);
      return result;
    case FILTER_ADDRESSES:
      result = state.slice();
      for(i = 0;i < result.length;++i) {
        result[i].isVisible = Utils.addressMatchesFilterText(result[i], action.filterText)
      }
      return result;
    case DELETE_ADDRESS:
      result = state.slice();
      i = result.indexOf(action.address);
      return (
        i === -1
          ? result
          : result.slice(0, i).concat(result.slice(i + 1))
      )
    case SELECT_ADDRESS:
      result = state.slice();
      let address = result.filter(a => a.id === action.id)[0];
      address.isOnMap = true;
      return result;
    case TOGGLE_ADDRESS_ON_MAP:
      result = state.slice();
      i = result.indexOf(action.address);
      if (i !== -1) result[i].isOnMap = !result[i].isOnMap;
      return result;
		default:
			return state;
	}
}

/**
VIEW STATE
Keeps track of which views should show.  For example, on a mobile phone, we want to display a button to toggle the address
panel open/closed.
View state consists of two subkeys, addressPanelState and mapPanelState
Each property's value looks like: {
  isVisible: true|false,
  mode: 'hidden'|'create'|'read'|'update'|'delete'
}
-
**/
var initialViewState = {
  addressPanel: {
    isVisible: true,
    mode: AddressSubviews.Default,
    autofillAddressInfo: true,
    selectedAddressId: null
  },
  mapPanel: {
    isVisible: true,
    sizeMode: 'open'
  }
}

function views(state = initialViewState, action) {
  let result;
  switch (action.type) {
    case NEW_ADDRESS:
      result = Object.assign({}, state);
      //result.addressPanel.isVisible = true;
      result.addressPanel.mode = result.addressPanel.mode === AddressSubviews.AddAddress ? AddressSubviews.Default : AddressSubviews.AddAddress;
      return result;
    case TOGGLE_ADDRESS_PANEL:
      result = Object.assign({}, state);
      result.addressPanel.isVisible = !result.addressPanel.isVisible;
      result.mapPanel.sizeMode = result.addressPanel.isVisible ? 'open' : 'fill';
      return result;
    case TOGGLE_AUTOFILL:
      result = Object.assign({}, state);
      result.addressPanel.autofillAddressInfo = !result.addressPanel.autofillAddressInfo;
      return result;
    case AUTOFILL_FROM_ADDRESS:
      result = Object.assign({}, state);
      result.addressPanel.editingAddress = action.address;    // editingAddress is a bad name
      return result;
    case DID_PUT_ADDRESS:
      result = Object.assign({}, state)
      result.addressPanel.mode = AddressSubviews.Default
      result.addressPanel.selectedAddressId = action.address.id;
      result.mapPanel.selectedAddressId = action.address.id;
      return result
    case CANCEL_EDIT_MODE:
      result = Object.assign({}, state)
      result.addressPanel.mode = AddressSubviews.Default
      return result
    case SELECT_ADDRESS:
      result = Object.assign({}, state)
      result.addressPanel.selectedAddressId = action.id;
      result.mapPanel.selectedAddressId = action.id;
      return result;
    case FILTER_ADDRESSES:
      result = Object.assign({}, state)
      result.addressPanel.filterText = action.filterText;
      return result;
    case EDIT_ADDRESS:
      result = Object.assign({}, state)
      result.addressPanel.editingAddress = action.address;
      result.addressPanel.mode = AddressSubviews.EditAddress
      return result;
    case DELETE_ADDRESS:
      result = Object.assign({}, state)
      delete result.addressPanel.selectedAddressId
      return result;
    default:
      return state;
  }
}

/**
ROOT APPLICATION STATE
**/

const baselineApp = combineReducers({
	addresses,
  views
})

export default baselineApp
