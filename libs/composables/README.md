# @bynary/angular-composables

A collection of composable functions for Angular based on signals.

## Installation

To install this library, run

```shell
$ npm install @bynary/angular-composables --save
```

## Usage

The composable functions are exported from subpackages, grouped by their purpose.

| Package                                                          | Purpose                                                             |
|------------------------------------------------------------------|---------------------------------------------------------------------|
| [`@bynary/angular-composables/attribute`](attribute/README.md) | Bind HTML attributes                                                |
| [`@bynary/angular-composables/class`](class/README.md)       | Bind classes on HTML elements                                       |
| [`@bynary/angular-composables/observer`](observer/README.md) | Observe events, media queries and similar things                    |
| [`@bynary/angular-composables/storage`](storage/README.md)   | Bind a signal to a storage, e.g. `localStorage` or `sessionStorage` |
| [`@bynary/angular-composables/title`](title/README.md)       | Read and write the HTML document's title                            |

## Running commands

### Lint

Run `nx lint composables` to lint this project.

### Test

Run `nx test composables` to execute the unit tests.

### Build

Run `nx build composables` to build this project.

## Contributors
