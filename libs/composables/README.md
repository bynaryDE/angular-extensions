# @bynary/composables

A collection of composable functions for Angular based on signals.

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
import { Attribute, ElementRef, HostBinding, Renderer2, SimpleChanges } from '@angular/core';

@Component({
    selector: 'my-button',
    standalone: true,
    imports: [ CommonModule ],
    template: '<ng-content></ng-content>',
    host: {
        class: 'my-button'
    }
})
export class ButtonComponent {

    @HostBinding('attr.type')
    type = 'button';
 
    @HostBinding('attr.disabled')
    disabled = inject(Attribute('disabled')) ?? false;

    @HostBinding('class.my-button--is-loading')
    loading = false;

    private _appearance: 'solid' | 'outline' = 'solid';
    private _color?: 'red' | 'blue';
    private readonly _renderer = inject(Renderer2);
    private readonly _elementRef = inject(ElementRef);

    @HostBinding('attr.tabindex')
    get tabIndex() {
        return this.disabled ? '-1' : '0'
    }

    get appearance(): 'solid' | 'outline' {
        return this._appearance;
    }

    set appearance(value: 'solid' | 'outline') {
        if (this._appearance === value) {
            return;
        }

        this._renderer.removeClass(this._elementRef, `my-component--${this._appearance}`);
        this._appearance = value;
        this._renderer.addClass(this._elementRef, `my-component--${this._appearance}`);
    }

    get color(): 'red' | 'blue' | undefined {
        return this._appearance;
    }

    set color(value: 'red' | 'blue' | undefined) {
        if (this._color === value) {
            return;
        }

        if (this._color) {
            this._renderer.removeClass(this._elementRef, `my-component--color-${this._color}`);
        }

        this._color = value;

        if (this._color) {
            this._renderer.addClass(this._elementRef, `my-component--color-${this._color}`);
        }
    }
}
```

### With composables

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
    readonly disabled = useBooleanAttribute('disabled');
    readonly loading = useModifier('is-loading', { applyInitially: false });
    readonly appearance = useModifierGroup('solid');
    readonly color = useModifierGroup(undefined, { prefix: 'color' });

    constructor() {
        bindAttribute('tabindex', computed(() => this.disabled() ? '-1' : '0'));
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

    readonly type = useAttribute('type', { defaultValue: 'button' });
    readonly disabled = bindBooleanAttribute('disabled', input(false, { alias: 'disabled' }));
    readonly loading = bindModifier('is-loading', input(false, { alias: 'loading' }), { applyInitially: false });
    readonly appearance = bindModifierGroup(input('solid', { alias: 'appearance'}));
    readonly color = bindModifierGroup(undefined, input({ alias: 'color'}), { prefix: 'color' });

    constructor() {
        bindAttribute('tabindex', computed(() => this.disabled() ? '-1' : '0'));
    }
}
```
</details>

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
