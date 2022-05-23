# Change Log

## 0.18.1

### Patch Changes

- Updated dependencies [33fd1bef]
- Updated dependencies [96a24c4a]
  - @lion/form-core@0.18.0
  - @lion/input@0.17.1
  - @lion/validate-messages@0.9.1

## 0.18.0

### Minor Changes

- 672c8e99: New documentation structure
- aa8b8916: BREAKING CHANGE: Work without polyfill if possible

  When using [component composition](https://lit.dev/docs/composition/component-composition/) in a Lion Component we always made it very explicit which sub-components are used.
  On top of that we scoped these [sub components](https://open-wc.org/docs/development/scoped-elements/) to the [current shadow root](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/Scoped-Custom-Element-Registries.md) allowing multiple version to be used simultaneously.

  To enable this features we relied on the fact that the `ScopedElementsMixin` did loaded the needed polyfill for us.

  We however over time got feedback from multiple consumers that lion components "break the app as soon as you load them".
  The reasons is/was that not everyone is always using `ScopedElementsMixin` or in full control of the app (or its load order).

  To quote the release notes of `ScopedElementsMixin` v2.1.0:

  > ScopedElementsMixin 2.x tried to be as convenient as possible by automatically loading the scoped custom elements registry polyfill.
  > This however led to a fatal error whenever you registered any component before ScopedElementsMixin was used.

  And this was the case.

  With the upgrade to `@open-wc/scoped-elements` v2.1.1 Lion now no longer automatically loads the polyfill through `ScopedElementsMixin`.

  This essentially means the polyfill became optional which results in the following behavior

  1. If polyfill is not loaded it will use the global registry as a fallback
  2. Log error if actually scoping is needed and polyfill is not loaded
  3. If you manually create elements you will need to handle polyfilled and not polyfilled cases now

  ```diff
  -  const myButton = this.shadowRoot.createElement('my-button');
  +  const myButton = this.createScopedElement('my-button');
  ```

  This also removes `@webcomponents/scoped-custom-element-registry` as a production dependency.

  If you need scoping be sure to load the polyfill before any other web component gets registered.

  It may look something like this in your HTML

  ```html
  <script src="/node_modules/@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js"></script>
  ```

  or if you have an SPA you can load it at the top of your app shell code

  ```js
  import '@webcomponents/scoped-custom-element-registry';
  ```

  You need scoping if you want to

  use 2 major versions of a web component (e.g. in an SPA pageA uses 1.x and pageB uses 2.x of color-picker)
  or you want to use the same tag name with different implementations (use tag color-picker from foo here and from bar here)

  See more details at

  - [Lion release blog post](https://lion-web.netlify.app/blog/lion-without-polyfills/)
  - [@open-wc/scoped-elements release blog post](https://open-wc.org/blog/scoped-elements-without-polyfill/)
  - [Change log of ScopedElementsMixin](https://github.com/open-wc/open-wc/blob/master/packages/scoped-elements/CHANGELOG.md#210)

### Patch Changes

- Updated dependencies [a64c552b]
- Updated dependencies [9c1dfdcd]
- Updated dependencies [3772c943]
- Updated dependencies [66531e3c]
- Updated dependencies [672c8e99]
- Updated dependencies [7016a150]
- Updated dependencies [aa8b8916]
- Updated dependencies [f408f6f8]
- Updated dependencies [f7df1ae8]
- Updated dependencies [85318e3b]
  - @lion/validate-messages@0.9.0
  - @lion/form-core@0.17.0
  - @lion/core@0.22.0
  - @lion/input@0.17.0
  - @lion/localize@0.24.0

## 0.17.0

### Minor Changes

- 683d5c1c: Upgrade to latest Typescript. Keep in mind, some @ts-ignores were necessary, also per TS maintainer's advice. Use skipLibCheck in your TSConfig to ignore issues coming from Lion, the types are valid.

  **We also unfixed lion's dependencies (now using caret ^) on its own packages**, because it caused a lot of problems with duplicate installations for end users as well as subclassers and its end users. Both of these changes may affect subclassers in a breaking manner, hence the minor bump.

  Be sure to [read our Rationale on this change](https://lion-web.netlify.app/docs/rationales/versioning/) and what this means for you as a user.

### Patch Changes

- Updated dependencies [683d5c1c]
  - @lion/core@0.21.0
  - @lion/form-core@0.16.0
  - @lion/input@0.16.0
  - @lion/localize@0.23.0
  - @lion/validate-messages@0.8.0

## 0.16.8

### Patch Changes

- 30805edf: Replace deprecated node folder exports with wildcard exports for docs
- 2bd3c521: Rename customElementsManifest to customElements in package.json
- Updated dependencies [30805edf]
- Updated dependencies [495cb0c5]
- Updated dependencies [fad9d8e5]
- Updated dependencies [2bd3c521]
- Updated dependencies [2b583ee7]
- Updated dependencies [83011918]
  - @lion/core@0.20.0
  - @lion/form-core@0.15.5
  - @lion/input@0.15.8
  - @lion/localize@0.22.0
  - @lion/validate-messages@0.7.8

## 0.16.7

### Patch Changes

- Updated dependencies [9b81b69e]
- Updated dependencies [a2c66cd9]
- Updated dependencies [c4562f7e]
- Updated dependencies [c55d4566]
  - @lion/core@0.19.0
  - @lion/form-core@0.15.4
  - @lion/input@0.15.7
  - @lion/localize@0.21.3
  - @lion/validate-messages@0.7.7

## 0.16.6

### Patch Changes

- Updated dependencies [bcf68ceb]
- Updated dependencies [d963e74e]
  - @lion/core@0.18.4
  - @lion/form-core@0.15.3
  - @lion/localize@0.21.2
  - @lion/input@0.15.6
  - @lion/validate-messages@0.7.6

## 0.16.5

### Patch Changes

- Updated dependencies [ec03d209]
- Updated dependencies [8a50e177]
  - @lion/core@0.18.3
  - @lion/validate-messages@0.7.5
  - @lion/form-core@0.15.2
  - @lion/localize@0.21.1
  - @lion/input@0.15.5

## 0.16.4

### Patch Changes

- Updated dependencies [04874352]
  - @lion/form-core@0.15.1
  - @lion/input@0.15.4
  - @lion/validate-messages@0.7.4

## 0.16.3

### Patch Changes

- b292509a: Allow array for IsCountryIBAN, similar to IsNotCountryIBAN. This enables for example enforcing only Dutch and Belgian IBANs, which is a common use case for Dutch/Belgian financial institutions.
- Updated dependencies [9648d418]
- Updated dependencies [8c06302e]
- Updated dependencies [9b9d82fc]
- Updated dependencies [8a766644]
- Updated dependencies [e87b6293]
- Updated dependencies [c544af4e]
  - @lion/localize@0.21.0
  - @lion/core@0.18.2
  - @lion/form-core@0.15.0
  - @lion/input@0.15.3
  - @lion/validate-messages@0.7.3

## 0.16.2

### Patch Changes

- 84131205: use mdjs-preview in docs for lit compatibility
- Updated dependencies [84131205]
  - @lion/form-core@0.14.2
  - @lion/input@0.15.2
  - @lion/core@0.18.1
  - @lion/localize@0.20.2
  - @lion/validate-messages@0.7.2

## 0.16.1

### Patch Changes

- Updated dependencies [f320b8b4]
- Updated dependencies [5ca3d275]
  - @lion/form-core@0.14.1
  - @lion/localize@0.20.1
  - @lion/input@0.15.1
  - @lion/validate-messages@0.7.1

## 0.16.0

### Minor Changes

- 72067c0d: **BREAKING** Upgrade to [lit](https://lit.dev/) version 2

  This does not change any of the public APIs of lion.
  It however effects you when you have your own extension layer or your own components especially when using directives.
  See the [official lit upgrade guide](https://lit.dev/docs/releases/upgrade/).

  **BREAKING** Upgrade to [ScopedElements](https://open-wc.org/docs/development/scoped-elements/) version 2

  This version of `@open-wc/scoped-elements` is now following the [Scoped Custom Element Registries](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/Scoped-Custom-Element-Registries.md) and automatically loads a polyfill [@webcomponents/scoped-custom-element-registry](https://github.com/webcomponents/polyfills/tree/master/packages/scoped-custom-element-registry).

  This means tag names are no longer being rewritten with a hash.

  ```js
  import { css, LitElement } from 'lit';
  import { ScopedElementsMixin } from '@open-wc/scoped-elements';
  import { MyButton } from './MyButton.js';

  export class MyElement extends ScopedElementsMixin(LitElement) {
    static get scopedElements() {
      return {
        'my-button': MyButton,
      };
    }

    render() {
      return html`
        <my-button>click me</my-button>
      `;
    }
  }
  ```

  ```html
  <!-- before (ScopedElements 1.x) -->
  <my-element>
    #shadow-root
    <my-button-23243424>click me</my-button-23243424>
  </my-element>

  <!-- after (ScopedElements 2.x) -->
  <my-element>
    #shadow-root
    <my-button>click me</my-button>
  </my-element>
  ```

### Patch Changes

- Updated dependencies [72067c0d]
  - @lion/core@0.18.0
  - @lion/form-core@0.14.0
  - @lion/input@0.15.0
  - @lion/localize@0.20.0
  - @lion/validate-messages@0.7.0

## 0.15.1

### Patch Changes

- Updated dependencies [0ddd38c0]
- Updated dependencies [0ddd38c0]
  - @lion/form-core@0.13.0
  - @lion/input@0.14.1
  - @lion/validate-messages@0.6.1

## 0.15.0

### Minor Changes

- 02e4f2cb: add simulator to demos

### Patch Changes

- 0fc206bf: allow to specify countries in lowercase
- Updated dependencies [11ec31c6]
- Updated dependencies [15146bf9]
- Updated dependencies [02e4f2cb]
- Updated dependencies [c6fbe920]
  - @lion/form-core@0.12.0
  - @lion/core@0.17.0
  - @lion/input@0.14.0
  - @lion/localize@0.19.0
  - @lion/validate-messages@0.6.0

## 0.14.1

### Patch Changes

- Updated dependencies [f0527583]
  - @lion/input@0.13.1

## 0.14.0

### Minor Changes

- 43e4bb81: Type fixes and enhancements:

  - all protected/private entries added to form-core type definitions, and their dependents were fixed
  - a lot @ts-expect-error and @ts-ignore (all `get slots()` and `get modelValue()` issues are fixed)
  - categorized @ts-expect-error / @ts-ignore into:
    - [external]: when a 3rd party didn't ship types (could also be browser specs)
    - [allow-protected]: when we are allowed to know about protected methods. For instance when code
      resides in the same package
    - [allow-private]: when we need to check a private value inside a test
    - [allow]: miscellaneous allows
    - [editor]: when the editor complains, but the cli/ci doesn't

### Patch Changes

- 97b8592c: Remove lion references in docs for easier extending
- Updated dependencies [38297d07]
- Updated dependencies [3b5ed322]
- Updated dependencies [77a04245]
- Updated dependencies [53167fd2]
- Updated dependencies [181a1d45]
- Updated dependencies [fb1522dd]
- Updated dependencies [75af80be]
- Updated dependencies [0e910e3f]
- Updated dependencies [991f1f54]
- Updated dependencies [cc02ae24]
- Updated dependencies [43e4bb81]
- Updated dependencies [6ae7a5e3]
  - @lion/form-core@0.11.0
  - @lion/core@0.16.0
  - @lion/input@0.13.0
  - @lion/localize@0.18.0
  - @lion/validate-messages@0.5.4

## 0.13.3

### Patch Changes

- Updated dependencies [6ea02988]
  - @lion/form-core@0.10.2
  - @lion/input@0.12.3
  - @lion/validate-messages@0.5.3

## 0.13.2

### Patch Changes

- Updated dependencies [72a6ccc8]
  - @lion/form-core@0.10.1
  - @lion/input@0.12.2
  - @lion/validate-messages@0.5.2

## 0.13.1

### Patch Changes

- Updated dependencies [13f808af]
- Updated dependencies [aa478174]
- Updated dependencies [a809d7b5]
  - @lion/form-core@0.10.0
  - @lion/input@0.12.1
  - @lion/validate-messages@0.5.1

## 0.13.0

### Minor Changes

- f3e54c56: Publish documentation with a format for Rocket
- 5db622e9: BREAKING: Align exports fields. This means no more wildcards, meaning you always import with bare import specifiers, extensionless. Import components where customElements.define side effect is executed by importing from '@lion/package/define'. For multi-component packages this defines all components (e.g. radio-group + radio). If you want to only import a single one, do '@lion/radio-group/define-radio' for example for just lion-radio.

### Patch Changes

- Updated dependencies [f3e54c56]
- Updated dependencies [af90b20e]
- Updated dependencies [5db622e9]
  - @lion/core@0.15.0
  - @lion/form-core@0.9.0
  - @lion/input@0.12.0
  - @lion/localize@0.17.0
  - @lion/validate-messages@0.5.0

## 0.12.5

### Patch Changes

- Updated dependencies [dbacafa5]
  - @lion/form-core@0.8.5
  - @lion/input@0.11.5
  - @lion/validate-messages@0.4.5

## 0.12.4

### Patch Changes

- Updated dependencies [6b91c92d]
- Updated dependencies [701aadce]
  - @lion/form-core@0.8.4
  - @lion/core@0.14.1
  - @lion/localize@0.16.1
  - @lion/input@0.11.4
  - @lion/validate-messages@0.4.4

## 0.12.3

### Patch Changes

- Updated dependencies [b2a1c1ef]
  - @lion/form-core@0.8.3
  - @lion/input@0.11.3
  - @lion/validate-messages@0.4.3

## 0.12.2

### Patch Changes

- Updated dependencies [d0b37e62]
  - @lion/form-core@0.8.2
  - @lion/input@0.11.2
  - @lion/validate-messages@0.4.2

## 0.12.1

### Patch Changes

- Updated dependencies [deb95d13]
  - @lion/form-core@0.8.1
  - @lion/input@0.11.1
  - @lion/validate-messages@0.4.1

## 0.12.0

### Minor Changes

- b2f981db: Add exports field in package.json

  Note that some tools can break with this change as long as they respect the exports field. If that is the case, check that you always access the elements included in the exports field, with the same name which they are exported. Any item not exported is considered private to the package and should not be accessed from the outside.

### Patch Changes

- Updated dependencies [b2f981db]
  - @lion/core@0.14.0
  - @lion/form-core@0.8.0
  - @lion/input@0.11.0
  - @lion/localize@0.16.0
  - @lion/validate-messages@0.4.0

## 0.11.6

### Patch Changes

- Updated dependencies [a7b27502]
  - @lion/form-core@0.7.3
  - @lion/input@0.10.16
  - @lion/validate-messages@0.3.16

## 0.11.5

### Patch Changes

- Updated dependencies [77114753]
- Updated dependencies [f98aab23]
- Updated dependencies [f98aab23]
  - @lion/form-core@0.7.2
  - @lion/input@0.10.15
  - @lion/validate-messages@0.3.15

## 0.11.4

### Patch Changes

- 8fb7e7a1: Fix type issues where base constructors would not have the same return type. This allows us to remove a LOT of @ts-expect-errors/@ts-ignores across lion.
- 9112d243: Fix missing types and update to latest scoped elements to fix constructor type.
- Updated dependencies [8fb7e7a1]
- Updated dependencies [9112d243]
  - @lion/core@0.13.8
  - @lion/form-core@0.7.1
  - @lion/localize@0.15.5
  - @lion/input@0.10.14
  - @lion/validate-messages@0.3.14

## 0.11.3

### Patch Changes

- 98f1bb7e: Ensure all lit imports are imported from @lion/core. Remove devDependencies in all subpackages and move to root package.json. Add demo dependencies as real dependencies for users that extend our docs/demos.
- Updated dependencies [a8cf4215]
- Updated dependencies [5302ec89]
- Updated dependencies [98f1bb7e]
- Updated dependencies [a8cf4215]
  - @lion/localize@0.15.4
  - @lion/form-core@0.7.0
  - @lion/input@0.10.13
  - @lion/validate-messages@0.3.13
  - @lion/core@0.13.7

## 0.11.2

### Patch Changes

- Updated dependencies [9fba9007]
  - @lion/core@0.13.6
  - @lion/form-core@0.6.14
  - @lion/input@0.10.12
  - @lion/localize@0.15.3

## 0.11.1

### Patch Changes

- Updated dependencies [41edf033]
  - @lion/core@0.13.5
  - @lion/form-core@0.6.13
  - @lion/input@0.10.11
  - @lion/localize@0.15.2

## 0.11.0

### Minor Changes

- c8e73457: add country blacklisting validator

## 0.10.10

### Patch Changes

- Updated dependencies [5553e43e]
  - @lion/form-core@0.6.12
  - @lion/input@0.10.10

## 0.10.9

### Patch Changes

- Updated dependencies [aa8ad0e6]
- Updated dependencies [4bacc17b]
  - @lion/form-core@0.6.11
  - @lion/input@0.10.9
  - @lion/localize@0.15.1

## 0.10.8

### Patch Changes

- Updated dependencies [c5c4d4ba]
- Updated dependencies [3ada1aef]
  - @lion/form-core@0.6.10
  - @lion/localize@0.15.0
  - @lion/input@0.10.8

## 0.10.7

### Patch Changes

- Updated dependencies [cf0967fe]
  - @lion/form-core@0.6.9
  - @lion/input@0.10.7

## 0.10.6

### Patch Changes

- Updated dependencies [b222fd78]
  - @lion/form-core@0.6.8
  - @lion/input@0.10.6

## 0.10.5

### Patch Changes

- cfbcccb5: Fix type imports to reuse lion where possible, in case Lit updates with new types that may break us.
- Updated dependencies [cfbcccb5]
  - @lion/core@0.13.4
  - @lion/form-core@0.6.7
  - @lion/input@0.10.5
  - @lion/localize@0.14.9

## 0.10.4

### Patch Changes

- Updated dependencies [e2e4deec]
- Updated dependencies [8ca71b8f]
  - @lion/core@0.13.3
  - @lion/localize@0.14.8
  - @lion/form-core@0.6.6
  - @lion/input@0.10.4

## 0.10.3

### Patch Changes

- Updated dependencies [20ba0ca8]
- Updated dependencies [618f2698]
  - @lion/core@0.13.2
  - @lion/localize@0.14.7
  - @lion/form-core@0.6.5
  - @lion/input@0.10.3

## 0.10.2

### Patch Changes

- Updated dependencies [7682e520]
- Updated dependencies [2907649b]
- Updated dependencies [68e3e749]
- Updated dependencies [fd297a28]
- Updated dependencies [9fcb67f0]
- Updated dependencies [247e64a3]
- Updated dependencies [e92b98a4]
  - @lion/localize@0.14.6
  - @lion/form-core@0.6.4
  - @lion/core@0.13.1
  - @lion/input@0.10.2

## 0.10.1

### Patch Changes

- Updated dependencies [d5faa459]
- Updated dependencies [0aa4480e]
  - @lion/form-core@0.6.3
  - @lion/input@0.10.1

## 0.10.0

### Minor Changes

- cfa2daf6: Added types for all other input components except for datepicker.

### Patch Changes

- Updated dependencies [4b7bea96]
- Updated dependencies [01a798e5]
- Updated dependencies [a31b7217]
- Updated dependencies [85720654]
- Updated dependencies [32202a88]
- Updated dependencies [b9327627]
- Updated dependencies [02145a06]
- Updated dependencies [32202a88]
  - @lion/form-core@0.6.2
  - @lion/core@0.13.0
  - @lion/localize@0.14.5
  - @lion/input@0.10.0

## 0.9.23

### Patch Changes

- Updated dependencies [75107a4b]
- Updated dependencies [60d5d1d3]
  - @lion/core@0.12.0
  - @lion/form-core@0.6.1
  - @lion/input@0.9.2
  - @lion/localize@0.14.4

## 0.9.22

### Patch Changes

- Updated dependencies [874ff483]
  - @lion/form-core@0.6.0
  - @lion/core@0.11.0
  - @lion/input@0.9.1
  - @lion/localize@0.14.3

## 0.9.21

### Patch Changes

- Updated dependencies [65ecd432]
- Updated dependencies [4dc621a0]
  - @lion/core@0.10.0
  - @lion/form-core@0.5.0
  - @lion/input@0.9.0
  - @lion/localize@0.14.2

## 0.9.20

### Patch Changes

- Updated dependencies [c347fce4]
  - @lion/form-core@0.4.4
  - @lion/input@0.8.6

## 0.9.19

### Patch Changes

- Updated dependencies [4b3ac525]
  - @lion/core@0.9.1
  - @lion/form-core@0.4.3
  - @lion/input@0.8.5
  - @lion/localize@0.14.1

## 0.9.18

### Patch Changes

- Updated dependencies [dd021e43]
- Updated dependencies [07c598fd]
  - @lion/form-core@0.4.2
  - @lion/input@0.8.4

## 0.9.17

### Patch Changes

- Updated dependencies [fb236975]
  - @lion/form-core@0.4.1
  - @lion/input@0.8.3

## 0.9.16

### Patch Changes

- Updated dependencies [3c61fd29]
- Updated dependencies [09d96759]
- Updated dependencies [9ecab4d5]
  - @lion/form-core@0.4.0
  - @lion/core@0.9.0
  - @lion/localize@0.14.0
  - @lion/input@0.8.2

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.9.15](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.9.14...@lion/input-iban@0.9.15) (2020-07-28)

**Note:** Version bump only for package @lion/input-iban

## [0.9.14](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.9.13...@lion/input-iban@0.9.14) (2020-07-27)

**Note:** Version bump only for package @lion/input-iban

## [0.9.13](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.9.12...@lion/input-iban@0.9.13) (2020-07-16)

**Note:** Version bump only for package @lion/input-iban

## [0.9.12](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.9.11...@lion/input-iban@0.9.12) (2020-07-13)

**Note:** Version bump only for package @lion/input-iban

## [0.9.11](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.9.10...@lion/input-iban@0.9.11) (2020-07-09)

**Note:** Version bump only for package @lion/input-iban

## [0.9.10](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.9.9...@lion/input-iban@0.9.10) (2020-07-09)

**Note:** Version bump only for package @lion/input-iban

## [0.9.9](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.9.8...@lion/input-iban@0.9.9) (2020-07-09)

**Note:** Version bump only for package @lion/input-iban

## [0.9.8](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.9.7...@lion/input-iban@0.9.8) (2020-07-07)

**Note:** Version bump only for package @lion/input-iban

## [0.9.7](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.9.6...@lion/input-iban@0.9.7) (2020-07-06)

**Note:** Version bump only for package @lion/input-iban

## [0.9.6](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.9.5...@lion/input-iban@0.9.6) (2020-06-18)

**Note:** Version bump only for package @lion/input-iban

## [0.9.5](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.9.4...@lion/input-iban@0.9.5) (2020-06-10)

**Note:** Version bump only for package @lion/input-iban

## [0.9.4](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.9.3...@lion/input-iban@0.9.4) (2020-06-09)

**Note:** Version bump only for package @lion/input-iban

## [0.9.3](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.9.2...@lion/input-iban@0.9.3) (2020-06-08)

**Note:** Version bump only for package @lion/input-iban

## [0.9.2](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.9.1...@lion/input-iban@0.9.2) (2020-06-08)

**Note:** Version bump only for package @lion/input-iban

## [0.9.1](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.9.0...@lion/input-iban@0.9.1) (2020-06-03)

### Bug Fixes

- remove all stories folders from npm ([1e04d06](https://github.com/ing-bank/lion/commit/1e04d06921f9d5e1a446b6d14045154ff83771c3))

# [0.9.0](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.8.1...@lion/input-iban@0.9.0) (2020-05-29)

### Features

- merge field/validate/choice-input/form-group into @lion/form-core ([6170374](https://github.com/ing-bank/lion/commit/6170374ee8c058cb95fff79b4953b0535219e9b4))
- use markdown javascript (mdjs) for documentation ([bcd074d](https://github.com/ing-bank/lion/commit/bcd074d1fbce8754d428538df723ba402603e2c8))

## [0.8.1](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.8.0...@lion/input-iban@0.8.1) (2020-05-27)

**Note:** Version bump only for package @lion/input-iban

# [0.8.0](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.7.2...@lion/input-iban@0.8.0) (2020-05-18)

### Features

- use singleton manager to support nested npm installations ([e2eb0e0](https://github.com/ing-bank/lion/commit/e2eb0e0077b9efed9382701461753778f63cad48))

## [0.7.2](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.7.1...@lion/input-iban@0.7.2) (2020-04-29)

**Note:** Version bump only for package @lion/input-iban

## [0.7.1](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.7.0...@lion/input-iban@0.7.1) (2020-04-02)

### Bug Fixes

- convert unnecessary backticks to single quotes for unpkg ([5103289](https://github.com/ing-bank/lion/commit/5103289f994c26f63e805be56515f150628acd91))

# [0.7.0](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.6.4...@lion/input-iban@0.7.0) (2020-03-25)

### Features

- refrain from using dynamic vars inside dynamic import ([42c840f](https://github.com/ing-bank/lion/commit/42c840f9498810a81296c9beb8a4f6bbdbc4fa0b))

## [0.6.4](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.6.3...@lion/input-iban@0.6.4) (2020-03-19)

**Note:** Version bump only for package @lion/input-iban

## [0.6.3](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.6.2...@lion/input-iban@0.6.3) (2020-03-05)

**Note:** Version bump only for package @lion/input-iban

## [0.6.2](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.6.1...@lion/input-iban@0.6.2) (2020-03-04)

**Note:** Version bump only for package @lion/input-iban

## [0.6.1](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.6.0...@lion/input-iban@0.6.1) (2020-03-02)

**Note:** Version bump only for package @lion/input-iban

# [0.6.0](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.5.15...@lion/input-iban@0.6.0) (2020-03-01)

### Features

- **validate:** use static validatorName instead of instance name ([#600](https://github.com/ing-bank/lion/issues/600)) ([7c45dd6](https://github.com/ing-bank/lion/commit/7c45dd683984e88e3216fba9fcae1b6dc73835b2))

## [0.5.15](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.5.14...@lion/input-iban@0.5.15) (2020-02-26)

**Note:** Version bump only for package @lion/input-iban

## [0.5.14](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.5.13...@lion/input-iban@0.5.14) (2020-02-20)

### Bug Fixes

- removed FieldCustomMixin ([f44d8aa](https://github.com/ing-bank/lion/commit/f44d8aa26ae7124d8dcb251e1f66ab9beae71050))

## [0.5.13](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.5.12...@lion/input-iban@0.5.13) (2020-02-19)

### Bug Fixes

- reduce storybook chunck sizes for more performance ([9fc5606](https://github.com/ing-bank/lion/commit/9fc560605f5dcf6e9abcf8d58079c59f12750046))

## [0.5.12](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.5.11...@lion/input-iban@0.5.12) (2020-02-10)

**Note:** Version bump only for package @lion/input-iban

## [0.5.11](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.5.10...@lion/input-iban@0.5.11) (2020-02-06)

**Note:** Version bump only for package @lion/input-iban

## [0.5.10](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.5.9...@lion/input-iban@0.5.10) (2020-02-06)

**Note:** Version bump only for package @lion/input-iban

## [0.5.9](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.5.8...@lion/input-iban@0.5.9) (2020-02-06)

**Note:** Version bump only for package @lion/input-iban

## [0.5.8](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.5.7...@lion/input-iban@0.5.8) (2020-02-05)

**Note:** Version bump only for package @lion/input-iban

## [0.5.7](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.5.6...@lion/input-iban@0.5.7) (2020-02-05)

**Note:** Version bump only for package @lion/input-iban

## [0.5.6](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.5.5...@lion/input-iban@0.5.6) (2020-02-03)

**Note:** Version bump only for package @lion/input-iban

## [0.5.5](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.5.4...@lion/input-iban@0.5.5) (2020-01-23)

### Bug Fixes

- update links in stories ([0c53b1d](https://github.com/ing-bank/lion/commit/0c53b1d4bb4fa51820656bacfc2aece653d03182))

## [0.5.4](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.5.3...@lion/input-iban@0.5.4) (2020-01-23)

**Note:** Version bump only for package @lion/input-iban

## [0.5.3](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.5.2...@lion/input-iban@0.5.3) (2020-01-20)

**Note:** Version bump only for package @lion/input-iban

## [0.5.2](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.5.1...@lion/input-iban@0.5.2) (2020-01-20)

### Bug Fixes

- **input-iban:** use ibantools (offers es module now) ([3cc5999](https://github.com/ing-bank/lion/commit/3cc5999038330a4c35ca32ea39674cf9dc828405))

## [0.5.1](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.5.0...@lion/input-iban@0.5.1) (2020-01-17)

### Bug Fixes

- update storybook and use main.js ([e61e0b9](https://github.com/ing-bank/lion/commit/e61e0b938ff72cc18cc0b3aa1560f2cece0c9fe6))

# [0.5.0](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.4.2...@lion/input-iban@0.5.0) (2020-01-13)

### Features

- improved storybook demos ([89b835a](https://github.com/ing-bank/lion/commit/89b835a79998c45a28093de01f69216c35009a40))

## [0.4.2](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.4.1...@lion/input-iban@0.4.2) (2020-01-08)

**Note:** Version bump only for package @lion/input-iban

## [0.4.1](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.4.0...@lion/input-iban@0.4.1) (2019-12-13)

**Note:** Version bump only for package @lion/input-iban

# [0.4.0](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.3.8...@lion/input-iban@0.4.0) (2019-12-04)

### Features

- integrate and pass automated a11y testing ([e1a417b](https://github.com/ing-bank/lion/commit/e1a417b041431e4e25a5b6a63e23ba0a3974f5a5))

## [0.3.8](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.3.7...@lion/input-iban@0.3.8) (2019-12-03)

### Bug Fixes

- let lerna publish fixed versions ([bc7448c](https://github.com/ing-bank/lion/commit/bc7448c694deb3c05fd3d083a9acb5365b26b7ab))

## [0.3.7](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.3.6...@lion/input-iban@0.3.7) (2019-12-02)

### Bug Fixes

- use strict versions to get correct deps on older versions ([8645c13](https://github.com/ing-bank/lion/commit/8645c13b1d77e488713f2e5e0e4e00c4d30ea1ee))

## [0.3.6](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.3.5...@lion/input-iban@0.3.6) (2019-12-01)

**Note:** Version bump only for package @lion/input-iban

## [0.3.5](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.3.4...@lion/input-iban@0.3.5) (2019-11-28)

**Note:** Version bump only for package @lion/input-iban

## [0.3.4](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.3.3...@lion/input-iban@0.3.4) (2019-11-27)

**Note:** Version bump only for package @lion/input-iban

## [0.3.3](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.3.2...@lion/input-iban@0.3.3) (2019-11-27)

**Note:** Version bump only for package @lion/input-iban

## [0.3.2](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.3.1...@lion/input-iban@0.3.2) (2019-11-26)

**Note:** Version bump only for package @lion/input-iban

## [0.3.1](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.3.0...@lion/input-iban@0.3.1) (2019-11-22)

**Note:** Version bump only for package @lion/input-iban

# [0.3.0](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.2.1...@lion/input-iban@0.3.0) (2019-11-18)

### Features

- finalize validation and adopt it everywhere ([396deb2](https://github.com/ing-bank/lion/commit/396deb2e3b4243f102a5c98e9b0518fa0f31a6b1))

## [0.2.1](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.2.0...@lion/input-iban@0.2.1) (2019-11-15)

**Note:** Version bump only for package @lion/input-iban

# [0.2.0](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.69...@lion/input-iban@0.2.0) (2019-11-13)

### Features

- remove all deprecations from lion ([66d3d39](https://github.com/ing-bank/lion/commit/66d3d390aebeaa61b6effdea7d5f7eea0e89c894))

## [0.1.69](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.68...@lion/input-iban@0.1.69) (2019-11-12)

**Note:** Version bump only for package @lion/input-iban

## [0.1.68](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.67...@lion/input-iban@0.1.68) (2019-11-06)

**Note:** Version bump only for package @lion/input-iban

## [0.1.67](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.66...@lion/input-iban@0.1.67) (2019-11-01)

**Note:** Version bump only for package @lion/input-iban

## [0.1.66](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.65...@lion/input-iban@0.1.66) (2019-10-25)

**Note:** Version bump only for package @lion/input-iban

## [0.1.65](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.64...@lion/input-iban@0.1.65) (2019-10-23)

**Note:** Version bump only for package @lion/input-iban

## [0.1.64](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.63...@lion/input-iban@0.1.64) (2019-10-23)

**Note:** Version bump only for package @lion/input-iban

## [0.1.63](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.62...@lion/input-iban@0.1.63) (2019-10-21)

**Note:** Version bump only for package @lion/input-iban

## [0.1.62](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.61...@lion/input-iban@0.1.62) (2019-10-14)

**Note:** Version bump only for package @lion/input-iban

## [0.1.61](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.60...@lion/input-iban@0.1.61) (2019-10-11)

**Note:** Version bump only for package @lion/input-iban

## [0.1.60](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.59...@lion/input-iban@0.1.60) (2019-10-11)

**Note:** Version bump only for package @lion/input-iban

## [0.1.59](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.58...@lion/input-iban@0.1.59) (2019-10-09)

**Note:** Version bump only for package @lion/input-iban

## [0.1.58](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.57...@lion/input-iban@0.1.58) (2019-10-07)

**Note:** Version bump only for package @lion/input-iban

## [0.1.57](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.56...@lion/input-iban@0.1.57) (2019-09-30)

**Note:** Version bump only for package @lion/input-iban

## [0.1.56](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.55...@lion/input-iban@0.1.56) (2019-09-27)

**Note:** Version bump only for package @lion/input-iban

## [0.1.55](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.54...@lion/input-iban@0.1.55) (2019-09-25)

**Note:** Version bump only for package @lion/input-iban

## [0.1.54](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.53...@lion/input-iban@0.1.54) (2019-09-20)

**Note:** Version bump only for package @lion/input-iban

## [0.1.53](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.52...@lion/input-iban@0.1.53) (2019-09-19)

**Note:** Version bump only for package @lion/input-iban

## [0.1.52](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.51...@lion/input-iban@0.1.52) (2019-09-13)

**Note:** Version bump only for package @lion/input-iban

## [0.1.51](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.50...@lion/input-iban@0.1.51) (2019-08-23)

**Note:** Version bump only for package @lion/input-iban

## [0.1.50](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.49...@lion/input-iban@0.1.50) (2019-08-21)

**Note:** Version bump only for package @lion/input-iban

## [0.1.49](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.48...@lion/input-iban@0.1.49) (2019-08-17)

**Note:** Version bump only for package @lion/input-iban

## [0.1.48](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.47...@lion/input-iban@0.1.48) (2019-08-15)

**Note:** Version bump only for package @lion/input-iban

## [0.1.47](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.46...@lion/input-iban@0.1.47) (2019-08-15)

**Note:** Version bump only for package @lion/input-iban

## [0.1.46](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.45...@lion/input-iban@0.1.46) (2019-08-14)

### Bug Fixes

- **input-iban:** formatter should handle undefined modelValues ([af1535b](https://github.com/ing-bank/lion/commit/af1535b))

## [0.1.45](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.44...@lion/input-iban@0.1.45) (2019-08-07)

**Note:** Version bump only for package @lion/input-iban

## [0.1.44](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.43...@lion/input-iban@0.1.44) (2019-08-07)

**Note:** Version bump only for package @lion/input-iban

## [0.1.43](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.42...@lion/input-iban@0.1.43) (2019-07-30)

**Note:** Version bump only for package @lion/input-iban

## [0.1.42](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.41...@lion/input-iban@0.1.42) (2019-07-30)

### Bug Fixes

- public test-helpers ([3b889e3](https://github.com/ing-bank/lion/commit/3b889e3))

## [0.1.41](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.40...@lion/input-iban@0.1.41) (2019-07-25)

**Note:** Version bump only for package @lion/input-iban

## [0.1.40](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.39...@lion/input-iban@0.1.40) (2019-07-24)

**Note:** Version bump only for package @lion/input-iban

## [0.1.39](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.38...@lion/input-iban@0.1.39) (2019-07-23)

**Note:** Version bump only for package @lion/input-iban

## [0.1.38](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.37...@lion/input-iban@0.1.38) (2019-07-23)

**Note:** Version bump only for package @lion/input-iban

## [0.1.37](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.36...@lion/input-iban@0.1.37) (2019-07-23)

**Note:** Version bump only for package @lion/input-iban

## [0.1.36](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.35...@lion/input-iban@0.1.36) (2019-07-19)

**Note:** Version bump only for package @lion/input-iban

## [0.1.35](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.34...@lion/input-iban@0.1.35) (2019-07-19)

**Note:** Version bump only for package @lion/input-iban

## [0.1.34](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.33...@lion/input-iban@0.1.34) (2019-07-18)

**Note:** Version bump only for package @lion/input-iban

## [0.1.33](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.32...@lion/input-iban@0.1.33) (2019-07-17)

### Bug Fixes

- support Chinese language ([a0ebd2d](https://github.com/ing-bank/lion/commit/a0ebd2d))

## [0.1.32](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.31...@lion/input-iban@0.1.32) (2019-07-16)

**Note:** Version bump only for package @lion/input-iban

## [0.1.31](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.30...@lion/input-iban@0.1.31) (2019-07-16)

**Note:** Version bump only for package @lion/input-iban

## [0.1.30](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.29...@lion/input-iban@0.1.30) (2019-07-15)

**Note:** Version bump only for package @lion/input-iban

## [0.1.29](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.28...@lion/input-iban@0.1.29) (2019-07-15)

**Note:** Version bump only for package @lion/input-iban

## [0.1.28](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.27...@lion/input-iban@0.1.28) (2019-07-09)

**Note:** Version bump only for package @lion/input-iban

## [0.1.27](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.26...@lion/input-iban@0.1.27) (2019-07-04)

**Note:** Version bump only for package @lion/input-iban

## [0.1.26](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.25...@lion/input-iban@0.1.26) (2019-07-02)

**Note:** Version bump only for package @lion/input-iban

## [0.1.25](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.24...@lion/input-iban@0.1.25) (2019-07-02)

**Note:** Version bump only for package @lion/input-iban

## [0.1.24](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.23...@lion/input-iban@0.1.24) (2019-06-27)

**Note:** Version bump only for package @lion/input-iban

## [0.1.23](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.22...@lion/input-iban@0.1.23) (2019-06-24)

**Note:** Version bump only for package @lion/input-iban

## [0.1.22](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.21...@lion/input-iban@0.1.22) (2019-06-20)

### Bug Fixes

- support en-PH locale for polymer-cli ([7643e64](https://github.com/ing-bank/lion/commit/7643e64))

## [0.1.21](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.20...@lion/input-iban@0.1.21) (2019-06-18)

### Bug Fixes

- support language fallback for non found locales ([#102](https://github.com/ing-bank/lion/issues/102)) ([b729bf0](https://github.com/ing-bank/lion/commit/b729bf0))

## [0.1.20](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.19...@lion/input-iban@0.1.20) (2019-06-06)

**Note:** Version bump only for package @lion/input-iban

## [0.1.19](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.18...@lion/input-iban@0.1.19) (2019-06-04)

**Note:** Version bump only for package @lion/input-iban

## [0.1.18](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.17...@lion/input-iban@0.1.18) (2019-05-31)

**Note:** Version bump only for package @lion/input-iban

## [0.1.17](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.16...@lion/input-iban@0.1.17) (2019-05-31)

**Note:** Version bump only for package @lion/input-iban

## [0.1.16](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.15...@lion/input-iban@0.1.16) (2019-05-29)

**Note:** Version bump only for package @lion/input-iban

## [0.1.15](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.14...@lion/input-iban@0.1.15) (2019-05-29)

**Note:** Version bump only for package @lion/input-iban

## [0.1.14](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.13...@lion/input-iban@0.1.14) (2019-05-24)

**Note:** Version bump only for package @lion/input-iban

## [0.1.13](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.12...@lion/input-iban@0.1.13) (2019-05-22)

**Note:** Version bump only for package @lion/input-iban

## [0.1.12](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.11...@lion/input-iban@0.1.12) (2019-05-21)

### Bug Fixes

- **input-iban:** allow formatting empty IBAN model values ([dcd7719](https://github.com/ing-bank/lion/commit/dcd7719))

## [0.1.11](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.10...@lion/input-iban@0.1.11) (2019-05-17)

**Note:** Version bump only for package @lion/input-iban

## [0.1.10](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.9...@lion/input-iban@0.1.10) (2019-05-16)

**Note:** Version bump only for package @lion/input-iban

## [0.1.9](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.8...@lion/input-iban@0.1.9) (2019-05-16)

**Note:** Version bump only for package @lion/input-iban

## [0.1.8](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.7...@lion/input-iban@0.1.8) (2019-05-13)

**Note:** Version bump only for package @lion/input-iban

## [0.1.7](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.6...@lion/input-iban@0.1.7) (2019-05-13)

### Bug Fixes

- add prepublish step to make links absolute for npm docs ([9f2c4f6](https://github.com/ing-bank/lion/commit/9f2c4f6))

## [0.1.6](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.5...@lion/input-iban@0.1.6) (2019-05-08)

**Note:** Version bump only for package @lion/input-iban

## [0.1.5](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.4...@lion/input-iban@0.1.5) (2019-05-07)

### Bug Fixes

- import from entry points so stories can be extended ([49f18a4](https://github.com/ing-bank/lion/commit/49f18a4))

## [0.1.4](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.3...@lion/input-iban@0.1.4) (2019-04-29)

**Note:** Version bump only for package @lion/input-iban

## [0.1.3](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.2...@lion/input-iban@0.1.3) (2019-04-28)

### Bug Fixes

- update storybook/linting; adjust story labels, eslint ignores ([8d96f84](https://github.com/ing-bank/lion/commit/8d96f84))

## [0.1.2](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.1...@lion/input-iban@0.1.2) (2019-04-27)

### Bug Fixes

- add missing exports to core, input-iban, localize ([f5fd18c](https://github.com/ing-bank/lion/commit/f5fd18c))

## [0.1.1](https://github.com/ing-bank/lion/compare/@lion/input-iban@0.1.0...@lion/input-iban@0.1.1) (2019-04-26)

### Bug Fixes

- add missing files to npm packages ([0e3ca17](https://github.com/ing-bank/lion/commit/0e3ca17))

# 0.1.0 (2019-04-26)

### Features

- release inital public lion version ([ec8da8f](https://github.com/ing-bank/lion/commit/ec8da8f))
