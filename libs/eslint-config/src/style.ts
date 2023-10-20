export = {
    extends: './base',
    plugins: [
        'import-newlines',
        'import',
        'simple-import-sort',
        'jsdoc'
    ],
    overrides: [
        {
            files: [
                "*.ts",
                "*.tsx",
                "*.js",
                "*.jsx"
            ],
            extends: [
                'plugin:@nrwl/nx/angular',
                'plugin:@angular-eslint/template/process-inline-templates'
            ],
            rules: {
                "array-bracket-spacing": [
                    "error",
                    "always",
                    {
                        "arraysInArrays": false,
                        "objectsInArrays": false,
                        "singleValue": true
                    }
                ],
                "arrow-body-style": [
                    "error",
                    "as-needed"
                ],
                "arrow-parens": "error",
                "block-spacing": [
                    "error",
                    "always"
                ],
                "brace-style": [
                    "error",
                    "1tbs",
                    {
                        "allowSingleLine": false
                    }
                ],
                "comma-dangle": [
                    "error",
                    "never"
                ],
                "comma-spacing": "error",
                "comma-style": [
                    "error",
                    "last"
                ],
                "computed-property-spacing": [
                    "error",
                    "never"
                ],
                "curly": [
                    "error",
                    "all"
                ],
                "eol-last": [
                    "error",
                    "always"
                ],
                "eqeqeq": [
                    "error",
                    "always",
                    {
                        "null": "ignore"
                    }
                ],
                "getter-return": "error",
                "import-newlines/enforce": [
                    "error",
                    {
                        "max-len": 200,
                        "semi": true
                    }
                ],
                "import/first": "error",
                "import/newline-after-import": "error",
                "import/no-duplicates": "error",
                "import/order": [
                    "error",
                    {
                        "groups": [
                            "builtin",
                            "external",
                            "internal",
                            "parent",
                            "sibling",
                            "object",
                            "type"
                        ],
                        "newlines-between": "always"
                    }
                ],
                "indent": "off",
                "@typescript-eslint/indent": [
                    "error",
                    4,
                    {
                        "SwitchCase": 1,
                        "ignoredNodes": [
                            "PropertyDefinition"
                        ]
                    }
                ],
                "jsdoc/require-jsdoc": [
                    "error",
                    {
                        "checkConstructors": false,
                        "checkSetters": "no-getter",
                        "require": {
                            "ArrowFunctionExpression": false,
                            "ClassDeclaration": false,
                            "FunctionDeclaration": true,
                            "FunctionExpression": true,
                            "MethodDefinition": true
                        }
                    }
                ],
                "keyword-spacing": [
                    "error",
                    {
                        "before": true
                    }
                ],
                "linebreak-style": [
                    "error",
                    "unix"
                ],
                "lines-between-class-members": [
                    "error",
                    "always",
                    {
                        "exceptAfterSingleLine": true
                    }
                ],
                "max-len": [
                    "error",
                    {
                        "code": 200
                    }
                ],
                "no-console": "error",
                "no-constant-condition": "error",
                "no-dupe-args": "error",
                "no-duplicate-case": "error",
                "no-eval": "error",
                "no-extra-semi": "error",
                "no-fallthrough": "error",
                "no-invalid-regexp": "error",
                "no-irregular-whitespace": "error",
                "no-mixed-spaces-and-tabs": [
                    "error",
                    "smart-tabs"
                ],
                "no-multi-spaces": "error",
                "no-multiple-empty-lines": [
                    "error",
                    {
                        "max": 1,
                        "maxBOF": 1,
                        "maxEOF": 1
                    }
                ],
                "no-redeclare": "error",
                "no-sparse-arrays": "error",
                "no-throw-literal": "error",
                "no-trailing-spaces": [
                    "error",
                    {
                        "ignoreComments": false,
                        "skipBlankLines": false
                    }
                ],
                "no-underscore-dangle": "off",
                "no-unreachable": "error",
                "no-useless-catch": "error",
                "no-useless-return": "error",
                "no-var": "error",
                "no-whitespace-before-property": "error",
                "object-curly-spacing": [
                    "error",
                    "always"
                ],
                "quote-props": [
                    "error",
                    "as-needed"
                ],
                "quotes": "off",
                "semi": "error",
                "simple-import-sort/exports": "error",
                "space-before-blocks": [
                    "error",
                    "always"
                ],
                "space-before-function-paren": [
                    "error",
                    {
                        "anonymous": "always",
                        "named": "never",
                        "asyncArrow": "always"
                    }
                ],
                "space-in-parens": [
                    "error",
                    "never"
                ],
                "spaced-comment": [
                    "error",
                    "always"
                ],
                "switch-colon-spacing": "error",
                "valid-typeof": [
                    "error",
                    {
                        "requireStringLiterals": false
                    }
                ]
            }
        }
    ]
};
