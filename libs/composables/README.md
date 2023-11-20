# @bynary/composables
[![npm](https://img.shields.io/npm/v/%40bynary%2Fcomposables)](https://www.npmjs.com/package/@bynary/composables)

A collection of composable functions for Angular based on signals.

> [!WARNING]
> This package is still in early development and not ready for production use. The API is not stable and might change at any time. 

## Installation

To install this library, run

```shell
$ npm install @bynary/composables --save
```

## Usage

Composables are a great way to add complex behavior in just one line ad help keep your components clean and readable.
Let's build a simple button with support for different styles, colors and basic accessibility in mind.

### Without composables

Without composables, things get complicated pretty quickly, especially when handling multiple classes, or binding attributes without overriding the user defined values.

```ts
import { CommonModule } from '@angular/common';
import { Attribute, Component, ElementRef, HostBinding, inject, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'old-button',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: '<ng-content></ng-content>',
    host: {
        class: 'c-button'
    }
})
export class OldButtonComponent implements OnInit {
    @HostBinding('attr.type')
    type: string;

    isDisabled: boolean;

    @HostBinding('class.c-button--is-loading')
    isLoading = false;

    private _appearance?: 'solid' | 'outline';
    private _color?: 'red' | 'green';
    private readonly _renderer = inject(Renderer2);
    private readonly _elementRef = inject(ElementRef);

    constructor(@Attribute('type') type: string, @Attribute('disabled') disabled: string) {
        this.type = type ?? 'button';
        this.isDisabled = disabled != null;
    }

    @HostBinding('attr.disabled')
    get disabledAttr() {
        return this.isDisabled ? '' : null;
    }

    @HostBinding('attr.tabindex')
    get tabIndex() {
        return this.isDisabled ? '-1' : '0';
    }

    get appearance(): 'solid' | 'outline' | undefined {
        return this._appearance;
    }

    set appearance(value: 'solid' | 'outline' | undefined) {
        if (this._appearance === value) {
            return;
        }

        this._renderer.removeClass(
            this._elementRef.nativeElement,
            `c-button--${this._appearance}`
        );
        this._appearance = value;
        this._renderer.addClass(
            this._elementRef.nativeElement,
            `c-button--${this._appearance}`
        );
    }

    get color(): 'red' | 'green' | undefined {
        return this._color;
    }

    set color(value: 'red' | 'green' | undefined) {
        if (this._color === value) {
            return;
        }

        if (this._color) {
            this._renderer.removeClass(
                this._elementRef.nativeElement,
                `c-button--color-${this._color}`
            );
        }

        this._color = value;

        if (this._color) {
            this._renderer.addClass(
                this._elementRef.nativeElement,
                `c-button--color-${this._color}`
            );
        }
    }

    ngOnInit() {
        this.appearance = 'solid';
    }
}

```

### With composables

What if you could write the same functionality in just a few lines of code?

```ts
@Component({
    selector: 'my-button',
    standalone: true,
    imports: [ CommonModule ],
    template: '<ng-content></ng-content>',
    providers: [
        provideBaseClass('c-button')
    ]
})
export class ButtonComponent {

    readonly type = useAttribute('type', { defaultValue: 'button' });
    readonly isDisabled = useBooleanAttribute('disabled');
    readonly isLoading = useModifier('is-loading', { initialValue: false });
    readonly appearance = useModifierGroup('solid');
    readonly color = useModifierGroup(undefined, { prefix: 'color' });

    constructor() {
        bindAttribute('tabindex', computed(() => this.isDisabled() ? '-1' : '0'));
    }
}
```

<details>
<summary>Future use with <code>input()</code> in signal based components</summary>

Next to the `useXyz`-function, each composable is also available as a `binXyz`-function, which takes a signal as an input and allows to combine multiple use cases in one statement.
E.g. with the upcoming signal-based `input()` function ([read more about this](https://github.com/angular/angular/discussions/49682)) 

```ts
import { bindAttribute } from './attribute.composable';

@Component({
    selector: 'my-button',
    standalone: true,
    imports: [ CommonModule ],
    template: '<ng-content></ng-content>',
    providers: [
        provideBaseClass('c-button')
    ]
})
export class ButtonComponent {

    readonly disabled = input(false);
    readonly loading = input(false);
    readonly appearance = input('solid');
    readonly color = input(undefined);
    readonly type = useAttribute('type', { defaultValue: 'button' });

    constructor() {
        bindBooleanAttribute('disabled', this.disabled);
        bindModifier('is-loading', this.loading);
        bindModifierGroup(this.appearance);
        bindModifierGroup(this.color, { prefix: 'color' });
        bindAttribute('tabindex', computed(() => this.disabled() ? '-1' : '0'));
    }
}
```
</details>

### Run the demo

Try it out yourself by running `nx serve demo` and navigating to `http://localhost:4200/`.
Or check the code for the demo in the [demo app](../../apps/demo).


## Packages

The composable functions are exported from subpackages, grouped by their purpose.

| Package                                                          | Purpose                                                             |
|------------------------------------------------------------------|---------------------------------------------------------------------|
| [`@bynary/composables/attribute`](attribute/README.md) | Bind HTML attributes                                                |
| [`@bynary/composables/class`](class/README.md)       | Bind classes on HTML elements                                       |
| [`@bynary/composables/observer`](observer/README.md) | Observe events, media queries and similar things                    |
| [`@bynary/composables/storage`](storage/README.md)   | Bind a signal to a storage, e.g. `localStorage` or `sessionStorage` |
| [`@bynary/composables/title`](title/README.md)       | Read and write the HTML document's title                            |

## Running commands

### Lint

Run `nx lint composables` to lint this project.

### Test

Run `nx test composables` to execute the unit tests.

### Build

Run `nx build composables` to build this project.

## Contributors
