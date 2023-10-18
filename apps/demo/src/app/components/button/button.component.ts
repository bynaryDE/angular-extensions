import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { provideBaseClass, useAttribute, useBooleanAttribute, useModifier, useModifierGroup } from '@bynaryde/angular/signals';

@Component({
    selector: 'demo-button',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './button.component.html',
    styleUrls: [ './button.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        provideBaseClass('c-button')
    ]
})
export class ButtonComponent {

    disabled = useBooleanAttribute('disabled');
    role = useAttribute('role', { initialValue: 'button' });
    type = useAttribute('type', { defaultValue: 'button' });

    loading = useModifier('loading', { applyInitially: false });
    appearance = useModifierGroup('solid');
    color = useModifierGroup(undefined, { prefix: 'color' });

}
