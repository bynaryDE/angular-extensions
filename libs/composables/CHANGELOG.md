# Changelog

## [0.2.1](https://github.com/bynaryDE/angular-extensions/compare/composables-v0.2.0...composables-v0.2.1) (2023-12-12)


### Bug Fixes

* **composables:** set initial value in useSelect ([#19](https://github.com/bynaryDE/angular-extensions/issues/19)) ([a200323](https://github.com/bynaryDE/angular-extensions/commit/a200323598812a4efcf8bc206848ae4b6eed9aa4))

## [0.2.0](https://github.com/bynaryDE/angular-extensions/compare/composables-v0.1.4...composables-v0.2.0) (2023-11-23)


### ⚠ BREAKING CHANGES

* **composables/class:** remove applyBaseClass option

### Code Refactoring

* **composables/class:** remove applyBaseClass option ([187a022](https://github.com/bynaryDE/angular-extensions/commit/187a022f2cde8967a1e5f9c9b4c25a1d3d02031b))

## [0.1.4](https://github.com/bynaryDE/angular-extensions/compare/composables-v0.1.3...composables-v0.1.4) (2023-11-20)


### Features

* **composables:** add ngxs composables ([#15](https://github.com/bynaryDE/angular-extensions/issues/15)) ([2c42140](https://github.com/bynaryDE/angular-extensions/commit/2c421400fd9b2d7df7abff36d6f3943e95b0de25))

## [0.1.3](https://github.com/bynaryDE/angular-extensions/compare/composables-v0.1.2...composables-v0.1.3) (2023-11-19)


### Bug Fixes

* **composables/class:** base modifier type fully on generic ([695591e](https://github.com/bynaryDE/angular-extensions/commit/695591ee3d4af8f0d48c049980ac923b70ab078f))

## [0.1.2](https://github.com/bynaryDE/angular-extensions/compare/composables-v0.1.1...composables-v0.1.2) (2023-11-18)


### Bug Fixes

* **composables/class:** use generic types for modifier in `useModifierGroup` ([7e682ea](https://github.com/bynaryDE/angular-extensions/commit/7e682eac2951e861f1822ebe7154416f84f39d5b))

## [0.1.1](https://github.com/bynaryDE/angular-extensions/compare/composables-v0.1.0...composables-v0.1.1) (2023-11-18)


### Bug Fixes

* **composables:** use version ranges for peer dependencies ([8ec4fdb](https://github.com/bynaryDE/angular-extensions/commit/8ec4fdba0b38bc1502599ad01a479920cedcbb46))

## 0.1.0 (2023-11-18)


### ⚠ BREAKING CHANGES

* **composabels/storage:** rename useStorageComposable
* **composables/observer:** mark useActivate as internal for now
* **composables/attribtue:** rename `host` option to `target`
* rename @bynary/angular-composables to @bynary/composables
* **signals:** rename to composables

### Features

* **composabels/storage:** finalize composables & add docs ([24eba72](https://github.com/bynaryDE/angular-extensions/commit/24eba7265ff637b39dc9a227f779d18f2a0e9388))
* **composables/attribute:** add support for custom host ([7ca1826](https://github.com/bynaryDE/angular-extensions/commit/7ca1826ec07e0c120ea812a0b05b074f44e51b1a))
* **composables/observer:** improve composables ([887cac8](https://github.com/bynaryDE/angular-extensions/commit/887cac855d4ad727507b7db212cf99f660c7e3b4))
* **composables/storage:** improve storage composables ([54cafb4](https://github.com/bynaryDE/angular-extensions/commit/54cafb45f6f09c9dfe26caf9c67a1da46e5666f6))
* **composables/title:** add bindTitle and documentation ([25e5900](https://github.com/bynaryDE/angular-extensions/commit/25e5900a65dacd4ed49aca942db96c98fdb9f0d4))
* **composables:** change default initial value of useClass to `true` ([d986c8b](https://github.com/bynaryDE/angular-extensions/commit/d986c8bfe0c8832c43d1fa925381642f4ab1c61d))
* **composables:** improve & test event composable ([24d1ea4](https://github.com/bynaryDE/angular-extensions/commit/24d1ea4098b3216b139967eda234a99cfffa9c0f))
* **composables:** improve & test media-query composable ([0370870](https://github.com/bynaryDE/angular-extensions/commit/037087013d8f5f745ceaedc1b6235ba36a984e79))
* **demo:** add "old" example to the demo ([e519eba](https://github.com/bynaryDE/angular-extensions/commit/e519ebae94ccfdeb3f42c2553e92874f045ba68d))


### Bug Fixes

* **composabels:** secondary entrypoint exports ([da2cd3b](https://github.com/bynaryDE/angular-extensions/commit/da2cd3b1a11a00897114e40f52deccb3de0e84cb))
* **composables/observer:** use subpackage import instead of relative import ([9fc5632](https://github.com/bynaryDE/angular-extensions/commit/9fc56327d02b38e02d75d1f5beac5a0b0191120a))
* **composables:** default value resolution ([e8b84ae](https://github.com/bynaryDE/angular-extensions/commit/e8b84ae40ac5cdeb1a4d59b5c4f06fed3d138b13))
* **composables:** secondary entrypoint setup ([5200a2c](https://github.com/bynaryDE/angular-extensions/commit/5200a2c8678b9711855033be780b55482d93f9a0))


### Code Refactoring

* **composabels/storage:** rename useStorageComposable ([9245553](https://github.com/bynaryDE/angular-extensions/commit/92455533bbea77cd88405e75c70e58d48cd91ffa))
* **composables/attribtue:** rename `host` option to `target` ([fe0b7cf](https://github.com/bynaryDE/angular-extensions/commit/fe0b7cf685f0fdced8502ff8b94ea5d1a98b9b41))
* **composables/observer:** mark useActivate as internal for now ([da94d1f](https://github.com/bynaryDE/angular-extensions/commit/da94d1fe14c54d769c72afe6e5f56c3a9499ea06))
* **signals:** rename to composables ([aaffeb1](https://github.com/bynaryDE/angular-extensions/commit/aaffeb18a8585f840ea9012fac687a3b61213a0c))


### Build System

* rename @bynary/angular-composables to @bynary/composables ([ce65d49](https://github.com/bynaryDE/angular-extensions/commit/ce65d49f0a04dedc9c4da2e60a4199cbd6abf9aa))
