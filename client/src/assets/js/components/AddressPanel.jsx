import React from 'react'
import ReactDOM from 'react-dom'
import AddressList from './AddressList.jsx'
import { AddressSubviews } from '../util/enums'
import AddressAutocomplete from './AddressAutocomplete.jsx'
import AddressDetails from './AddressDetails.jsx'
import { exportAddresses } from '../util/utils'

//import { connect } from 'react-redux'

class AddressPanel extends React.Component {

  constructor() {
    super();
    this.state = {
      searchText: ''
    };

    this.timeout = null;
  }

  componentWillMount() {
    this.setState({ searchText: this.props.filterText })
  }

  render()  {
    return (
      <div className={'o-panel-container addresses__panel addresses__panel--' + (this.props.isVisible ? 'open' : 'closed')}>
        <nav className="c-nav c-nav--inline c-nav--light">
          <span onClick={() => exportAddresses(this.props.addresses)} className="c-nav__item">
            <i className="material-icons md-18">import_contacts</i>
          </span>
          <span className="c-nav__item c-nav__item--text c-text--loud">
            Addresses
          </span>
          <span className={"c-nav__item c-nav__item--right addresses__panel__navbtn--add" + (this.props.mode === AddressSubviews.AddAddress ? ' selected' : '')} onClick={this.props.onAddAddressClick}>
            <i className="material-icons md-18">add</i>
          </span>
        </nav>
        { this.displaySubview(this.props) }
      </div>
    )
  }


  displaySubview(props) {
    switch (props.mode) {
      case AddressSubviews.Default: return this.defaultView(props);

      // TODO: this is ridiculous.  turn it into:
      // React.renderComponent(AddressDetails, props) or whatever the syntax is
      case AddressSubviews.EditAddress:
      case AddressSubviews.AddAddress: return (
        <AddressDetails
          onToggleAutofill={props.onToggleAutofill}
          autofillAddressInfo={props.autofillAddressInfo}
          onDidSelectAddress={props.onDidSelectAddressFromAutocomplete}
          editingAddress={props.editingAddress}
          isVisible={props.isVisible}
          onSaveNewAddress={props.onSaveNewAddress}
          onCancelEditMode={props.onCancelEditMode}
          addresses={props.addresses} />
      )

      default: debugger;
    }
  }

  // TODO: convert these to actual components?
  defaultView({ addresses, onAddAddressClick, isVisible, viewMode, onAddressClick, selectedAddressId, filterText, onEditAddress, onToggleAddressOnMap }) {
    return (
      <div className="o-panel o-panel--nav-top">
        <nav className="c-nav c-nav--inline c-nav_secondary c-nav_secondary--filter">
          <div className="o-grid o-grid--no-gutter">
            <div className="o-grid__cell o-grid__cell--width-fixed" style={{width:'26px'}}>
              <span className="c-nav__item c-nav__item--text">
                <i className="material-icons md-18">search</i>
              </span>
            </div>
            <div className="o-grid__cell">
              <input
                className="c-field c-field addresses__secondary_nav__text addresses__secondary_nav__text--filter"
                id="address-filter"
                ref="filterInput"
                placeholder="Filter your addresses"
                defaultValue={this.state.searchText}
                type="text"
                onChange={(e) => this.handleFilterInput(e)}></input>
            </div>
            <div className="o-grid__cell o-grid__cell--width-fixed" style={{width:'32px'}}>
              <span className="c-nav__item c-nav__item c-nav__item__clear_filter" onClick={() => this.clearFilter()}>
                <i className="material-icons md-18">cancel</i>
              </span>
            </div>
          </div>
        </nav>

        <AddressList
          addresses={addresses}
          onAddAddressClick={onAddAddressClick}
          onAddressClick={onAddressClick}
          selectedAddressId={selectedAddressId}
          onToggleAddressOnMap={onToggleAddressOnMap} />

        <nav className="c-nav c-nav--bottom c-nav--inline">
          <div className="o-grid">
            <div className="o-grid__cell--no-gutter">
              <span className="c-nav__content">{this.getCountDescription()}</span>
            </div>
            {this.props.selectedAddressId
              ? <div className="o-grid__cell o-grid__cell--no-gutter addresses__panel__footer">
                  <span className="c-nav__item c-nav__item c-nav__item--right" onClick={() => this.editAddress()}><i className="material-icons md-18">mode_edit</i></span>
                  <span className="c-nav__item c-nav__item c-nav__item--right" onClick={() => this.deleteAddress()}><i className="material-icons md-18">delete</i></span>
                </div>
              : null}
          </div>

        </nav>
      </div>
    )
  }

  editAddress () {
    let address = this.props.addresses.filter(a => {
      return a.id === this.props.selectedAddressId
    })[0];
    this.props.onEditAddress(address);
  }

  deleteAddress() {
    let address = this.props.addresses.filter(a => {
      return a.id === this.props.selectedAddressId
    })[0];
    this.props.onDeleteAddress(address);
  }

  handleFilterInput(e) {
    this.filterAddresses(e.target.value)
  }

  getCountDescription() {
    var showing = this.props.addresses.reduce(function(count, address) {
      return address.isVisible ? count + 1 : count;
    }, 0)

    return (
      showing === this.props.addresses.length
        ? `Displaying ${showing} addresses.`
        : `Displaying ${showing} of ${this.props.addresses.length} addresses.`
    )
  }

  filterAddresses(filterText) {
    this.setState({ searchText: filterText });

    this.debounce(() => {
      this.props.onFilterAddresses(this.state.searchText);
      this.timeout = null;
    }, 250);
  }

  clearFilter() {
    this.filterAddresses('');
    const e = ReactDOM.findDOMNode(this.refs.filterInput);
    e.value = '';
  }

  debounce(fn, ms) {

    // clear any currently active timeout
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    // and set a new one
    this.timeout = setTimeout(() => {
      fn.call(this);
      this.timeout = null;
    }, ms);
  }
}

export default AddressPanel
