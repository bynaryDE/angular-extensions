import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { useTitle } from '@bynaryde/angular/signals';

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

    onButtonActive($event: Event) {
        console.log('Active', $event)
    }
}
