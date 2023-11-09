import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Output, ViewEncapsulation } from '@angular/core';
import { bindAttribute, useAttribute, useBooleanAttribute } from '@bynary/composables/attribute';
import { provideBaseClass, useModifier, useModifierGroup } from '@bynary/composables/class';
import { useActivate } from '@bynary/composables/observer';

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

    readonly type = useAttribute('type', { defaultValue: 'button' });
    readonly disabled = useBooleanAttribute('disabled');

    readonly loading = useModifier('loading', { applyInitially: false });

    readonly appearance = useModifierGroup('solid');

    @Output()
    readonly active = useActivate({ click: true, keydown: [ 'Enter' ] });

    constructor() {
        bindAttribute('tabindex', computed(() => this.disabled() ? '-1' : '0'));
    }

}
