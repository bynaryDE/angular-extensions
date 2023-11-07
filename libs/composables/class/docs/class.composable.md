# Class Composable

- [`useClass`](#useclass)
- [`bindClass`](#bindclass)

## `useClass`

This composable is used to add or remove a specific class on the host element.
It will return a writable signal that can be used to change whether the class should be added or removed.

### Parameters

| Name                   | Type      | Optional? | Description                                 |
|------------------------|-----------|-----------|---------------------------------------------|
| `clazz`                | `string`  | no        | The name of the class.                      |
| `options`              | `object`  | yes       | Options to customize the behavior.          |
| `options.initialValue` | `boolean` | yes       | Whether the class should initially be added |


### Usage

#### Default behavior

By default, this composable will add the class to the host element

```ts
import { useClass } from '@bynary/angular-composables/class';

@Component({
    selector: 'my-component'
})
class MyComponent {

    isLoading = useClass('loading');
}
```

```html
<my-component #myComponent></my-component>

{{ myComponent.isLoading }}
```

will render as

```html
<my-component class="loading"></my-component>

true
```

#### Override initial value

If you don't want to add the class initially, set `options.initialValue` to `false`:

```ts
import { useClass } from '@bynary/angular-composables/class';

@Component({
    selector: 'my-component'
})
class MyComponent {

    isLoading = useClass('label', { initialValue: false });
}
```

```html
<my-component #myComponent></my-component>

{{ myComponent.isLoading }}
```

will render as

```html
<my-component></my-component>

false
```

#### Programmatically set the value

By changing the value of the signal, you can add / remove the class programmatically

```ts
import { useClass } from '@bynary/angular-composables/class';

@Component({
    selector: 'my-component'
})
class MyComponent {

    isLoading = useClass('loading', { initialValue: false });

    startLoading() {
        this.isLoading.set(true);
    }

    stopLoading() {
        this.isLoading.set(false);
    }
}
```


## `bindClass`

Toggles a class on the host element based on the value of a signal. Similar to `useClass`, but accepts a boolean signal as an input instead of creating a new one.
Will return the signal that has been passed in.

### Parameters

| Name    | Type     | Optional? | Description                                                                                                                                                |
|---------|----------|-----------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `clazz` | `string` | no        | The name of the class.                                                                                                                                     |
| `value` | `Signal` | no        | The signal to determine whether the class should be added or removed. When the signal's value is true, the class will be applied. Else it will be removed. |

### Usage

`bindClass` can be used inside a directive or component:

```ts
import { bindClass } from '@bynary/angular-composables/class';

@Component({
    selector: 'my-component'
})
class MyComponent {

    isLoading: Signal<boolean> = signal(false);

    constructor() {
        bindClass('loading', this.isLoading);
    }
}
```
