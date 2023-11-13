import 'jest-preset-angular/setup-jest';
import './storage/src/utils/storage.polyfill';

// @ts-expect-error https://thymikee.github.io/jest-preset-angular/docs/getting-started/test-environment
globalThis.ngJest = {
    testEnvironmentOptions: {
        errorOnUnknownElements: true,
        errorOnUnknownProperties: true
    }
};
