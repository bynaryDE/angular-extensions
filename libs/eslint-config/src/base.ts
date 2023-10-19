export = {
    "plugins": [
        "import"
    ],
    overrides: [
        {
            files: [ '*.ts', '*.tsx' ],
            extends: [
                'plugin:@nrwl/nx/typescript'
            ],
            rules: {
                '@typescript-eslint/no-inferrable-types': [
                    'error',
                    {
                        ignoreParameters: true,
                        ignoreProperties: true
                    }
                ],
                'import/order': [
                    'error',
                    {
                        'newlines-between': 'always'
                    }
                ]
            }
        }
    ]
};
