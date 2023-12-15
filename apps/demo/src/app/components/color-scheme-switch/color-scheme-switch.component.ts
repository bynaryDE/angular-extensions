import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { bindAttribute } from '@bynary/composables/attribute';
import { ColorScheme, useColorScheme } from '@bynary/composables/observer';
import { useStorage } from '@bynary/composables/storage';

@Component({
    selector: 'demo-color-scheme-switch',
    standalone: true,
    templateUrl: './color-scheme-switch.component.html',
    styleUrls: ['./color-scheme-switch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorSchemeSwitchComponent {
    public readonly colorScheme = useColorScheme({
        store: useStorage<ColorScheme>('color-scheme'),
        defaultValue: 'light'
    });

    constructor() {
        const root = document.firstElementChild;

        if (root) {
            bindAttribute('color-scheme', this.colorScheme.resolved, { target: root });
        }
    }

    @HostListener('click')
    onClick() {
        const current = this.colorScheme.resolved();

        if (current === 'light') {
            this.colorScheme.store.set('dark');
        } else if (current === 'dark') {
            this.colorScheme.store.set('light');
        }
    }
}
