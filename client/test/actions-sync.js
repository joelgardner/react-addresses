import expect from 'expect'
import * as actions from '../src/assets/js/actions/actions'

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const address = '123 Main St, Boulder CO, 80301'
    const expectedAction = {
      type: actions.DELETE_ADDRESS,
      address
    }
    expect(actions.deleteAddress(address)).toEqual(expectedAction)
  })
})
