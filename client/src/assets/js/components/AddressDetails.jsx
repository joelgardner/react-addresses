import React from 'react'
import AddressAutocomplete from './AddressAutocomplete.jsx'

class AddressDetails extends React.Component {

  constructor() {
    super();

    this.state = {
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      label: 'business',
      isVisible: true
    };
  }

  // TODO: this function being here apparently causes React to give a warning about
  // controlled/uncontrolled inputs (though each input DOES have a value and an onChange even attached... hmm)
  // the fix is really to have separate components for Editing/Adding an address but for now we'll just deal
  // with the warning
  componentWillMount () {
    // this is called when edit mode is entered
    if (!this.props.editingAddress) return;
    this.setState({
      address: this.props.editingAddress,
      street1: this.props.editingAddress.street1,
      street2: this.props.editingAddress.street2,
      city: this.props.editingAddress.city,
      state: this.props.editingAddress.state,
      zip: this.props.editingAddress.zip,
      country: this.props.editingAddress.country,
      id: this.props.editingAddress.id
    });
  }

  // we use this react component lifecycle method to set the form's values from the auto-complete.
  // it is called when the autocomplete's selected address changes.
  // changes done by the user are handled within this component.  this means that if the user
  // enters info, then sets an address in the autocomplete, the form info will be overwritten
  // TODO: add a checkbox (checked by default) that determines whether to set the info
  // from the autocomplete, so the user can avoid their form info being overwritten if they want
  componentWillReceiveProps (nextProps) {
    if (!nextProps.editingAddress) return;
    this.setState({
      address: nextProps.editingAddress,
      street1: this.street(nextProps.editingAddress),
      street2: '',    // empty because street2 is only set by the user
      city: nextProps.editingAddress.locality,
      state: nextProps.editingAddress.administrative_area_level_1,
      zip: nextProps.editingAddress.postal_code,
      country: nextProps.editingAddress.country
    });
  }

  render () {
    return (
      <div>
        <nav className="c-nav c-nav--inline c-nav_secondary c-nav_secondary--add">
          <div className="o-grid o-grid--no-gutter">
            <div className="o-grid__cell o-grid__cell--width-fixed" style={{width:'26px'}}>
              <span className="c-nav__item">
                <i className="material-icons md-18">location_on</i>
              </span>
            </div>
            <div className="o-grid__cell">
              <AddressAutocomplete addressDidChange={(address) => this.props.onDidSelectAddress(this.formatAddress(address))} />
            </div>

          </div>
        </nav>

        <form id="address-inputs">
          <div className="o-container o-container--large">
            <label>Address type</label>
            <div>
              <span className="c-button-group" style={{width:'100%'}}>
                {['business', 'mailing', 'other'].map(t => {
                  return <button key={t} type="button" style={{width: '33.33333%'}} className={"c-button c-button--small " + (this.state.label === t ? 'c-button--misc' : 'c-button--misc-off')} onClick={() => this.setlabel(t)}>{t}</button>
                })}
              </span>
            </div>
          </div>

          <div className="o-container o-container--large">
            <label htmlFor="street_number">Street</label>
            <div className="c-field-group">
              <input id="street_number" placeholder="123 Main" value={this.state.street1} onChange={e => this.setState({ street1: e.target.value })} className="c-field c-field--small" type="text" />
              <input id="route" className="c-field c-field" value={this.state.street2} onChange={e => this.setState({ street2: e.target.value })} type="text" />
            </div>
           </div>

          <div className="o-container o-container--large">
            <label htmlFor="locality">City</label>
            <input id="locality" placeholder="Boulder" className="c-field c-field" value={this.state.city} onChange={e => this.setState({ city: e.target.value })} type="text" />
          </div>

          <div className="o-container o-container--large" style={{paddingBottom:0}}>
            <div className="o-grid o-grid--no-gutter">
              <div className="o-grid__cell">
                <label htmlFor="administrative_area_level_1">State</label>
              </div>
              <div className="o-grid__cell">
                <label htmlFor="postal_code">Zip code</label>
              </div>
            </div>
          </div>

          <div className="o-container o-container--large" style={{paddingTop:0}}>
            <div className="c-field-group-inline">
              <input id="administrative_area_level_1" className="c-field" value={this.state.state} onChange={e => this.setState({ state: e.target.value })}  placeholder="Colorado" />
              <input id="postal_code" className="c-field" placeholder="80301" value={this.state.zip} onChange={e => this.setState({ zip: e.target.value })}  />
            </div>
          </div>

          <div className="o-container o-container--large">
            <label htmlFor="country">Country</label>
            <input id="country" className="c-field c-field" placeholder="USA" value={this.state.country} onChange={e => this.setState({ country: e.target.value })}  type="text" />
          </div>

          <div className="o-container o-container--large">
            <div className="o-grid">
              <div className="o-grid__cell">
                <button type="button" className="c-button c-button--block" onClick={() => this.props.onCancelEditMode()}>Cancel</button>
              </div>
              <div className="o-grid__cell">
                <button type="button" className="c-button c-button--success c-button--block button__save" disabled={this.saveIsDisabled()} onClick={() => this.props.onSaveNewAddress(this.state, this.props.addresses)}>Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }

  // TODO: this will probably need to be moved to a utils container of some sort
  street (address) {
    if (!address) return '';
    var result = [];
    if (address.street_number) result.push(address.street_number);
    if (address.route) result.push(address.route);
    return result.join(' ');
  }

  saveIsDisabled() {
    return !this.state.street1 && !this.state.city && !this.state.state
  }

  formatAddress (place) {
    const componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
    };

    // https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
    const result = {};
    for (var i = 0; i < place.address_components.length; i++) {
      let label = place.address_components[i].types[0];
      if (componentForm[label]) {
        let val = place.address_components[i][componentForm[label]];
        result[label] = val;
      }
    }

    return result;
  }

  setlabel (type) {
    this.setState({
      label: type
    });
  }

}

export default AddressDetails
