/* eslint-disable @typescript-eslint/naming-convention */
export = {
    extends: [
        './recommended'
    ],
    overrides: [
        {
            files: [ '*.ts' ],
            rules: {
                'import/order': [
                    'error',
                    {
                        'groups': [
                            'builtin',
                            'external',
                            'internal',
                            'parent',
                            'sibling',
                            'object',
                            'type'
                        ],
                        'newlines-between': 'always',
                        'pathGroups': [
                            {
                                'group': 'internal',
                                'pattern': '@bynaryde/**',
                                'position': 'after'
                            }
                        ]
                    }
                ]
            }
        }
    ]
};
