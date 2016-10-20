import test from 'tape-async'
import helper from './utils/helper'

const { driver, idFromResourceId, idFromXPath } = helper

test('Test if user can select items from dropdown', async (t) => {
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

  const item11 = idFromXPath(`//android.widget.ListView[1]/
    android.widget.LinearLayout[1]/android.widget.TextView[1]`)
  const item12 = idFromXPath(`//android.widget.ListView[1]/
    android.widget.LinearLayout[2]/android.widget.TextView[1]`)
  const item13 = idFromXPath(`//android.widget.ListView[1]/
    android.widget.LinearLayout[3]/android.widget.TextView[1]`)
  const item14 = idFromXPath(`//android.widget.ListView[1]/
    android.widget.LinearLayout[4]/android.widget.TextView[1]`)

  const item21 = idFromXPath(`//android.widget.FrameLayout[1]/
    android.widget.ListView[1]/android.widget.LinearLayout[1]/
    android.widget.TextView[1]`);

  const item22 = idFromXPath(`//android.widget.FrameLayout[1]/
    android.widget.ListView[1]/android.widget.LinearLayout[2]/
    android.widget.TextView[1]`);

  const item23 = idFromXPath(`//android.widget.FrameLayout[1]/
    android.widget.ListView[1]/android.widget.LinearLayout[3]/
    android.widget.TextView[1]`);

  const item24 = idFromXPath(`//android.widget.FrameLayout[1]/
    android.widget.ListView[1]/android.widget.LinearLayout[4]/
    android.widget.TextView[1]`);

  const selectedItem11 = await driver.getText(dropdownValueIdFirst)
  const selectedItem21 = await driver.getText(dropdownValueIdSecond)
  t.equal('One', selectedItem11, 'User should see selected item "One" in first dropdown')
  t.equal('One', selectedItem21, 'User should see selected item "One" in second dropdown')

  await driver.click(dropdownIdFirst)
  await driver.click(item12)

  const selectedItem12 = await driver.getText(dropdownValueIdFirst)
  const selectedItem22 = await driver.getText(dropdownValueIdSecond)
  t.equal('Two', selectedItem12, 'User should see selected item "Two" in first dropdown')
  t.equal('One', selectedItem22, 'User should see selected item "One" in second dropdown')

  await driver.click(dropdownIdFirst)
  await driver.click(item13)

  const selectedItem13 = await driver.getText(dropdownValueIdFirst)
  const selectedItem23 = await driver.getText(dropdownValueIdSecond)
  t.equal('Three', selectedItem13, 'User should see selected item "Three" in first dropdown')
  t.equal('One', selectedItem23, 'User should see selected item "One" in second dropdown')

  await driver.click(dropdownIdFirst)
  await driver.click(item14)

  const selectedItem14 = await driver.getText(dropdownValueIdFirst)
  const selectedItem24 = await driver.getText(dropdownValueIdSecond)
  t.equal('Four', selectedItem14, 'User should see selected item "Four" in first dropdown')
  t.equal('One', selectedItem24, 'User should see selected item "One" in second dropdown')

  await driver.click(dropdownIdFirst)
  await driver.click(item11)

  const selectedItem15 = await driver.getText(dropdownValueIdFirst)
  const selectedItem25 = await driver.getText(dropdownValueIdSecond)
  t.equal('One', selectedItem15, 'User should see selected item "One" in first dropdown')
  t.equal('One', selectedItem25, 'User should see selected item "One" in second dropdown')

  await driver.click(dropdownIdSecond)
  await driver.click(item22)

  const selectedItem16 = await driver.getText(dropdownValueIdFirst)
  const selectedItem26 = await driver.getText(dropdownValueIdSecond)
  t.equal('One', selectedItem16, 'User should see selected item "One" in first dropdown')
  t.equal('Two', selectedItem26, 'User should see selected item "Two" in second dropdown')

  await driver.click(dropdownIdSecond)
  await driver.click(item23)

  const selectedItem17 = await driver.getText(dropdownValueIdFirst)
  const selectedItem27 = await driver.getText(dropdownValueIdSecond)
  t.equal('One', selectedItem17, 'User should see selected item "One" in first dropdown')
  t.equal('Three', selectedItem27, 'User should see selected item "Three" in second dropdown')

  await driver.click(dropdownIdSecond)
  await driver.click(item24)

  const selectedItem18 = await driver.getText(dropdownValueIdFirst)
  const selectedItem28 = await driver.getText(dropdownValueIdSecond)
  t.equal('One', selectedItem18, 'User should see selected item "One" in first dropdown')
  t.equal('Four', selectedItem28, 'User should see selected item "Four" in second dropdown')
})
