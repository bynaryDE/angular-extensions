import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Output, ViewEncapsulation } from '@angular/core';
import { bindAttribute, bindBooleanAttribute, useAttribute } from '@bynary/angular-composables/attribute';
import { provideBaseClass, useModifier, useModifierGroup } from '@bynary/angular-composables/class';
import { useActivate } from '@bynary/angular-composables/observer';

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

    role = useAttribute('role', { defaultValue: 'button' });
    type = useAttribute('type', { defaultValue: 'button' });

    disabled = bindBooleanAttribute('disabled', useModifier('disabled', { applyInitially: false }));
    loading = useModifier('loading', { applyInitially: false });

    appearance = useModifierGroup('solid');
    color = useModifierGroup(undefined, { prefix: 'color' });

    @Output()
    active = useActivate({ click: true, keydown: [ 'Enter' ] });

    constructor() {
        bindBooleanAttribute('disabled', this.disabled);
        bindAttribute('tabindex', computed(() => this.disabled() ? '-1' : '0'));
    }

}
