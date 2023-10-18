import { effect, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';

export const useTitle = (initialValue?: string) => {
    const title = inject(Title);
    const value = signal(initialValue ?? title.getTitle());

    effect(() => {
        title.setTitle(value());
    });

    return value;
}

export const useTitle2 = (name: string, initialValue?: string) => {
    const title = inject(Title);

    const value = signal(initialValue ?? title.getTitle());

    effect(() => {
        title.setTitle(value());
    });

    return value;
}


