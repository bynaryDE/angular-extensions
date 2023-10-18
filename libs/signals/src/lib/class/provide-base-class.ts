import { InjectionToken } from '@angular/core';

export const BASE_CLASS = new InjectionToken<string>('base-class');
export const provideBaseClass = (baseClass: string) => ({ provide: BASE_CLASS, useValue: baseClass });
