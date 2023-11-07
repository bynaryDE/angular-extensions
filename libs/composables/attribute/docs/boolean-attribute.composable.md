# Boolean Attribute Composable

- [`useBooleanAttribute`](#usebooleanattribute)
- [`bindBooleandAttribute`](#bindbooleanattribute)

## `useBooleanAttribute`

Binds the presence of a boolean attribute on the host element.
It will return a writable signal that can be used to change the value of the attribute.

### Parameters

| Name                   | Type      | Optional? | Description                                                                                                            |
|------------------------|-----------|-----------|------------------------------------------------------------------------------------------------------------------------|
| `attributeName`        | `string`  | no        | The name of the attribute to bind to.                                                                                  |
| `options`              | `object`  | yes       | Options to customize the behavior.                                                                                     |
| `options.namespace`    | `string`  | yes       | The namespace of the attribute.                                                                                        |
| `options.defaultValue` | `boolean` | yes       | The default value of the attribute. Will be used when no attribute value has been set in the template or on the signal |
| `options.initialValue` | `boolean` | yes       | The initial value of the attribute. Will force the initial value and override any value set in the template            |

### Usage

#### Default behavior

By default, this composable will read the value of the attribute from the usage in the template

```ts
import { useBooleanAttribute } from '@bynary/angular-composables/attribute';

@Component({
    selector: 'my-component'
})
class MyComponent {

    disabled = useBooleanAttribute('disabled');
}
```

```html
<my-component #myComponent disabled></my-component>

{{ myComponent.disabled }}
```

will render as

```html
<my-component disabled></my-component>

true
```

#### Default value

To set a default value, you can use the `options.defaultValue` parameter:

```ts
import { useBooleanAttribute } from '@bynary/angular-composables/attribute';

@Component({
    selector: 'my-component'
})
class MyComponent {

    disabled = useBooleanAttribute('disabled', { defaultValue: true });
}
```

```html
<my-component #myComponent></my-component>

{{ myComponent.disabled }}
```

and will render as

```html
<my-component disabled></my-component>

true
```

#### Force initial value

You may override any template-defined value by setting `options.initialValue`:

```ts
import { useBooleanAttribute } from '@bynary/angular-composables/attribute';

@Component({
    selector: 'my-component'
})
class MyComponent {

    disabled = useBooleanAttribute('disabled', { initialValue: false });
}
```

```html
<my-component #myComponent disabled></my-component>

{{ myComponent.disabled }}
```

will render as

```html
<my-component></my-component>

false
```

#### Custom namespace

You may also use a custom namespace for the attribute:

```ts
import { useBooleanAttribute } from '@bynary/angular-composables/attribute';

@Component({
    selector: 'my-component'
})
class MyComponent {

    disabled = useBooleanAttribute('disabled', { namespace: 'my', initialValue: true });
}
```

```html
<my-component #myComponent></my-component>

{{ myComponent.disabled }}
```

will render as

```html
<my-component my:disabled></my-component>

true
```

#### Programmatically set the value

You can also change the value of the attribute programmatically by using the returned signal:

```ts
import { useBooleanAttribute } from '@bynary/angular-composables/attribute';

@Component({
    selector: 'my-component'
})
class MyComponent {

    disabled = useBooleanAttribute('disabled');
    
    constructor() {
        this.disabled.set(true);
    }
}
```

```html
<my-component #myComponent></my-component>

{{ myComponent.disabled }}
```

will render as

```html
<my-component disabled></my-component>

true
```

## `bindBooleanAttribute`

Binds an attribute to the host element. Similar to `useBooleanAttribute`, but accepts a signal as an input instead of creating a new one and won't read the value from the template.
Will return the signal that has been passed in.

### Parameters

| Name                   | Type      | Optional? | Description                                                                                                            |
|------------------------|-----------|-----------|------------------------------------------------------------------------------------------------------------------------|
| `attributeName`        | `string`  | no        | The name of the attribute to bind to.                                                                                  |
| `signal`               | `Signal`  | no        | The signal to bind to the attribute.                                                                                   |
| `options`              | `object`  | yes       | Options to customize the behavior.                                                                                     |
| `options.namespace`    | `string`  | yes       | The namespace of the attribute.                                                                                        |
| `options.defaultValue` | `boolean` | yes       | The default value of the attribute. Will be used when no attribute value has been set in the template or on the signal |

