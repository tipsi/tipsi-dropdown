# tipsi-dropdown

[![npm version](https://img.shields.io/npm/v/tipsi-dropdown.svg?style=flat-square)](https://www.npmjs.com/package/tipsi-dropdown)
[![build status](https://img.shields.io/travis/tipsi/tipsi-dropdown/master.svg?style=flat-square)](https://travis-ci.org/tipsi/tipsi-dropdown)

React Native Dropdown for iOS and Android

## Requirements

### iOS

* Xcode 8+
* [CocoaPods](https://cocoapods.org) 1.1.1+

### Android

* SDK 16+

## Installation

Run `npm install --save tipsi-dropdown` to add the package to your app's dependencies.

### iOS

#### react-native cli

Run `react-native link tipsi-dropdown` so your project is linked against your Xcode project and all CocoaPods dependencies are installed.

#### CocoaPods

1. Setup your `Podfile` like the included [example/ios/Podfile](example/ios/Podfile) then run `pod install`.
2. Open your project in Xcode workspace.
3. Drag the following folder into your project:
  * `node_modules/tipsi-dropdown/ios/TipsiDropdown/`

### Android

#### react-native cli

Run `react-native link tipsi-dropdown` so your project is linked against your Android project

#### Manual

In your `android/app/build.gradle` add:

```gradle
...
dependencies {
 ...
 compile project(':tipsi-dropdown')
}
```

In your `android/settings.gradle` add:

```gradle
...
include ':tipsi-dropdown'
project(':tipsi-dropdown').projectDir = new File(rootProject.projectDir, '../node_modules/tipsi-dropdown/android')
```

In your `android/build.gradle` add:

```gradle
...
allprojects {
    repositories {
...
        maven { url "https://jitpack.io" }
    }
}
```

## Usage

```js
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import Dropdown from 'tipsi-dropdown'

export default class Example extends Component {
  state = {
    value: 'three',
  }

  handleChange = (event) => {
    console.log(event.nativeEvent)
  }

  handleValueChange = (item, index) => {
    this.setState({ value: item })
  }

  render() {
    return (
      <Dropdown
        style={styles.dropdown}
        itemStyle={styles.item}
        indicator={require('./arrow.png')}
        selectedValue={this.state.value}
        onChange={this.handleChange}
        onValueChange={this.handleValueChange}>
        <Dropdown.Item label="One" value="one" />
        <Dropdown.Item label="Two" value="two" />
        <Dropdown.Item label="Three" value="three" />
        <Dropdown.Item label="Four" value="four" />
      </Dropdown>
    )
  }
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 25,
    width: 156,
    borderRadius: 20,
    backgroundColor: '#AAAAAA',
    separatorHeight: 2,
    separatorColor: '#0000FF',
  },
  item: {
    fontSize: 18,
    fontFamily: 'Arial',
    color: '#000000',
    textAlign: 'left',
  },
})
```

## Tests

#### Local CI

To run `example` app e2e tests for all platforms you can use `npm run ci` command:

```bash
npm run ci
```

#### Manual

1. Go to example folder `cd example`
2. Install CocoaPods dependencies (iOS only) `pod install --project-directory=ios`
3. Install npm dependencies `npm install`
4. Build project:
  * `npm run build:ios` - for iOS
  * `npm run build:android` - for Android
  * `npm run build` - for both iOS and Android
5. Open Appium in other tab `npm run appium`
6. Run tests:
  * `npm run test:ios` - for iOS
  * `npm run test:android` - for Android
  * `npm run test` - for both iOS and Android

#### Troubleshooting

You might encounter the following error while trying to run tests:

`An unknown server-side error occurred while processing the command. Original error: Command \'/bin/bash Scripts/bootstrap.sh -d\' exited with code 1`

You can fix it by installing `Carthage`:

```bash
brew install carthage
```

## Example

To see more of the `tipsi-dropdown` in action, you can check out the source in [example](https://github.com/tipsi/tipsi-dropdown/tree/master/example) folder.

## License

tipsi-dropdown is available under the MIT license. See the [LICENSE](https://github.com/tipsi/tipsi-dropdown/tree/master/LICENSE) file for more info.
