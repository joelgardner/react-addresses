import React from 'react'
import ReactDOM from 'react-dom'

class AddressAutocomplete extends React.Component {
  constructor() {
    super();
    this.autocomplete = null
  }

  render() {
    return (
      <input
        className="c-field c-field addresses__secondary_nav__text addresses__secondary_nav__text--add"
        id="autocomplete"
        ref="autocompleteInput"
        placeholder="Quickly find any address..."
        type="text"></input>
    )
  }

  componentDidMount() {
    const e = ReactDOM.findDOMNode(this.refs.autocompleteInput);
    this.initAutocomplete(e, this.props.addressDidChange);
    e.focus();
  }

  componentWillUnmount() {
    // probably a mem leak
    // figure out how to tear down the input and the bolted-on google autocomplete
  }

  initAutocomplete(input, addressDidChange) {
    this.autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'] });
    this.autocomplete.addListener('place_changed', () => {
      addressDidChange(this.autocomplete.getPlace());
    });
    input.focus();
  }
}

export default AddressAutocomplete
