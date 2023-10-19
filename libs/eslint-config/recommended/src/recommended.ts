module.exports = {
    extends: '@bynaryde/eslint-config/base',
    overrides: [
        {
            files: [ '*.ts' ],
            extends: [
                'plugin:@nrwl/nx/angular',
                'plugin:@angular-eslint/template/process-inline-templates'
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
                ],
                '@angular-eslint/no-host-metadata-property': [
                    'error',
                    {
                        allowStatic: true
                    }
                ],
                '@angular-eslint/component-class-suffix': [
                    'error',
                    {
                        suffixes: [
                            'Component',
                            'Dialog',
                            'Layout',
                            'Page'
                        ]
                    }
                ]
            }
        }
    ]
};
