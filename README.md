# @the-curve-consulting/expo-sensor-fusion

A react native library for reading native device rotation sensor data.

| Home | Cubemap | Sensor values debug |
|--------|--------|--------|
| <img src="./docs/images/home.png" width="200px" /> | <img src="./docs/images/cubemap.png" width="200px" /> | <img src="./docs/images/raw-sensor-values.png" width="200px" /> |

| Demo |
|--------|
| <video src="./docs/videos/demo.MP4" height="400px" /> /> |


> [!IMPORTANT]
>
> This NPM package is hosted in the @the-curve-consulting GitHub registry.
>
> To install or contribute to this package, you must have a GitHub personal access token (classic) linked to an account
> with access to The Curve organization. In this documentation we will refer to this as being the `YOUR_GH_TOKEN_HERE`.
>
> Steps to get started:
> - Create or retrieve your personal access token by following the instructions in the [GitHub documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic).
> - Save your token securely (if you haven’t already) in a trusted password manager, such as your personal 1Password vault, for future use.
>
> Note: This token can also be used to authenticate with the @the-curve-consulting GitHub NPM registry, allowing you to install any package hosted there, not just this one.

## Install this package on your expo app.

1. Add `@the-curve-consulting GitHub NPM registry` to your expo project, by creating / editing your project's `.npmrc` file on the root of your project:

```diff
# .npmrc

+ @the-curve-consulting:registry=https://npm.pkg.github.com
+ //npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

2. Add this dependency:

```bash
NODE_AUTH_TOKEN=YOUR_GH_TOKEN_HERE npm install @the-curve-consulting/expo-sensor-fusion
```

> [!IMPORTANT]
>
> Anyone installing dependencies on your project will be required to provide the NODE_AUTH_TOKEN everytime they re-install the dependencies.


3. That's it! See `/example/src/` for an example of how to use this package.

## Contributing

- Ensure you're running the correct code version in your current terminal session: `nvm install && nvm use`
- Install all node dependencies: `npm install`
- To edit the native code, ONLY edit them at `<root>/android` or `<root>/ios`:
  - You can edit the native code using any IDE of your choice and on any machine. However it is recommended to use the default native IDE for each platform:
    - Open Xcode to edit the iOS native code by running the following from the root of this repo: `npm run open:xcode`
    - Open Android Studio to edit the Android native code by running from the root of this repo: `npm run open:androistudio`

> [!IMPORTANT]
>
> You must never have to manually edit files within `./example/android` nor `./example/ios`. These are updated / generated automatically
> everytime you run `npm run ios|android`.

- You can preview the package changes during development by running the sample expo app that is embedded into this project within `/example`:

```bash
cd example

# Start an iOS simulator with an example app (expo development client) where this package is installed (requires macOS)
npm run ios

# Start an Android emulator and installs the example app (expo development client) where this package is installed.
npm run android
```

### Publish a new version to the registry

> [!NOTE]
>
> This package follows semantic versioning with the format: `major.minor.patch`.
> - Major version: Increment when making incompatible API changes.
> - Minor version: Increment when adding new functionality in a backward-compatible way.
> - Patch version: Increment when fixing bugs in a backward-compatible manner.

1. Push your changes to the `main` branch.
2. Navigate to [Create a New Release](https://github.com/the-curve-consulting/expo-sensor-fusion/releases/new)
3. Create a new tag using the semantic versioning format, prefixed with `v` (e.g., `E.g.: v2.3.0`).
4. Use the same name as the tag for the release title.
5. Click <kbd>Generate release notes</kbd>, and/or edit the description to detail the changes.
6. Click the green <kbd>Publish release</kbd> button.
7. A GitHub action will automatically run to publish the new version of the package to the registry.
   - Monitor the status at [the-curve-consulting/expo-sensor-fusion/actions](https://github.com/the-curve-consulting/expo-sensor-fusion/actions)
