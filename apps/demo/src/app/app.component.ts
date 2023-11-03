import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { useTitle } from '@bynary/angular-composables/title';

import { ButtonComponent } from './components/button/button.component';

@Component({
    standalone: true,
    imports: [ RouterModule, ButtonComponent ],
    selector: 'demo-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
    title = useTitle('demo');

    /**
     *
     */
    onButtonActive($event: Event) {
        // eslint-disable-next-line no-console
        console.log('Active', $event)
    }
}
