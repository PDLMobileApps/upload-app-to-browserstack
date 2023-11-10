# upload-app-to-browserstack action

This action helps you upload your app to BrowserStack: App Live and App Automate.

## Inputs

### `app-path`

**Required** The path for the app to be uploaded.

### `browserstack-username`

**Required** The username for BrowserStack.

### `browserstack-accesskey`

**Required** The accesskey for BrowserStack.

### `custom-id`

**Optional** The custom id for BrowserStack. Default `"upload-app-browserstack"`.

### `app-to-replace`

**Optional** The name of apps to remove before upload new app in browserstack`.

## Outputs

### `browserstack-app-live-url`

The url of the app live uploaded.

### `browserstack-app-automate-url`

The url of the app automate uploaded.

## Example usage

```
- name: Upload APK to BrowserStack: App Live and App Automate
  uses: PDLMobileApps/upload-app-to-browserstack
  with:
    app-path: /path-to-apk/app.apk
    browserstack-username: ${{ secrets.BROWSERSTACK_USERNAME }}
    browserstack-accesskey: ${{ secrets.BROWSERSTACK_ACCESSKEY }}
```

