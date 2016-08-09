
let check = () => {
  if (!sessionStorage) throw Error('no sessionStorage available.');
}

export const LocalStorage = {
  set: (key, value) => {
    check()
    sessionStorage.setItem(key, value)
  },

  get: (key) => {
    check()
    var result = sessionStorage.getItem(key);
    return result ? JSON.parse(result) : undefined;
  },

  getSavedState: () => {
    // state is stored to sessionStorage ... so I don't know why I named the module LocalStorage
    return LocalStorage.get('appState');
  }
}

let toCsv = (addresses) => {
  const result = ['street1,street2,city,state,zip,country,label'];

  for(let i = 0;i < addresses.length; ++i) {
    let a = addresses[i];
    result.push([
      a.street1,
      a.street2,
      a.city,
      a.state,
      a.zip,
      a.country,
      a.label
    ].reduce(function(line, value) {
      return line + (line ? ',' : '') + formatValue(value)  // don't put a comma at the start
    }, ''))
  }

  return result.join('\n');
}

// crude csv formatting
let formatValue = (v) => {
  if (v.indexOf(",") !== -1) {
    // since it has a comma, we must wrap in quotes
    // and as such, if it has quotes already, we must escape them
    v = v.replace(/"/g, "\"");
    v = '"' + v + '"';
  }
  return v;
}

export const exportAddresses = (addresses) => {

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(toCsv(addresses)));
  element.setAttribute('download', 'addresses.csv');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
}

const Utils = {
  addressMatchesFilterText: (address, filterText) => {
    // super basic substring filtering
    return ((filterText || '') === '') || [
      address.street1,
      address.street2,
      address.city,
      address.state,
      address.zip,
      address.country
    ].join('|').toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
  }
}

export default Utils
