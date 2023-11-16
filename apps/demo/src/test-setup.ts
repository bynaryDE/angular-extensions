import 'jest-preset-angular/setup-jest';
import MatchMediaMock from 'jest-matchmedia-mock';

// @ts-ignore https://thymikee.github.io/jest-preset-angular/docs/getting-started/test-environment
globalThis.ngJest = {
    testEnvironmentOptions: {
        errorOnUnknownElements: true,
        errorOnUnknownProperties: true
    }
};

const matchMedia = new MatchMediaMock();

afterEach(() => {
    matchMedia.clear();
});
