# Fix NullPointerException in reCAPTCHA SDK

The application is crashing with a `NullPointerException` in `com.google.android.recaptcha.internal.aa.onFailed`. This is a known issue in the Google reCAPTCHA Enterprise SDK (specifically version 18.4.0 and some related versions) when used with Cronet. The crash occurs because the SDK fails to perform a null check on `UrlResponseInfo` when a request fails before a response is received.

Additionally, the project is currently targeting SDK version 36, which is not yet a stable release and may lead to unpredictable behavior in libraries.

## Proposed Changes

### Android Configuration

#### [MODIFY] [variables.gradle](file:///E:/projeler/Cerkesce/android/variables.gradle)
- Update `compileSdkVersion` from `36` to `35`.
- Update `targetSdkVersion` from `36` to `35`.

#### [MODIFY] [build.gradle](file:///E:/projeler/Cerkesce/android/app/build.gradle)
- Explicitly add `com.google.android.recaptcha:recaptcha:18.9.2` to the `dependencies` block. This will force the use of a version that contains the fix for the reported `NullPointerException`.

## Verification Plan

### Automated Tests
- I will attempt a Gradle build to ensure there are no dependency conflicts after the change.
- Command: `./gradlew :app:assembleDebug`

### Manual Verification
- The user should deploy the app to a device/emulator and verify that the crash in `onFailed` no longer occurs during network failures or app startup.
