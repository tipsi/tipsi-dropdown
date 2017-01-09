import test from 'tape-async'
import helper from 'tipsi-appium-helper'

const { driver, idFromXPath } = helper

const dropdown1 = {
  model: {
    initialIndex: 3,
    items: [{text: 'One'}, {text: 'Two'}, {text: 'Three'}, {text: 'Four'}],
  },
  view: {
    dropdown: idFromXPath(`
      /XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/
      XCUIElementTypeButton
    `),
    items: idFromXPath(`
      /XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther[2]/
      XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeTable/
      XCUIElementTypeCell
    `),
    nextSelectedItem: idFromXPath(`
      /XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther[2]/
      XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeTable/
      XCUIElementTypeCell[3]/XCUIElementTypeStaticText
    `),
  },
};

const dropdown2 = {
  model: {
    initialIndex: 1,
    items: [{text: 'One'}, {text: 'Two'}, {text: 'Three'}, {text: 'Four'}],
  },
  view: {
    dropdown: idFromXPath(`
      /XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/
      XCUIElementTypeButton
    `),
  },
};

const dropdowns = [
  {
    dropdown: dropdown1,
    dropdownDescription: "first dropdown",
  },
  {
    dropdown: dropdown2,
    dropdownDescription: "second dropdown",
  },
];

test('Test if user can see default seleted items on dropdowns', async (t) => {
  try {
    for (const {dropdown, dropdownDescription} of dropdowns) {
      await driver.waitForVisible(dropdown.view.dropdown, 10000);
      t.pass(`The user should see ${dropdownDescription}`);

      const initialText = dropdown.model.items[dropdown.model.initialIndex].text;
      const sut_initialText = await driver.getText(dropdown.view.dropdown);
      t.equal(sut_initialText, initialText, `The user should see selected item "${initialText}" in ${dropdownDescription}`);
    }
  } catch (error) {
    await helper.screenshot()
    await helper.source()

    throw error
  }
})
