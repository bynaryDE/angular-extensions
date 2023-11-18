import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ViewEncapsulation } from '@angular/core';
import { bindAttribute, useAttribute, useBooleanAttribute } from '@bynary/composables/attribute';
import { provideBaseClass, useModifier, useModifierGroup } from '@bynary/composables/class';

/**
 * A demo button
 */
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
    readonly isDisabled = useBooleanAttribute('disabled');
    readonly isLoading = useModifier('is-loading', { initialValue: false });
    readonly appearance = useModifierGroup<'solid' | 'outline'>('solid');
    readonly color = useModifierGroup<'red' | 'green'>(undefined, { prefix: 'color' });

    constructor() {
        bindAttribute('tabindex', computed(() => this.isDisabled() ? '-1' : '0'));
    }

}
