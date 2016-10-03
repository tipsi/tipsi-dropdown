import { remote } from 'webdriverio'
import addAndroidPermissions from '../add-android-permissions';
import allowMockLocationForApp from '../allow-mock-location-for-app';

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
        'com.gettipsi.tipsi.dev',
        ['ACCESS_FINE_LOCATION', 'READ_EXTERNAL_STORAGE', 'CAMERA']
    )
    await allowMockLocationForApp(
        config.deviceName,
        'io.appium.settings'
    )
}
