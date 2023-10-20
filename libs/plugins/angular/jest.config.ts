/* eslint-disable */
export default {
    displayName: 'plugins-angular',
    preset: '../../../jest.preset.js',
    transform: {
        '^.+\\.[tj]s$': [
            'ts-jest',
            { tsconfig: '<rootDir>/tsconfig.spec.json' }
        ]
    },
    moduleFileExtensions: [ 'ts', 'js', 'html' ],
    coverageDirectory: '../../../coverage/libs/plugins/angular'
};
