# `useAttribute`

This composable is used to get and set the value of an attribute of an element.
It will return a writable signal that can be used to change the value of the attribute.

## Parameters

| Name                   | Type     | Optional? | Description                                                                                                               |
|------------------------|----------|-----------|---------------------------------------------------------------------------------------------------------------------------|
| `attributeName`        | `string` | no        | The name of the attribute to bind to.                                                                                     |
| `options`              | `object` | yes       | Options to customize the behavior.                                                                                        |
| `options.namespace`    | `string` | yes       | The namespace of the attribute.                                                                                           |
| `options.defaultValue` | `string` | yes       | The default value of the attribute. Will be applied when no attribute value has been set in the template or on the signal |
| `options.initialValue` | `string` | yes       | The initial value of the attribute. Will force the initial value and override any value set in the template               |


## Usage

### Default behavior

By default, this composable will read the value of the attribute from the usage in the template

```ts
import { useAttribute } from '@bynary/angular-composables/attribute';

@Component({
    selector: 'my-component'
})
class MyComponent {

    label = useAttribute('label');
}
```

```html
<my-component #myComponent label="foo"></my-component>

{{ myComponent.label }}
```

will render as

```html
<my-component label="foo"></my-component>

foo
```

### Default value

To set a default value, you can use the `options.defaultValue` parameter:

```ts
import { useAttribute } from '@bynary/angular-composables/attribute';

@Component({
    selector: 'my-component'
})
class MyComponent {

    label = useAttribute('label', { defaultValue: 'foo' });
}
```

```html
<my-component #myComponent></my-component>

{{ myComponent.label }}
```

and will render as

```html
<my-component label="foo"></my-component>

foo
```

### Force initial value

You may override any template-defined value by setting `options.initialValue`:

```ts
import { useAttribute } from '@bynary/angular-composables/attribute';

@Component({
    selector: 'my-component'
})
class MyComponent {

    label = useAttribute('label', { initialValue: 'bar' });
}
```

```html
<my-component #myComponent label="foo"></my-component>

{{ myComponent.label }}
```

will render as

```html
<my-component label="bar"></my-component>

bar
```

### Custom namespace

You may also use a custom namespace for the attribute:

```ts
import { useAttribute } from '@bynary/angular-composables/attribute';

@Component({
    selector: 'my-component'
})
class MyComponent {

    label = useAttribute('label', { namespace: 'my', initialValue: 'baz' });
}
```

```html
<my-component #myComponent></my-component>

{{ myComponent.label }}
```

will render as

```html
<my-component my:label="baz"></my-component>

baz
```

### Programmatically set the value

You can also change the value of the attribute programmatically by using the returned signal:

```ts
import { useAttribute } from '@bynary/angular-composables/attribute';

@Component({
    selector: 'my-component'
})
class MyComponent {

    label = useAttribute('label');
    
    constructor() {
        this.label.set('programmatically set value');
    }
}
```

```html
<my-component #myComponent></my-component>

{{ myComponent.label }}
```

will render as

```html
<my-component label="programmatically set value"></my-component>

programmatically set value
```
