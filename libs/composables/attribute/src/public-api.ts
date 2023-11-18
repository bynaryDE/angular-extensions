/**
 * @packageDocumentation
 * This module contains composables to bind attributes on elements.
 *
 * @example
 * ```ts
 * @Component({
 *    selector: 'my-component',
 *    template: '<ng-content></ng-content>'
 * })
 * class MyButton {
 *     isDisabled = useBooleanAttribute('disabled');
 *
 *     constructor() {
 *         bindAttribute('tab-index', computed(() => this.isDisabled() ? '-1' : '0'));
 *     }
 * }
 * ```
 *
 * @module @bynary/composables/attribute
 */

export * from './attribute.composable';
export * from './boolean-attribute.composable';
