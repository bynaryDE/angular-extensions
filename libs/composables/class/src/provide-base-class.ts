import { InjectionToken } from '@angular/core';

/**
 * Injection token for providing a base CSS class.
 */
export const BASE_CLASS = new InjectionToken<string>('@bynary/composables/class.base-class');

/**
 * Provide a base CSS class that should be applied to a host.
 *
 * @see useModifier
 * @see useModifierGroup
 *
 * @param baseClass - The base class to provide.
 */
export const provideBaseClass = (baseClass: string) => ({
    provide: BASE_CLASS,
    useValue: baseClass
});
