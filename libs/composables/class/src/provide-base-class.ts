import { InjectionToken } from '@angular/core';

/**
 * Injection token for providing a base CSS class.
 */
export const BASE_CLASS = new InjectionToken<string>('@bynary/composables/class.base-class');

/**
 * Provide a base CSS class that should be applied to a host.
 * The base class can be injected using the {@link BASE_CLASS} token.
 * This token will be used by {@link useModifier} and {@link useModifierGroup} to generate modifier classes.
 *
 * @see useModifier
 * @see useModifierGroup
 *
 * @example
 * ```ts
 * @Component({
 *    selector: 'my-component',
 *    providers: [
 *        provideBaseClass('my-component')
 *    ]
 * })
 * class MyComponent {
 *     baseClass = inject(BASE_CLASS); // 'my-component'
 * }
 *
 * @param baseClass - The base class to provide.
 */
export const provideBaseClass = (baseClass: string) => ({
    provide: BASE_CLASS,
    useValue: baseClass
});
