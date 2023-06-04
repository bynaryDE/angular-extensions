/* eslint-env node */

/*
 * =====================
 * ROOT STYLELINT CONFIG
 * =====================
 *
 * Commented-out rules in this config are meant as placeholders. They include an additional comment with reference to a
 * stylelint configuration that defines these rules.
 *
 * This is to ensure all rules are properly sorted and not mixed up within this config.
 *
 * If you need to use one of these commented-out rules, just remove the first comment and replace "see" with
 * "overrides" in the reference comment.
 */

// example: `kebab-case`
const kebabCase = /^([a-z][a-z\d]*)(-[a-z\d]+)*$/;
// example: `kebab-case--modifier`
// const kebabCaseWithModifier = /^([a-z][a-z\d]*)(-[a-z\d]+)*(--[a-z\d]+(-[a-z\d]+)*)?$/;

// examples: `-kebab-case`, `kebab-case`
const privateKebabCase = /^(-?[a-z][a-z\d]*)(-[a-z\d]+)*$/;
// examples: `-kebab-case--modifier`, `kebab-case--modifier`
const privateKebabCaseWithModifier = /^(-?[a-z][a-z\d]*)(-[a-z\d]+)*(--[a-z\d]+(-[a-z\d]+)*)?$/;

// examples: `c-block`, `c-block__element`, `c-block--modifier`, `o-object`, `u-utility`, `u-utility@breakpoint`, `mat-md-card`, `mdc-form-field`
// const classPatternBEMIT = /^[cou]-((\d+\/\d+)|[a-z\d]+)((-(\d+\/\d+)|-[a-z\d]+)+)*(__((\d+\/\d+)|[a-z\d])(-?((\d+\/\d+)|[a-z\d])+)*)?(--((\d+\/\d+)|[a-z\d])(-?((\d+\/\d+)|[a-z\d])+)*)?(@([a-z\d])+(-[a-z\d]*)*)?$/;
const classPatternMaterialBEMIT = /^(mat|mdc|[cou])-((\d+\/\d+)|[a-z\d]+)((-(\d+\/\d+)|-[a-z\d]+)+)*(__((\d+\/\d+)|[a-z\d])(-?((\d+\/\d+)|[a-z\d])+)*)?(--((\d+\/\d+)|[a-z\d])(-?((\d+\/\d+)|[a-z\d])+)*)?(@([a-z\d])+(-[a-z\d]*)*)?$/;

