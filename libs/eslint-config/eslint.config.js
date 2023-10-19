const { FlatCompat } = require('@eslint/eslintrc');
const baseConfig = require('../../eslint.config.js');
const js = require('@eslint/js');
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});
module.exports = [
    ...baseConfig,
    ...compat.config({ parser: 'jsonc-eslint-parser' }).map((config) => ({
        ...config,
        files: [ 'libs/eslint-config/**/*.json' ],
        rules: { '@nx/dependency-checks': 'error' },
    })),
];
