import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { bindTitle } from '@bynary/composables/title';

import { ButtonComponent } from './components/button/button.component';
import { ColorSchemeSwitchComponent } from './components/color-scheme-switch/color-scheme-switch.component';

@Component({
    standalone: true,
    imports: [ RouterModule, ButtonComponent, ColorSchemeSwitchComponent ],
    selector: 'demo-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent {

    counter = signal(0);
    title = bindTitle(computed(() => this.counter() ? `@bynary/composables - Clicks: ${this.counter()}` : '@bynary/composables'));

    onClick() {
        this.counter.update((value) => value + 1);
    }
}
