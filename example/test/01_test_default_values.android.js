import test from 'tape-async'
import helper from './utils/helper'

const { driver, idFromXPath, waitForText } = helper

test('Test if user can see default seleted items on dropdowns', async (t) => {
  const dropdownValueIdFirst = idFromXPath(`
    //android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/
    android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/
    android.widget.Spinner[1]/android.widget.LinearLayout[1]/
    android.widget.TextView[1]
  `)
  const dropdownValueIdSecond = idFromXPath(`
    //android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/
    android.widget.FrameLayout[1]/android.widget.FrameLayout[2]/
    android.widget.Spinner[1]/android.widget.LinearLayout[1]/
    android.widget.TextView[1]
  `)
  const dropdownIdFirst = idFromXPath(`
    //android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/
    android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/
    android.widget.Spinner[1]
  `)
  const dropdownIdSecond = idFromXPath(`
    //android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/
    android.widget.FrameLayout[1]/android.widget.FrameLayout[2]/
    android.widget.Spinner[1]
  `)

  const item11 = idFromXPath(`
    //android.widget.ListView[1]/android.widget.LinearLayout[1]/
    android.widget.TextView[1]
  `)

  const item21 = idFromXPath(`
    //android.widget.FrameLayout[1]/android.widget.ListView[1]/
    android.widget.LinearLayout[1]/
    android.widget.TextView[1]
  `)

  await driver.waitForVisible(dropdownValueIdFirst, 240000)

  const selectedItem11 = await driver.getText(dropdownValueIdFirst)
  const selectedItem21 = await driver.getText(dropdownValueIdSecond)

  t.equal('Three', selectedItem11, 'User should see selected item "Three" in first dropdown')
  t.equal('Four', selectedItem21, 'User should see selected item "Four" in second dropdown')

  await driver.click(dropdownIdFirst)

  await driver.waitForVisible(item11, 2000)
  await driver.click(item11)

  await driver.waitForVisible(dropdownIdSecond, 2000).click(dropdownIdSecond)

  await driver.waitForVisible(item21, 2000)
  await driver.click(item21)

  await driver.waitForVisible(dropdownValueIdFirst, 2000)
  const selectedItem12 = await driver.getText(dropdownValueIdFirst)

  await driver.waitForVisible(dropdownValueIdSecond, 2000)
  const selectedItem22 = await driver.getText(dropdownValueIdSecond)

  t.equal('One', selectedItem12, 'User should see selected item "One" in first dropdown')
  t.equal('One', selectedItem22, 'User should see selected item "One" in second dropdown')
})
