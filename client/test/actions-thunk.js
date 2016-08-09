import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../src/assets/js/actions/actions'
import nock from 'nock'
import expect from 'expect'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates DID_PUT_ADDRESS when saving an address has been done', () => {
    nock('http://myaddresses.org/')
      .put('/addresses')
      .reply(200, { body: { addresses: [] }})

    const address = '123 Main St, Boulder CO, 80301'
    const expectedActions = [
      { type: actions.DID_PUT_ADDRESS, address: address }
    ]

    const store = mockStore({ addresses: [] })
    return store.dispatch(actions.saveAddress(address, []))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})

