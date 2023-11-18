# Changelog

## 1.0.0 (2023-11-18)


### ⚠ BREAKING CHANGES

* **composables/observer:** mark useActivate as internal for now
* **composables/attribtue:** rename `host` option to `target`
* rename @bynary/angular-composables to @bynary/composables
* rename to @bynary/angular-extensions
* **signals:** rename to composables
* **demo-e2e:** remove project
* **plugins-angular:** remove project
* **eslint-config:** remove project

### Features

* **composables/attribute:** add support for custom host ([7ca1826](https://github.com/bynaryDE/angular-extensions/commit/7ca1826ec07e0c120ea812a0b05b074f44e51b1a))
* **composables/observer:** improve composables ([887cac8](https://github.com/bynaryDE/angular-extensions/commit/887cac855d4ad727507b7db212cf99f660c7e3b4))
* **composables/storage:** improve storage composables ([54cafb4](https://github.com/bynaryDE/angular-extensions/commit/54cafb45f6f09c9dfe26caf9c67a1da46e5666f6))
* **composables:** add signals ([22e1745](https://github.com/bynaryDE/angular-extensions/commit/22e17450b1a3179f29806c6f73e95bb64e689356))
* **composables:** change default initial value of useClass to `true` ([d986c8b](https://github.com/bynaryDE/angular-extensions/commit/d986c8bfe0c8832c43d1fa925381642f4ab1c61d))
* **composables:** improve & test event composable ([24d1ea4](https://github.com/bynaryDE/angular-extensions/commit/24d1ea4098b3216b139967eda234a99cfffa9c0f))
* **composables:** improve & test media-query composable ([0370870](https://github.com/bynaryDE/angular-extensions/commit/037087013d8f5f745ceaedc1b6235ba36a984e79))
* **demo-e2e:** remove project ([4338dba](https://github.com/bynaryDE/angular-extensions/commit/4338dba2128e08000951d3520e346417a788544c))
* **demo:** add color-scheme switch ([178c39a](https://github.com/bynaryDE/angular-extensions/commit/178c39a5bcb1de0bbf78c038f57c4ebb9f02671f))
* **demo:** add useActivate demo ([10d0329](https://github.com/bynaryDE/angular-extensions/commit/10d0329f7572d83d2109f66cc9a6c225e9e2d4c4))
* **demo:** improve support for dark color scheme ([e47791e](https://github.com/bynaryDE/angular-extensions/commit/e47791e346d4e6855cfa7d690ad50da1ec2b83ec))
* **demo:** make demo beautiful ([9c9d61b](https://github.com/bynaryDE/angular-extensions/commit/9c9d61b0b6398004b7c3d52b86c40801f24e703b))
* **eslint-config:** add eslint config lib ([1261010](https://github.com/bynaryDE/angular-extensions/commit/1261010ac1b3edd63cfc6231a0876a4f361b3d6e))
* **eslint-config:** add stricter rules ([c783780](https://github.com/bynaryDE/angular-extensions/commit/c78378085cc49e3dd5a131df216898b7e14ea5d0))
* **eslint-config:** remove project ([574f9ae](https://github.com/bynaryDE/angular-extensions/commit/574f9ae8e19919fd1bc08b998d547ae142666715))
* **plugins-angular:** add barrel generator ([916baf8](https://github.com/bynaryDE/angular-extensions/commit/916baf8a130cdf42bd170fc0a8dd1200ed0b8c9b))
* **plugins-angular:** add harness generator ([7b11b2b](https://github.com/bynaryDE/angular-extensions/commit/7b11b2ba7f7cf5a502c157d5d9ae5af2f21e255e))
* **plugins-angular:** add plugins-angular lib ([f6dd192](https://github.com/bynaryDE/angular-extensions/commit/f6dd192135712f71cb55501fb0edbc1f947def39))
* **plugins-angular:** remove project ([ce4ad72](https://github.com/bynaryDE/angular-extensions/commit/ce4ad723979093dfccf25e3afa41553aed4ffd9b))
* **signals:** add color-schema composable ([925e667](https://github.com/bynaryDE/angular-extensions/commit/925e6670a437d8c393b0aa2d0148fb4f224163d2))
* **signals:** streamline & optimize signals ([139f664](https://github.com/bynaryDE/angular-extensions/commit/139f664de6930d808db461b937a068411fcccdc3))


### Bug Fixes

* apply lint ([b8cea55](https://github.com/bynaryDE/angular-extensions/commit/b8cea551ef36999504d712f2a7f9bf1c4fef65a7))
* **composabels:** secondary entrypoint exports ([da2cd3b](https://github.com/bynaryDE/angular-extensions/commit/da2cd3b1a11a00897114e40f52deccb3de0e84cb))
* **composables/observer:** use subpackage import instead of relative import ([9fc5632](https://github.com/bynaryDE/angular-extensions/commit/9fc56327d02b38e02d75d1f5beac5a0b0191120a))
* **composables:** default value resolution ([e8b84ae](https://github.com/bynaryDE/angular-extensions/commit/e8b84ae40ac5cdeb1a4d59b5c4f06fed3d138b13))
* **composables:** secondary entrypoint setup ([5200a2c](https://github.com/bynaryDE/angular-extensions/commit/5200a2c8678b9711855033be780b55482d93f9a0))
* **demo:** move ts comment to correct line ([bd74613](https://github.com/bynaryDE/angular-extensions/commit/bd746133483bd4a57b4b3d926809f4c3956ad181))
* **demo:** remove unused style import ([b40b14d](https://github.com/bynaryDE/angular-extensions/commit/b40b14dfa94319ee387c51f61fa33b5618544a13))
* **demo:** use of initialValue ([360103d](https://github.com/bynaryDE/angular-extensions/commit/360103d5578b37c003fb11db24147fa3a8990a8e))


### Code Refactoring

* **composables/attribtue:** rename `host` option to `target` ([fe0b7cf](https://github.com/bynaryDE/angular-extensions/commit/fe0b7cf685f0fdced8502ff8b94ea5d1a98b9b41))
* **composables/observer:** mark useActivate as internal for now ([da94d1f](https://github.com/bynaryDE/angular-extensions/commit/da94d1fe14c54d769c72afe6e5f56c3a9499ea06))
* **signals:** rename to composables ([aaffeb1](https://github.com/bynaryDE/angular-extensions/commit/aaffeb18a8585f840ea9012fac687a3b61213a0c))


### Build System

* rename @bynary/angular-composables to @bynary/composables ([ce65d49](https://github.com/bynaryDE/angular-extensions/commit/ce65d49f0a04dedc9c4da2e60a4199cbd6abf9aa))
* rename to @bynary/angular-extensions ([513a3b7](https://github.com/bynaryDE/angular-extensions/commit/513a3b73cd458f7eda1e68aa5dcd2bc7c005ae2e))
