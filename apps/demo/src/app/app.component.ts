import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { useTitle } from '@bynary/composables/title';

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

    title = useTitle('@bynary/composables');

    /**
     *
     */
    onButtonActive($event: Event) {
        // eslint-disable-next-line no-console
        console.log('Active', $event)
    }
}
