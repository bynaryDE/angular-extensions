# Classes Composable

- [`useClasses`](#useclasses)
- [`bindClasses`](#bindclasses)

## `useClasses`

This composable is used to add or remove a set of classes on the host element.
It will return a writable signal that can be used to change whether the class should be added or removed.

### Parameters

| Name           | Type                 | Optional? | Description                                                        |
|----------------|----------------------|-----------|--------------------------------------------------------------------|
| `initialValue` | `string \| string[]` | yes       | The list of classes to apply initially. Defaults to an empty array |


### Usage

#### Default behavior

By default, this composable will add the classes to the host element

```ts
import { useClasses } from '@bynary/angular-composables/class';

@Component({
    selector: 'my-component'
})
class MyComponent {
    
    classes = useClasses(['my-component', 'primary', 'focusable']);
}
```

```html
<my-component #myComponent></my-component>
```

will render as

```html
<my-component class="my-component primary focusable"></my-component>
```

#### String as initial value

You may also pass a string as the initial value. The string will be split by spaces and each part will be added as a class.
Multiple spaces will be ignored.

```ts
import { useClasses } from '@bynary/angular-composables/class';

@Component({
    selector: 'my-component'
})
class MyComponent {

    isLoading = useClasses('my-component primary    focusable');
}
```

```html
<my-component #myComponent></my-component>
```

will render as

```html
<my-component class="my-component primary focusable"></my-component>
```

#### Programmatically set the value

By changing the value of the signal, you can add / remove classes programmatically.
Each previously set class will be removed and the new classes will be added.
Classes set form somewhere else (e.g. the template) will be untouched, except for ones that are contained in new or previous list.

```ts
import { useClasses } from '@bynary/angular-composables/class';

@Component({
    selector: 'my-component',
    host: {
        class: 'my-component'
    }
})
class MyComponent {

    classes = useClasses('primary focusable'); // initially, these classes will be set on the host: `my-component`, `primary`, `focusable`

    changeClasses() {
        this.classes.set('accent');  // will remove `primary` and `focusable`, resulting in these classes set on the host: `my-component`, `accent`
    }
}
```


## `bindClasses`

Binds a set of class to the host element based on the value of a signal. Similar to `useClasses`, but accepts a signal as an input instead of creating a new one.
Will return the signal that has been passed in.

### Parameters

| Name    | Type     | Optional? | Description                                            |
|---------|----------|-----------|--------------------------------------------------------|
| `value` | `Signal` | no        | The signal containing the classes to bind to the host. |

### Usage

`bindClasses` can be used inside a directive or component:

```ts
import { bindClasses } from '@bynary/angular-composables/class';

@Component({
    selector: 'my-component'
})
class MyComponent {

    classes = signal([ 'foo', 'bar' ]);

    constructor() {
        bindClasses(this.classes);
    }
}
```
