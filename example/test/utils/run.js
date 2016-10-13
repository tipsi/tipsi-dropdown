import path from 'path'
import findAndroidDevice from './find-android-device'
import appiumIsRunning from './appium-is-running'
import runTapeTests from './run-tape-tests'
import helper from './helper'

const {
  APPIUM_HOST = 'localhost',
  APPIUM_PORT = '4723',
  APK_PACKAGE = 'com.example',
  APK_PATH = path.resolve(__dirname, '../../android/app/build/outputs/apk/app-release.apk'),
  TEST_CASES_PATH = 'test/*_test_*.js',
} = process.env

let DEVICE_NAME = process.env.DEVICE_NAME
let DEVICE_PLATFORM = process.env.DEVICE_PLATFORM;

/* eslint no-console: 0 */
(async function run() {
  process.on('SIGINT', async () => {
    // Close Helper
    await helper.release()
    process.exit()
  })

  try {
    // Check Appium
    await appiumIsRunning(APPIUM_HOST, APPIUM_PORT)
    console.log(`Appium is running on: ${APPIUM_HOST}:${APPIUM_PORT}`)
    if (!DEVICE_NAME || !DEVICE_PLATFORM) {
      // Check Android device
      const device = await findAndroidDevice()
      console.log(`Found next android device: ${device.id}`)
      DEVICE_NAME = device.id
      DEVICE_PLATFORM = device.version
    }

    // Initialize Helper
    await helper.init({
      appiumHost: APPIUM_HOST,
      appiumPort: APPIUM_PORT,
      deviceName: DEVICE_NAME,
      devicePlatform: DEVICE_PLATFORM,
      apkPackage: APK_PACKAGE,
      apkPath: APK_PATH,
    })

    // Run Tape tests
    await runTapeTests(TEST_CASES_PATH)

    // Close Helper
    await helper.release()
  } catch (error) {
    console.log('Error while executing tests:')
    console.log(error)

    // Close Helper
    await helper.release()
  }
}())
