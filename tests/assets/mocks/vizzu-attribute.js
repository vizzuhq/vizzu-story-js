import VizzuMock from './vizzu.js'

class Vizzu extends VizzuMock {
  get instanceMockType() {
    return 'attributeInstance'
  }

  static get classMockType() {
    return 'attributeClass'
  }
}

export default Vizzu
