# Modifier Composable

- [`useModifier`](#usemodifier)
- [`bindModifier`](#bindmodifier)

## `useModifier`

This composable adds or removes a modifier class on the host element.
It will return a writable signal that can be used to change whether the class should be added or removed.

To learn more about modifier classes, see [BEM](https://getbem.com/naming/#modifier).

### Parameters

| Name                     | Type      | Optional? | Description                                                              |
|--------------------------|-----------|-----------|--------------------------------------------------------------------------|
| `modifier`               | `string`  | no        | The name of the modifier.                                                |
| `options`                | `object`  | yes       | Options to customize the behavior.                                       |
| `options.baseClass`      | `string`  | yes       | The base class. May also be provided via `provideBaseClass`              |
| `options.applyBaseClass` | `boolean` | yes       | Whether the base class should be applied to the host. Defaults to `true` |
| `options.initialValue`   | `boolean` | yes       | Whether the modifier class should initially be added. Defaults to `true` |


### Usage

#### Providing the base class

While you're always able to explicitly set a baseClass via options, it's recommended to use the `provideBaseClass` function to provide the base class to the component.
Especially, when using `useModifier` or [`useModifierGroup`](./modifier-group.composable.md) multiple times in one directive or component.

##### Per composable approach

```ts
// TypeScript
import { useModifier } from '@bynary/composables/class';

@Component({
    selector: 'my-component'
})
class MyComponent {

    isLoading = useModifier('loading', { baseClass: 'my-component' });
}
```
##### Per component approach


```ts
// TypeScript
import { useModifier } from '@bynary/composables/class';

@Component({
    selector: 'my-component',
    providers: [
        provideBaseClass('my-component')
    ]
})
class MyComponent {

    isLoading = useModifier('loading');
    isDisabled = useModifier('disabled');
    isSelected = useModifier('selected');
}
```

#### Default behavior

By default, this composable will add the base and modifier class to the host element

```ts
// TypeScript
import { useModifier } from '@bynary/composables/class';

@Component({
    selector: 'my-component',
    providers: [
        provideBaseClass('my-component')
    ]
})
class MyComponent {

    isLoading = useModifier('loading');
}
```

```html
<!-- HTML -->
<my-component #myComponent></my-component>

{{ myComponent.isLoading }}
```

will render as

```html
<my-component class="my-component my-component--loading"></my-component>

true
```

#### Override initial value

If you don't want to add the class initially, set `options.initialValue` to `false`:

```ts
import { useModifier } from '@bynary/composables/class';

@Component({
    selector: 'my-component',
    providers: [
        provideBaseClass('my-component')
    ]
})
class MyComponent {

    isLoading = useModifier('loading', { initialValue: false });
}
```

```html
<my-component #myComponent></my-component>

{{ myComponent.isLoading }}
```

will render as

```html
<my-component class="my-component"></my-component>

false
```

#### Programmatically set the value

By changing the value of the signal, you can add / remove the class programmatically

```ts
import { useModifier } from '@bynary/composables/class';

@Component({
    selector: 'my-component'
})
class MyComponent {

    isLoading = useModifier('loading', { initialValue: false });

    startLoading() {
        this.isLoading.set(true); // will result in `class="my-component my-component--loading"`
    }

    stopLoading() {
        this.isLoading.set(false); // will result in `class="my-component"`
    }
}
```


## `bindModifier`

Toggles a modifier class on the host element based on the value of a signal. Similar to `useModifier`, but accepts a boolean signal as an input instead of creating a new one.
Will return the signal that has been passed in.

### Parameters

| Name                     | Type       | Optional? | Description                                                                                                                                                      |
|--------------------------|------------|-----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `modifier`               | `string`   | no        | The name of the modifier.                                                                                                                                        |
| `apply`                  | `Signal`   | no        | The signal to determine whether the modifier should be added or removed. When the signal's value is true, the modifier will be applied. Else it will be removed. |
| `options`                | `object`   | yes       | Options to customize the behavior.                                                                                                                               |
| `options.baseClass`      | `string`   | yes       | The base class. May also be provided via `provideBaseClass`                                                                                                      |
| `options.applyBaseClass` | `boolean`  | yes       | Whether the base class should be applied to the host. Defaults to `true`                                                                                         |

### Usage

`bindModifier` can be used inside a directive or component:

```ts
import { bindModifier } from '@bynary/composables/class';

@Component({
    selector: 'my-component'
})
class MyComponent {

    isLoading: Signal<boolean> = signal(false);

    constructor() {
        bindModifier('loading', this.isLoading);
    }
}
```
