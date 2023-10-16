import VizzuMock from './vizzu.js'

class Vizzu extends VizzuMock {
  get instanceMockType() {
    return 'cdnInstance'
  }

  static get classMockType() {
    return 'cdnClass'
  }
}

export default Vizzu
