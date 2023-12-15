import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { bindTitle } from '@bynary/composables/title';

import { ButtonComponent } from './components/button/button.component';
import { ColorSchemeSwitchComponent } from './components/color-scheme-switch/color-scheme-switch.component';
import { OldButtonComponent } from './components/old-button/old-button.component';

@Component({
    standalone: true,
    imports: [RouterModule, ButtonComponent, ColorSchemeSwitchComponent, OldButtonComponent],
    selector: 'demo-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    readonly counter = signal(0);
    readonly title = bindTitle(
        computed(() => (this.counter() ? `@bynary/composables - Clicks: ${this.counter()}` : '@bynary/composables'))
    );

    incrementCounter() {
        this.counter.update((value) => value + 1);
    }
}
