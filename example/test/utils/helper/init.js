import { remote } from 'webdriverio'
import addAndroidPermissions from '../add-android-permissions'

export default async function (config) {
  if (this.driver) {
    return
  }
  this.config = config
  this.driver = remote({
    desiredCapabilities: {
      appiumVersion: '1.5.3',
      deviceName: config.deviceName,
      platformName: 'Android',
      platformVersion: config.devicePlatform,
      app: config.apkPath,
    },
    logLevel: 'debug',
    path: '/wd/hub',
    host: config.appiumHost,
    port: config.appiumPort,
  })
  await this.driver.init()
  await addAndroidPermissions(
    config.deviceName,
    'com.example',
    ['SYSTEM_ALERT_WINDOW']
  )
}
