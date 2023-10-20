export = {
    extends: [
        './style'
    ],
    overrides: [
        {
            files: [ '*.ts' ],
            extends: [
                'plugin:@nrwl/nx/angular',
                'plugin:@angular-eslint/template/process-inline-templates'
            ],
            rules: {
                "@angular-eslint/component-class-suffix": [
                    "error",
                    {
                        "suffixes": [
                            "Component",
                            "Dialog",
                            "Drawer",
                            "Layout",
                            "Page"
                        ]
                    }
                ],
                '@angular-eslint/no-host-metadata-property': [
                    'error',
                    {
                        allowStatic: true
                    }
                ],
                "@typescript-eslint/ban-ts-comment": [
                    "error",
                    {
                        "ts-check": false,
                        "ts-expect-error": "allow-with-description",
                        "ts-ignore": "allow-with-description",
                        "ts-nocheck": true
                    }
                ],
                "@typescript-eslint/explicit-member-accessibility": [
                    "error",
                    {
                        "accessibility": "explicit",
                        "overrides": {
                            "constructors": "no-public"
                        }
                    }
                ],
                "@typescript-eslint/member-delimiter-style": "error",
                "@typescript-eslint/member-ordering": [
                    "error",
                    {
                        "default": [
                            "signature",
                            "static-field",
                            [
                                "static-method",
                                "static-get",
                                "static-set"
                            ],
                            "public-field",
                            [
                                "protected-field",
                                "private-field"
                            ],
                            "constructor",
                            [
                                "public-method",
                                "public-get",
                                "public-set"
                            ],
                            [
                                "protected-method",
                                "protected-get",
                                "protected-set",
                                "private-method",
                                "private-get",
                                "private-set"
                            ]
                        ]
                    }
                ],
                "@typescript-eslint/naming-convention": [
                    "error",
                    {
                        "format": [
                            "camelCase",
                            "PascalCase",
                            "UPPER_CASE",
                            "snake_case"
                        ],
                        "leadingUnderscore": "allowSingleOrDouble",
                        "selector": "default",
                        "trailingUnderscore": "allow"
                    },
                    {
                        "format": [
                            "camelCase"
                        ],
                        "leadingUnderscore": "allow",
                        "selector": [
                            "function"
                        ]
                    },
                    {
                        "format": [
                            "PascalCase"
                        ],
                        "selector": [
                            "class",
                            "enum"
                        ]
                    },
                    {
                        "format": [
                            "camelCase"
                        ],
                        "leadingUnderscore": "require",
                        "modifiers": [
                            "private"
                        ],
                        "selector": "memberLike"
                    },
                    {
                        "format": [
                            "PascalCase"
                        ],
                        "selector": "typeLike"
                    },
                    {
                        "format": [
                            "PascalCase"
                        ],
                        "prefix": [
                            "I"
                        ],
                        "selector": "interface"
                    }
                ],
                "@typescript-eslint/no-explicit-any": "off",
                "@typescript-eslint/no-inferrable-types": [
                    "error",
                    {
                        "ignoreParameters": true,
                        "ignoreProperties": true
                    }
                ],
                "@typescript-eslint/no-namespace": "error",
                "@typescript-eslint/no-non-null-assertion": "error",
                "@typescript-eslint/no-shadow": "off",
                "@typescript-eslint/prefer-for-of": "error",
                "@typescript-eslint/quotes": [
                    "error",
                    "single",
                    {
                        "avoidEscape": true
                    }
                ],
                "no-unsafe-finally": "error",
            }
        }
    ]
};
