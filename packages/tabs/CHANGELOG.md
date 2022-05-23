# Change Log

## 0.12.1

### Patch Changes

- 96a24c4a: add common uuid helper and remove separate implementations
- Updated dependencies [96a24c4a]
  - @lion/helpers@0.12.0

## 0.12.0

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

- 03c294c9: tabs: allow to be initialized withhout children
- Updated dependencies [66531e3c]
- Updated dependencies [672c8e99]
- Updated dependencies [aa8b8916]
  - @lion/core@0.22.0

## 0.11.0

### Minor Changes

- 683d5c1c: Upgrade to latest Typescript. Keep in mind, some @ts-ignores were necessary, also per TS maintainer's advice. Use skipLibCheck in your TSConfig to ignore issues coming from Lion, the types are valid.

  **We also unfixed lion's dependencies (now using caret ^) on its own packages**, because it caused a lot of problems with duplicate installations for end users as well as subclassers and its end users. Both of these changes may affect subclassers in a breaking manner, hence the minor bump.

  Be sure to [read our Rationale on this change](https://lion-web.netlify.app/docs/rationales/versioning/) and what this means for you as a user.

### Patch Changes

- Updated dependencies [683d5c1c]
  - @lion/core@0.21.0

## 0.10.0

### Minor Changes

- eafa7d03: Ensures that disabled tab elements are skipped when navigating a tab list with the keyboard.

### Patch Changes

- 30805edf: Replace deprecated node folder exports with wildcard exports for docs
- eafa7d03: Select first not-disabled tab if the first one is disabled.
- 2bd3c521: Rename customElementsManifest to customElements in package.json
- Updated dependencies [30805edf]
- Updated dependencies [495cb0c5]
- Updated dependencies [2b583ee7]
- Updated dependencies [83011918]
  - @lion/core@0.20.0

## 0.9.5

### Patch Changes

- Updated dependencies [9b81b69e]
- Updated dependencies [a2c66cd9]
- Updated dependencies [c4562f7e]
- Updated dependencies [c55d4566]
  - @lion/core@0.19.0

## 0.9.4

### Patch Changes

- d963e74e: Fix type error, EventHandlerNonNull got removed it seems. (event: Event) => unknown; instead is fine.
- Updated dependencies [bcf68ceb]
- Updated dependencies [d963e74e]
  - @lion/core@0.18.4

## 0.9.3

### Patch Changes

- Updated dependencies [ec03d209]
  - @lion/core@0.18.3

## 0.9.2

### Patch Changes

- Updated dependencies [8c06302e]
  - @lion/core@0.18.2

## 0.9.1

### Patch Changes

- Updated dependencies [84131205]
  - @lion/core@0.18.1

## 0.9.0

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

## 0.8.0

### Minor Changes

- 02e4f2cb: add simulator to demos

### Patch Changes

- Updated dependencies [02e4f2cb]
  - @lion/core@0.17.0

## 0.7.2

### Patch Changes

- 77a04245: add protected and private type info
- Updated dependencies [77a04245]
- Updated dependencies [43e4bb81]
  - @lion/core@0.16.0

## 0.7.1

### Patch Changes

- 59dad284: Removed lion-specific component namings from overview.md files

## 0.7.0

### Minor Changes

- f3e54c56: Publish documentation with a format for Rocket
- 5db622e9: BREAKING: Align exports fields. This means no more wildcards, meaning you always import with bare import specifiers, extensionless. Import components where customElements.define side effect is executed by importing from '@lion/package/define'. For multi-component packages this defines all components (e.g. radio-group + radio). If you want to only import a single one, do '@lion/radio-group/define-radio' for example for just lion-radio.

### Patch Changes

- Updated dependencies [f3e54c56]
- Updated dependencies [5db622e9]
  - @lion/core@0.15.0

## 0.6.1

### Patch Changes

- Updated dependencies [701aadce]
  - @lion/core@0.14.1

## 0.6.0

### Minor Changes

- b2f981db: Add exports field in package.json

  Note that some tools can break with this change as long as they respect the exports field. If that is the case, check that you always access the elements included in the exports field, with the same name which they are exported. Any item not exported is considered private to the package and should not be accessed from the outside.

### Patch Changes

- Updated dependencies [b2f981db]
  - @lion/core@0.14.0

## 0.5.14

### Patch Changes

- Updated dependencies [8fb7e7a1]
- Updated dependencies [9112d243]
  - @lion/core@0.13.8

## 0.5.13

### Patch Changes

- 98f1bb7e: Ensure all lit imports are imported from @lion/core. Remove devDependencies in all subpackages and move to root package.json. Add demo dependencies as real dependencies for users that extend our docs/demos.
- Updated dependencies [98f1bb7e]
  - @lion/core@0.13.7

## 0.5.12

### Patch Changes

- Updated dependencies [9fba9007]
  - @lion/core@0.13.6

## 0.5.11

### Patch Changes

- Updated dependencies [41edf033]
  - @lion/core@0.13.5

## 0.5.10

### Patch Changes

- Updated dependencies [cfbcccb5]
  - @lion/core@0.13.4

## 0.5.9

### Patch Changes

- Updated dependencies [e2e4deec]
  - @lion/core@0.13.3

## 0.5.8

### Patch Changes

- Updated dependencies [20ba0ca8]
  - @lion/core@0.13.2

## 0.5.7

### Patch Changes

- Updated dependencies [e92b98a4]
  - @lion/core@0.13.1

## 0.5.6

### Patch Changes

- bef7d961: Only look for tabs and panels as direct children, this allows to have nested tabs.
- 56cc174c: The store of invoker and content slottables was not properly cleared before repopulating, on slotchange event. This would cause duplicate entries.
- Updated dependencies [01a798e5]
  - @lion/core@0.13.0

## 0.5.5

### Patch Changes

- Updated dependencies [75107a4b]
  - @lion/core@0.12.0

## 0.5.4

### Patch Changes

- Updated dependencies [874ff483]
  - @lion/core@0.11.0

## 0.5.3

### Patch Changes

- Updated dependencies [65ecd432]
- Updated dependencies [4dc621a0]
  - @lion/core@0.10.0

## 0.5.2

### Patch Changes

- Updated dependencies [4b3ac525]
  - @lion/core@0.9.1

## 0.5.1

### Patch Changes

- 3c61fd29: Add types to form-core, for everything except form-group, choice-group and validate. Also added index.d.ts (re-)export files to git so that interdependent packages can use their types locally.
- Updated dependencies [3c61fd29]
- Updated dependencies [9ecab4d5]
  - @lion/core@0.9.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.5.0](https://github.com/ing-bank/lion/compare/@lion/tabs@0.4.4...@lion/tabs@0.5.0) (2020-07-13)

### Features

- **tabs:** fix types and export type definition files for tabs ([0cf8a0c](https://github.com/ing-bank/lion/commit/0cf8a0c9212faae42b95a84c5a49b3e94035bcef))

## [0.4.4](https://github.com/ing-bank/lion/compare/@lion/tabs@0.4.3...@lion/tabs@0.4.4) (2020-06-18)

**Note:** Version bump only for package @lion/tabs

## [0.4.3](https://github.com/ing-bank/lion/compare/@lion/tabs@0.4.2...@lion/tabs@0.4.3) (2020-06-10)

**Note:** Version bump only for package @lion/tabs

## [0.4.2](https://github.com/ing-bank/lion/compare/@lion/tabs@0.4.1...@lion/tabs@0.4.2) (2020-06-08)

**Note:** Version bump only for package @lion/tabs

## [0.4.1](https://github.com/ing-bank/lion/compare/@lion/tabs@0.4.0...@lion/tabs@0.4.1) (2020-06-03)

### Bug Fixes

- remove all stories folders from npm ([1e04d06](https://github.com/ing-bank/lion/commit/1e04d06921f9d5e1a446b6d14045154ff83771c3))

# [0.4.0](https://github.com/ing-bank/lion/compare/@lion/tabs@0.3.1...@lion/tabs@0.4.0) (2020-05-29)

### Features

- use markdown javascript (mdjs) for documentation ([bcd074d](https://github.com/ing-bank/lion/commit/bcd074d1fbce8754d428538df723ba402603e2c8))

## [0.3.1](https://github.com/ing-bank/lion/compare/@lion/tabs@0.3.0...@lion/tabs@0.3.1) (2020-05-27)

### Bug Fixes

- **tabs:** do not focus tabs when selectedIndex is set ([#729](https://github.com/ing-bank/lion/issues/729)) ([e4ec227](https://github.com/ing-bank/lion/commit/e4ec2275669b7ec9648f6c0986bd9fe3d321b488))

# [0.3.0](https://github.com/ing-bank/lion/compare/@lion/tabs@0.2.10...@lion/tabs@0.3.0) (2020-05-18)

### Features

- use singleton manager to support nested npm installations ([e2eb0e0](https://github.com/ing-bank/lion/commit/e2eb0e0077b9efed9382701461753778f63cad48))

## [0.2.10](https://github.com/ing-bank/lion/compare/@lion/tabs@0.2.9...@lion/tabs@0.2.10) (2020-05-18)

### Bug Fixes

- **tabs:** tab keyboard navigation trap ([fbbea36](https://github.com/ing-bank/lion/commit/fbbea367205941de652da8224871923d120c2ede)), closes [#712](https://github.com/ing-bank/lion/issues/712)

## [0.2.9](https://github.com/ing-bank/lion/compare/@lion/tabs@0.2.8...@lion/tabs@0.2.9) (2020-04-29)

**Note:** Version bump only for package @lion/tabs

## [0.2.8](https://github.com/ing-bank/lion/compare/@lion/tabs@0.2.7...@lion/tabs@0.2.8) (2020-04-02)

**Note:** Version bump only for package @lion/tabs

## [0.2.7](https://github.com/ing-bank/lion/compare/@lion/tabs@0.2.6...@lion/tabs@0.2.7) (2020-03-25)

**Note:** Version bump only for package @lion/tabs

## [0.2.6](https://github.com/ing-bank/lion/compare/@lion/tabs@0.2.5...@lion/tabs@0.2.6) (2020-03-05)

**Note:** Version bump only for package @lion/tabs

## [0.2.5](https://github.com/ing-bank/lion/compare/@lion/tabs@0.2.4...@lion/tabs@0.2.5) (2020-03-04)

### Bug Fixes

- **tabs:** prevent scrolling when initially focussing a tab ([e3bbc3e](https://github.com/ing-bank/lion/commit/e3bbc3ecf1d159c54edf85d85a00652f20ab2a68))

## [0.2.4](https://github.com/ing-bank/lion/compare/@lion/tabs@0.2.3...@lion/tabs@0.2.4) (2020-02-19)

### Bug Fixes

- **tab:** remove scroll while navigating the tabs using up/down arrows ([#592](https://github.com/ing-bank/lion/issues/592)) ([9c6eaf8](https://github.com/ing-bank/lion/commit/9c6eaf83f131de64f32b667cf0e823ec26ff6da0))
- reduce storybook chunck sizes for more performance ([9fc5606](https://github.com/ing-bank/lion/commit/9fc560605f5dcf6e9abcf8d58079c59f12750046))

## [0.2.3](https://github.com/ing-bank/lion/compare/@lion/tabs@0.2.2...@lion/tabs@0.2.3) (2020-02-06)

**Note:** Version bump only for package @lion/tabs

## [0.2.2](https://github.com/ing-bank/lion/compare/@lion/tabs@0.2.1...@lion/tabs@0.2.2) (2020-01-20)

**Note:** Version bump only for package @lion/tabs

## [0.2.1](https://github.com/ing-bank/lion/compare/@lion/tabs@0.2.0...@lion/tabs@0.2.1) (2020-01-17)

### Bug Fixes

- update storybook and use main.js ([e61e0b9](https://github.com/ing-bank/lion/commit/e61e0b938ff72cc18cc0b3aa1560f2cece0c9fe6))

# [0.2.0](https://github.com/ing-bank/lion/compare/@lion/tabs@0.1.3...@lion/tabs@0.2.0) (2020-01-13)

### Features

- improved storybook demos ([89b835a](https://github.com/ing-bank/lion/commit/89b835a79998c45a28093de01f69216c35009a40))

## [0.1.3](https://github.com/ing-bank/lion/compare/@lion/tabs@0.1.2...@lion/tabs@0.1.3) (2019-12-02)

### Bug Fixes

- use strict versions to get correct deps on older versions ([8645c13](https://github.com/ing-bank/lion/commit/8645c13b1d77e488713f2e5e0e4e00c4d30ea1ee))

## [0.1.2](https://github.com/ing-bank/lion/compare/@lion/tabs@0.1.1...@lion/tabs@0.1.2) (2019-11-15)

### Bug Fixes

- refactor slot selection ([5999ea9](https://github.com/ing-bank/lion/commit/5999ea956967b449f3f04935c7facb19e2889dc9))

## [0.1.1](https://github.com/ing-bank/lion/compare/@lion/tabs@0.1.0...@lion/tabs@0.1.1) (2019-11-13)

**Note:** Version bump only for package @lion/tabs

# 0.1.0 (2019-10-31)

### Features

- **tabs:** create tabs component ([7a562a6](https://github.com/ing-bank/lion/commit/7a562a6))
