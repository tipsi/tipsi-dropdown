import adb from 'adbkit';

const client = adb.createClient();

// Enable GPS location mocking on Android Marshmallow+
// https://github.com/calabash/calabash-android/commit/b31be97953325383b9295ff52234a0121cc27e27
// http://bit.ly/2b1fLVR
export default async function allowMockLocationForApp(deviceId, appId) {
    try {
        await client.shell(
          deviceId,
          `appops set ${appId} 58 allow`
        )
    } catch (error) {
        throw new Error(`Can not allow mock location permissions: ${error}`)
    }
}
