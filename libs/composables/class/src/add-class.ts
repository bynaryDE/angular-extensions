import { ElementRef, inject, Renderer2 } from '@angular/core';

export const addClass = (clazz: string) => {
    const element = inject(ElementRef).nativeElement;
    const renderer = inject(Renderer2);

    renderer.addClass(element, clazz);
};
