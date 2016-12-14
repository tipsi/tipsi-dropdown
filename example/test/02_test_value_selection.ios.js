import test from 'tape-async'
import helper from './utils/helper'

const { driver, idFromXPath } = helper

const dropdown1 = {
  model: {
    nextSelectedIndex: 2,
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
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/
      XCUIElementTypeCell
    `),
    nextSelectedItem: idFromXPath(`
      /XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther[2]/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/
      XCUIElementTypeCell[3]/XCUIElementTypeStaticText
    `),
  },
};

const dropdown2 = {
  model: {
    nextSelectedIndex: 3,
    items: [{text: 'One'}, {text: 'Two'}, {text: 'Three'}, {text: 'Four'}],
  },
  view: {
    dropdown: idFromXPath(`
      /XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/
      XCUIElementTypeButton
    `),
    items: idFromXPath(`
      /XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther[2]/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/
      XCUIElementTypeCell
    `),
    nextSelectedItem: idFromXPath(`
      /XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther[2]/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/
      XCUIElementTypeCell[4]/XCUIElementTypeStaticText
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

test('Test if user can select items from dropdown', async (t) => {
  try {
    for (const {dropdown, dropdownDescription} of dropdowns) {
      await driver.waitForVisible(dropdown.view.dropdown, 2000);
      t.pass(`The user should see ${dropdownDescription}`);

      await driver.click(dropdown.view.dropdown);
      t.pass(`The user should be able to click on ${dropdownDescription}`);

      await driver.waitForVisible(dropdown.view.items, 2000);
      t.pass(`The user should see items in ${dropdownDescription}`);

      const itemsCount = dropdown.model.items.length;
      const { value: items } = await driver.elements(dropdown.view.items);
      const sut_itemsCount = items.length;
      t.equal(sut_itemsCount, itemsCount, `The user should see that ${dropdownDescription} has ${itemsCount} items`);

      const nextSelectedItemText = dropdown.model.items[dropdown.model.nextSelectedIndex].text;
      const sut_nextSelectedItemText = await driver.getText(dropdown.view.nextSelectedItem);
      t.equal(sut_nextSelectedItemText, nextSelectedItemText, `The user should see next selected item "${nextSelectedItemText}" in ${dropdownDescription}`);

      await driver.click(dropdown.view.nextSelectedItem);
      t.pass(`The user should be able to click to next selected item in ${dropdownDescription}`);

      const sut_nextText = await driver.getText(dropdown.view.dropdown);
      t.equal(sut_nextText, sut_nextSelectedItemText, `The user should see that ${dropdownDescription} was changed selected item to next selected item "${nextSelectedItemText}"`);
    };
  } catch (error) {
    await helper.screenshot()
    await helper.source()

    throw error
  }
})
