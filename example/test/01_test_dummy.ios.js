import test from 'tape-async'
import helper from './utils/helper'

const { driver, idFromXPath } = helper

test('Test if user can select items from dropdown', async (t) => {
  try {
    const dropdownId = idFromXPath('//UIAApplication[1]/UIAWindow[1]/UIAPicker[1]/UIAPickerWheel[1]')

    await driver.waitForVisible(dropdownId, 60000)

    t.pass('User should see selected dropdown')
  } catch (error) {
    await helper.screenshot()
    await helper.source()

    throw error
  }
})