const rules = {
    avoidErrors: {
        // Color
        'color-no-invalid-hex': true,

        // Font family
        'font-family-no-duplicate-names': true,
        'font-family-no-missing-generic-family-keyword': true,

        // Named grid areas
        'named-grid-areas-no-invalid': true,

        // Function
        'function-calc-no-unspaced-operator': true,
        'function-linear-gradient-no-nonstandard-direction': true,
        'function-no-unknown': null, // disabled in favor of scss/function-no-unknown

        // String
        'string-no-newline': true,

        // Unit
        'unit-no-unknown': true,

        // Custom property
        'custom-property-no-missing-var-function': true,

        // Property
        'property-no-unknown': true,

        // Keyframe declaration
        'keyframe-declaration-no-important': true,

        // Declaration block
        'declaration-block-no-duplicate-custom-properties': true,
        'declaration-block-no-duplicate-properties': true,
        'declaration-block-no-shorthand-property-overrides': true,

        // Block
        'block-no-empty': true,

        // Selector
        'selector-pseudo-class-no-unknown': true,
        'selector-pseudo-element-no-unknown': true,
        'selector-type-no-unknown': [
            true,
            {
                ignore: [ 'custom-elements' ]
            }
        ],

        // Media feature
        'media-feature-name-no-unknown': true,

        // At-rule
        // 'at-rule-no-unknown': null, // disabled in favor of scss/at-rule-no-unknown - see stylelint-config-recommended-scss

        // Comment
        // 'comment-no-empty': null, // see stylelint-config-recommended-scss

        // General / Sheet
        'no-descending-specificity': null, // rule disabled since there are too many cases with conflicting specificities
        'no-duplicate-at-import-rules': true,
        'no-duplicate-selectors': true, // selectors in lists are allowed (for common styles)
        'no-empty-source': true,
        'no-invalid-double-slash-comments': true, // only applied to CSS comments, not SCSS comments
        // 'no-invalid-position-at-import-rule': null, // see stylelint-config-recommended-scss

    },
    enforceConventions: {
        // Alpha-value
        'alpha-value-notation': 'number', // overrides stylelint-config-standard

        // Hue
        'hue-degree-notation': 'number', // overrides stylelint-config-standard

        // Color
        'color-function-notation': 'legacy', // reason: issues with 'modern' notations and CSS custom properties inside color functions - overrides stylelint-config-standard
        'color-hex-alpha': 'never',
        // 'color-hex-length': null, // see stylelint-config-standard
        'color-named': 'never',
        'color-no-hex': null,

        // Length
        // 'length-zero-no-unit': null, // see stylelint-config-standard

        // Font family
        'font-family-name-quotes': 'always-unless-keyword',  // overrides stylelint-config-standard

        // Font weight
        'font-weight-notation': 'numeric',

        // Function
        'function-allowed-list': null,
        'function-disallowed-list': null,
        'function-url-no-scheme-relative': true,
        // 'function-url-quotes': null, // see stylelint-config-standard
        'function-url-scheme-allowed-list': [ 'data', 'https' ],
        'function-url-scheme-disallowed-list': null,

        // Keyframes
        'keyframes-name-pattern': [ // overrides stylelint-config-standard (only regex)
            kebabCase,
            {
                message: 'Expected keyframe name to be kebab-case',
            },
        ],

        // Number
        'number-max-precision': 10,

        // Time
        'time-min-milliseconds': 10,

        // Unit
        'unit-allowed-list': [ 'rem', 'em', 'vw', 'vh', 'vmin', 'vmax', 'deg', '%', 'ms', 's', 'fr' ],
        'unit-disallowed-list': null,

        // Shorthand property
        'shorthand-property-no-redundant-values': true,

        // Value
        'value-no-vendor-prefix': true, // handled by autoprefixer

        // Custom property
        'custom-property-pattern': [ // overrides stylelint-config-standard (only regex)
            kebabCase,
            {
                message: 'Expected custom property name to be kebab-case',
            }
        ],

        // Property
        'property-allowed-list': null,
        'property-disallowed-list': null,
        'property-no-vendor-prefix': true, // handled by autoprefixer

        // Declaration
        'declaration-no-important': null,
        'declaration-property-max-values': null,
        'declaration-property-unit-allowed-list': null,
        'declaration-property-unit-disallowed-list': null,
        'declaration-property-value-allowed-list': null,
        'declaration-property-value-disallowed-list': null,

        // Declaration block
        // 'declaration-block-no-redundant-longhand-properties': null, // see stylelint-config-standard
        // 'declaration-block-single-line-max-declarations': null, // see stylelint-config-standard

        // Selector
        'selector-attribute-name-disallowed-list': null,
        'selector-attribute-operator-allowed-list': null,
        'selector-attribute-operator-disallowed-list': null,
        'selector-attribute-quotes': 'always',
        'selector-class-pattern': [
            classPatternMaterialBEMIT,
            {
                resolveNestedSelectors: true,
                message: 'Expected class name to be in BEMIT style or prefixed with `mat-` or `mdc-`'
            }
        ],
        'selector-combinator-allowed-list': null,
        'selector-combinator-disallowed-list': null,
        'selector-disallowed-list': null,
        'selector-id-pattern': kebabCase,
        'selector-max-attribute': null,
        'selector-max-class': null,
        'selector-max-combinators': null,
        'selector-max-compound-selectors': null,
        'selector-max-id': null,
        'selector-max-pseudo-class': null,
        'selector-max-specificity': null,
        'selector-max-type': null,
        'selector-max-universal': null,
        'selector-nested-pattern': null,
        'selector-no-qualifying-type': null,
        'selector-no-vendor-prefix': true, // handled by autoprefixer
        'selector-pseudo-class-allowed-list': null,
        'selector-pseudo-class-disallowed-list': null,
        'selector-pseudo-element-allowed-list': null,
        'selector-pseudo-element-colon-notation': 'double',
        'selector-pseudo-element-disallowed-list': null,

        // Rules
        'rule-selector-property-disallowed-list': null,

        // Media feature
        'media-feature-name-allowed-list': null,
        'media-feature-name-disallowed-list': null,
        'media-feature-name-no-vendor-prefix': true, // handled by autoprefixer
        'media-feature-name-value-allowed-list': null,

        // Custom media
        'custom-media-pattern': [ // overrides stylelint-config-standard (only regex)
            kebabCase,
            {
                message: 'Expected custom media query name to be kebab-case',
            }
        ],

        // At-rule
        'at-rule-allowed-list': null,
        'at-rule-disallowed-list': null,
        // 'at-rule-no-vendor-prefix': null, // handled by autoprefixer - see stylelint-config-standard
        'at-rule-property-required-list': null,

        // Comment
        'comment-pattern': null,
        'comment-word-disallowed-list': null,

        // General / Sheet
        'max-nesting-depth': null,
        'no-irregular-whitespace': true,
        'no-unknown-animations': true,
        'unicode-bom': 'never',
    },
    stylisticIssues: {
        notHandledByPrettyPrinters: {
            // Value
            'value-keyword-case': [
                'lower',
                {
                    ignoreKeywords: [
                        'currentColor', // this is a valid CSS keyword
                        /^A\d{3}$/  // necessary for Angular Material color palette (A100, A200, ...)
                    ]
                }
            ],

            // Function
            // 'function-name-case': null, // see stylelint-config-standard

            // Custom property
            // 'custom-property-empty-line-before': null, // see stylelint-config-standard

            // Selector
            'selector-type-case': 'lower',

            // Rule
            'rule-empty-line-before': [
                'always',
                {
                    ignore: [ 'after-comment' ]
                }
            ],

            // At-rule
            'at-rule-empty-line-before': [ // overrides stylelint-config-standard-scss
                'always',
                {
                    except: [ 'blockless-after-same-name-blockless' ],
                    ignore: [ 'after-comment', 'first-nested' ],
                    ignoreAtRules: [ 'else' ],
                },
            ],

            // Comment
            'comment-empty-line-before': null, // overrides stylelint-config-standard
            // 'comment-whitespace-inside': null, // see stylelint-config-standard
        },
        handledByPrettyPrinters: {
            // Color
            // 'color-hex-case': null, // see stylelint-config-standard

            // Function
            // 'function-comma-newline-after': null, // see stylelint-config-standard
            'function-comma-newline-before': 'never-multi-line',
            // 'function-comma-space-after': null, // see stylelint-config-standard
            // 'function-comma-space-before': null, // see stylelint-config-standard
            // 'function-max-empty-lines': null, // see stylelint-config-standard
            // 'function-parentheses-newline-inside': null, // see stylelint-config-standard
            // 'function-parentheses-space-inside': null, // see stylelint-config-standard
            // 'function-whitespace-after': null, // see stylelint-config-standard

            // Number
            'number-leading-zero': 'always',
            'number-no-trailing-zeros': true,

            // String
            'string-quotes': 'single',

            // Unit
            'unit-case': 'lower',

            // Value list
            'value-list-comma-newline-after': 'always-multi-line',
            'value-list-comma-newline-before': 'never-multi-line',
            'value-list-comma-space-after': 'always-single-line',
            'value-list-comma-space-before': 'never',
            'value-list-max-empty-lines': 0,

            // Property
            'property-case': 'lower',

            // Declaration
            // 'declaration-bang-space-after': null, // see stylelint-config-standard
            // 'declaration-bang-space-before': null, // see stylelint-config-standard
            // 'declaration-colon-newline-after': null, // see stylelint-config-standard
            // 'declaration-colon-space-after': null, // see stylelint-config-standard
            // 'declaration-colon-space-before': null, // see stylelint-config-standard
            // 'declaration-empty-line-before': null // see stylelint-config-standard

            // Declaration block
            // 'declaration-block-semicolon-newline-after': null, // see stylelint-config-standard
            'declaration-block-semicolon-newline-before': 'never-multi-line',
            // 'declaration-block-semicolon-space-after': null, // see stylelint-config-standard
            // 'declaration-block-semicolon-space-before': null, // see stylelint-config-standard
            // 'declaration-block-trailing-semicolon': null, // see stylelint-config-standard

            // Block
            // 'block-closing-brace-empty-line-before': null, // see stylelint-config-standard
            // 'block-closing-brace-newline-after': null, // see stylelint-config-standard-scss
            // 'block-closing-brace-newline-before': null, // see stylelint-config-standard
            'block-closing-brace-space-after': 'always-single-line',
            // 'block-closing-brace-space-before': null, // see stylelint-config-standard
            // 'block-opening-brace-newline-after': null, // see stylelint-config-standard
            'block-opening-brace-newline-before': null,
            // 'block-opening-brace-space-after': null, // see stylelint-config-standard
            // 'block-opening-brace-space-before': null, // see stylelint-config-standard

            // Selector
            'selector-attribute-brackets-space-inside': 'never',
            'selector-attribute-operator-space-after': 'never',
            'selector-attribute-operator-space-before': 'never',
            'selector-combinator-space-after': 'always',
            'selector-combinator-space-before': 'always',
            'selector-descendant-combinator-no-non-space': true,
            'selector-max-empty-lines': 0,
            'selector-pseudo-class-case': 'lower',
            'selector-pseudo-class-parentheses-space-inside': null, // disabled to allow multi-line selectors inside `:is()`
            'selector-pseudo-element-case': 'lower',

            // Selector list
            'selector-list-comma-newline-after': 'always',
            'selector-list-comma-newline-before': 'never-multi-line',
            'selector-list-comma-space-after': 'always-single-line',
            'selector-list-comma-space-before': 'never',

            // Media feature
            'media-feature-colon-space-after': 'always',
            'media-feature-colon-space-before': 'never',
            'media-feature-name-case': 'lower',
            'media-feature-parentheses-space-inside': 'never',
            'media-feature-range-operator-space-after': 'always',
            'media-feature-range-operator-space-before': 'always',

            // Media query list
            'media-query-list-comma-newline-after': 'always-multi-line',
            'media-query-list-comma-newline-before': 'never-multi-line',
            'media-query-list-comma-space-after': 'always-single-line',
            'media-query-list-comma-space-before': 'never',

            // At rule
            // 'at-rule-name-case': null, // see stylelint-config-standard
            'at-rule-name-newline-after': null,
            // 'at-rule-name-space-after': null, // see stylelint-config-standard
            // 'at-rule-semicolon-newline-after': null, // see stylelint-config-standard
            'at-rule-semicolon-space-before': 'never',

            // General / Sheet
            'indentation': [ // overrides stylelint-config-standard
                4,
                {
                    ignore: [ 'inside-parens' ] // necessary for indented multi-line values inside `:is()`
                }
            ],
            'linebreaks': null,
            'max-empty-lines': 2, // overrides stylelint-config-standard
            'max-line-length': null,
            'no-eol-whitespace': true,
            'no-missing-end-of-source-newline': true,
            'no-empty-first-line': true,
            'no-extra-semicolons': true,
        }
    },
    plugins: {
        scss: {
            // @-each
            'scss/at-each-key-value-single-line': true,

            // @-else
            // 'scss/at-else-closing-brace-newline-after': null, // see stylelint-config-standard-scss
            // 'scss/at-else-closing-brace-space-after': null, // see stylelint-config-standard-scss
            // 'scss/at-else-empty-line-before': null, // see stylelint-config-standard-scss
            // 'scss/at-else-if-parentheses-space-before': null, // see stylelint-config-standard-scss

            // @-extend
            // 'scss/at-extend-no-missing-placeholder': null, // see stylelint-config-recommended-scss

            // @-function
            'scss/at-function-named-arguments': null,
            // 'scss/at-function-parentheses-space-before': null, // see stylelint-config-standard-scss
            'scss/at-function-pattern': [ // overrides stylelint-config-standard-scss
                privateKebabCase,
                {
                    message: 'Expected function name to be kebab-case (or -kebab-case for private functions)',
                }
            ],

            // @-if
            // 'scss/at-if-closing-brace-newline-after': null, // see stylelint-config-standard-scss
            // 'scss/at-if-closing-brace-space-after': null, // see stylelint-config-standard-scss
            // 'scss/at-if-no-null': null, // see stylelint-config-recommended-scss

            // @-import
            // 'scss/at-import-no-partial-leading-underscore': null, // see stylelint-config-recommended-scss
            // 'scss/at-import-partial-extension': null, // see stylelint-config-recommended-scss
            'scss/at-import-partial-extension-blacklist': null,
            'scss/at-import-partial-extension-whitelist': null,

            // @-mixin
            // 'scss/at-mixin-argumentless-call-parentheses': null, // see stylelint-config-standard-scss
            'scss/at-mixin-named-arguments': null,
            // 'scss/at-mixin-parentheses-space-before': null, // see stylelint-config-standard-scss
            'scss/at-mixin-pattern': [ // overrides stylelint-config-standard-scss
                privateKebabCaseWithModifier,
                {
                    message: 'Expected mixin name to be kebab-case (or -kebab-case for private mixins) with optional modifier (kebab-case--modifier)',
                }
            ],

            // @-rule
            'scss/at-rule-conditional-no-parentheses': null, // should be `true` - disabled because of current bug with --fix (see https://github.com/stylelint-scss/stylelint-scss/issues/578) - overrides stylelint-config-standard-scss
            // 'scss/at-rule-no-unknown': null, // see stylelint-config-recommended-scss

            // @-use
            'scss/at-use-no-unnamespaced': null,

            // $-variable
            'scss/dollar-variable-colon-newline-after': null,
            // 'scss/dollar-variable-colon-space-after': null, // see stylelint-config-standard-scss
            // 'scss/dollar-variable-colon-space-before': null, // see stylelint-config-standard-scss
            'scss/dollar-variable-default': null,
            'scss/dollar-variable-empty-line-after': [
                'always',
                {
                    except: [ 'last-nested', 'before-dollar-variable' ],
                    ignore: [ 'before-comment' ]
                }
            ],
            'scss/dollar-variable-empty-line-before': [ // overrides stylelint-config-standard-scss
                'always',
                {
                    except: [ 'first-nested' ],
                    ignore: [ 'after-dollar-variable', 'after-comment', 'inside-single-line-block' ],
                },
            ],
            'scss/dollar-variable-first-in-block': null,
            // 'scss/dollar-variable-no-missing-interpolation': null, // see stylelint-config-recommended-scss
            'scss/dollar-variable-no-namespaced-assignment': true,
            'scss/dollar-variable-pattern': [ // overrides stylelint-config-standard-scss
                privateKebabCaseWithModifier,
                {
                    message: 'Expected variable name to be kebab-case (or -kebab-case for private variables) with optional modifier (kebab-case--modifier)',
                }
            ],

            // %-placeholder
            'scss/percent-placeholder-pattern': [ // overrides stylelint-config-standard-scss
                privateKebabCaseWithModifier,
                {
                    message: 'Expected placeholder name to be kebab-case (or -kebab-case for private placeholder) with optional modifier (kebab-case--modifier)',
                }
            ],

            // //-comment
            'scss/double-slash-comment-empty-line-before': null, // overrides stylelint-config-standard-scss
            'scss/double-slash-comment-inline': null,
            // 'scss/double-slash-comment-whitespace-inside': null, // see stylelint-config-standard-scss

            // Comment
            'scss/comment-no-empty': null, // for commenting out multiple lines with empty lines between - overrides stylelint-config-recommended-scss
            'scss/comment-no-loud': true,

            // Declaration
            'scss/declaration-nested-properties': 'never', // disallowed since nested properties can not pe sorted by stylelint-order (yet)
            // 'scss/declaration-nested-properties-no-divided-groups': true, // keep this enabled, just in case nested properties will be allowed in the future - see stylelint-config-recommended-scss

            // Dimension
            'scss/dimension-no-non-numeric-values': true,

            // Function
            'scss/function-color-relative': null,
            'scss/function-no-unknown': null, // rule disabled since stylelint-scss has trouble picking up functions included through @use
            // 'scss/function-quote-no-quoted-strings-inside': null, // see stylelint-config-recommended-scss
            // 'scss/function-unquote-no-unquoted-strings-inside': null, // see stylelint-config-recommended-scss

            // Map
            'scss/map-keys-quotes': null, // default

            // Media feature
            'scss/media-feature-value-dollar-variable': [
                'always',
                {
                    ignore: [ 'keywords' ]
                }
            ],

            // Operator
            'scss/operator-no-newline-after': null, // overrides stylelint-config-recommended-scss
            'scss/operator-no-newline-before': null, // overrides stylelint-config-recommended-scss
            // 'scss/operator-no-unspaced': null, // see stylelint-config-recommended-scss

            // Partial
            'scss/partial-no-import': null,

            // Selector
            'scss/selector-nest-combinators': null,
            'scss/selector-no-redundant-nesting-selector': true,
            'scss/selector-no-union-class-name': true,

            // General / Sheet
            'scss/no-dollar-variables': null,
            'scss/no-duplicate-dollar-variables': [
                true,
                {
                    ignoreInsideAtRules: [ 'if', 'else', 'for', 'each', 'while', 'mixin' ]
                }
            ],
            // 'scss/no-duplicate-mixins': null, // see stylelint-config-recommended-scss
            // 'scss/no-global-function-names': null, // see stylelint-config-recommended-scss
        },
    }
};

module.exports = {
    extends: [ 'stylelint-config-standard-scss' ],
    customSyntax: 'postcss-scss',
    plugins: [ 'stylelint-scss' ],
    rules: {
        ...rules.avoidErrors,
        ...rules.enforceConventions,
        ...rules.stylisticIssues.notHandledByPrettyPrinters,
        ...rules.stylisticIssues.handledByPrettyPrinters,
        ...rules.plugins.scss,
    },
    defaultSeverity: 'error',
    reportDescriptionlessDisables: true,
    reportInvalidScopeDisables: true,
    reportNeedlessDisables: true
};
