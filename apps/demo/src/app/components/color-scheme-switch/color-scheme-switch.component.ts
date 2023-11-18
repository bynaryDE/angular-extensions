import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { bindAttribute } from '@bynary/composables/attribute';
import { useColorScheme } from '@bynary/composables/observer';
import { useStorage } from '@bynary/composables/storage';

@Component({
    selector: 'demo-color-scheme-switch',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './color-scheme-switch.component.html',
    styleUrls: [ './color-scheme-switch.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorSchemeSwitchComponent {

    colorScheme = useColorScheme({ store: useStorage('color-scheme') });

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
