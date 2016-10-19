import test from 'tape-async'
import helper from './utils/helper'

const { driver, idFromResourceId, idFromXPath } = helper

test('Test if user can select items from dropdown', async (t) => {
  const dropdownValueId = idFromResourceId('com.example:id/dropdownTextItemId')
  const dropdownId = idFromResourceId('com.example:id/dropdownId')

  // const item1 = idFromXPath(`//android.widget.ListView[1]/
  //   android.widget.LinearLayout[1]/android.widget.TextView[1]`)
  const item2 = idFromXPath(`//android.widget.ListView[1]/
    android.widget.LinearLayout[2]/android.widget.TextView[1]`)
  const item3 = idFromXPath(`//android.widget.ListView[1]/
    android.widget.LinearLayout[3]/android.widget.TextView[1]`)
  const item4 = idFromXPath(`//android.widget.ListView[1]/
    android.widget.LinearLayout[4]/android.widget.TextView[1]`)

  await driver.waitForVisible(dropdownValueId, 6000)

  const selectedItem1 = await driver.getText(dropdownValueId)
  t.equal('one', selectedItem1, 'User should see selected item "One"')

  await driver.click(dropdownId)
  await driver.click(item2)

  const selectedItem2 = await driver.getText(dropdownValueId)
  t.equal('two', selectedItem2, 'User should see selected item "Two"')

  await driver.click(dropdownId)
  await driver.click(item3)

  const selectedItem3 = await driver.getText(dropdownValueId)
  t.equal('three', selectedItem3, 'User should see selected item "Three"')

  await driver.click(dropdownId)
  await driver.click(item4)

  const selectedItem4 = await driver.getText(dropdownValueId)
  t.equal('four', selectedItem4, 'User should see selected item "Four"')
})
