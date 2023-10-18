import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { useTitle } from '@bynaryde/angular/signals';
import { ButtonComponent } from './components/button/button.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
    standalone: true,
    imports: [ NxWelcomeComponent, RouterModule, ButtonComponent ],
    selector: 'demo-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  title = useTitle('demo');
}
