# Modifier Group Composable

- [`useModifierGroup`](#usemodifiergroup)
- [`bindModifierGroup`](#bindmodifiergroup)

## `useModifierGroup`

This composable adds or removes a modifier class on the host element.
It will return a writable signal that can be used to change whether the class should be added or removed.

To learn more about modifier classes, see [BEM](https://getbem.com/naming/#modifier).

### Parameters

| Name                            | Description                        |
|---------------------------------|------------------------------------|
| [`initialValue`](#initialvalue) | The initial modifier.              |
| [`options`](#options)           | Options to customize the behavior. |

---

#### `initialValue`

- **Type:** `string`
- **Optional:** yes

The initial modifier.

If set, the value will be added as a modifier class initially.

<details>
<summary>Example</summary>

```ts
// TypeScript
import { useModifierGroup } from '@bynary/composables/class';

@Component({
selector: 'my-component',
providers: [
provideBaseClass('my-component')
]
})
class MyComponent {

    color = useModifierGroup('primary');
    appearance = useModifierGroup();
}
```
```html
<!-- HTML -->
<my-component #myComponent></my-component>

Color: {{ myComponent.color }}
Appearance: {{ myComponent.appearance }}
```

will render as

```html
<my-component class="my-component my-component--primary"></my-component>

Color: primary
Appearance: 
```
</details>

---

#### `options`

- **Type:** `object`
- **Optional:** yes

A set of options to customize the behavior.

| Name                                       | Description                                                              |
|--------------------------------------------|--------------------------------------------------------------------------|
| [`baseClass`](#optionsbaseclass)           | The base class. May also be provided via `provideBaseClass`              |
| [`applyBaseClass`](#optionsapplybaseclass) | Whether the base class should be applied to the host. Defaults to `true` |
| [`prefix`](#optionsprefix)                 | A prefix for the modifier                                                |

---

##### `options.baseClass`

- **Type:** `string`
- **Optional:** yes
- **Default:** the value provided via the `BASE_CLASS` token


The base class. There is usually one base class per component.

While you're always able to explicitly set a base class vie the options, it's recommended to use the [`provideBaseClass`](./provide-base-class.md) function to provide the base class to the component.
Especially, when using [`useModifier`](./modifier.composable.md) or `useModifierGroup` multiple times in one directive or component.

> [!WARNING]
> If you don't provide a base class either via `options.baseClass` or via `provideBaseClass`, an error will be thrown!

<details>
<summary>Example</summary>

```ts
// TypeScript
import { useModifierGroup } from '@bynary/composables/class';

@Component({
    selector: 'my-component'
})
class MyComponent {

    color = useModifierGroup('primary', { baseClass: 'my-component' });
}
```
```html
<!-- HTML -->
<my-component></my-component>
```

will render as

```html
<my-component class="my-component my-component--primary"></my-component>
```
</details>

---

<details>
<summary><code>options.applyBaseClass</code> Whether to apply the base class to the host element.</summary>

- **Type:** `boolean`
- **Optional:** yes
- **Default:** `true`
</details>

<details>
<summary>Example 1 (default behavior / applyBaseClass = true)</summary>

```ts
// TypeScript
import { useModifierGroup } from '@bynary/composables/class';

@Component({
    selector: 'my-component'
})
class MyComponent {

    color = useModifierGroup('primary', { baseClass: 'my-component' });
}
```

```html
<!-- HTML -->
<my-component></my-component>
```

will render as

```html

<my-component class="my-component my-component--primary"></my-component>
```

The base class `my-component` has been added to the host element.

</details>

<details>
<summary>Example 2 (applyBaseClass = false)</summary>

```ts
// TypeScript
import { useModifierGroup } from '@bynary/composables/class';

@Component({
    selector: 'my-component'
})
class MyComponent {

    color = useModifierGroup('primary', { baseClass: 'my-component', applyBaseClass: false });
}
```

```html
<!-- HTML -->
<my-component></my-component>
```

will render as

```html

<my-component class="my-component--primary"></my-component>
```

The base class `my-component` has *not* been added to the host element.

</details>

---

##### `options.prefix`

- **Type:** `string`
- **Optional:** yes
- **Default:** -

A prefix to prepend to the modifier class.


```ts
// Without a prefix:
useModifierGroup('primary', { baseClass: 'button' })
// -> button--primary

// With a prefix:
useModifierGroup('primary', { baseClass: 'button', prefix: 'color' })
// -> button--color-primary
```

<details>
<summary>Example</summary>

```ts
// TypeScript
import { useModifierGroup } from '@bynary/composables/class';

@Component({
    selector: 'my-component'
})
class MyComponent {

    color = useModifierGroup('primary', { prefix: 'color' });
}
```
```html
<!-- HTML -->
<my-component></my-component>
```

will render as

```html
<my-component class="my-component my-component--color-primary"></my-component>
```

</details>

---

## `bindModifierGroup`

Binds the value of a signal as a modifier class on the host element.

Similar to [`useModifierGroup`](#usemodifiergroup), but accepts a signal as an input instead of creating a new one.
Will return the signal that has been passed in.

### Parameters

| Name                         | Description                                                                                         |
|------------------------------|-----------------------------------------------------------------------------------------------------|
| [`modifier`](#initialvalue)  | The signal providing the modifier.                                                                  |
| [`options`](#options)        | Options to customize the behavior. Uses the same options as [`useModifierGroup`](#usemodifiergroup) |

---

#### `modifier`

- **Type:** `Signal<string>`
- **Optional:** no
- **Default:** -

The signal providing the modifier.

<details>
<summary>Example</summary>

```ts
import { bindModifier } from '@bynary/composables/class';

@Component({
    selector: 'my-component'
})
class MyComponent {

    color: Signal<string> = signal('primary');

    constructor() {
        bindModifierGroup(this.color);
    }
}
```

</details>
