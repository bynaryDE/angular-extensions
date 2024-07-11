import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { bindAttribute, bindBooleanAttribute, useAttribute } from '@bynary/composables/attribute';
import { bindModifier, bindModifierGroup, provideBaseClass } from '@bynary/composables/class';

export type ButtonAppearance = 'solid' | 'outline' | undefined;
export type ButtonColor = 'red' | 'green' | undefined;

/**
 * A demo button
 */
@Component({
    selector: 'demo-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideBaseClass('c-button')]
})
export class ButtonComponent {
    readonly disabled = input(false);
    readonly loading = input(false);
    readonly appearance = input<ButtonAppearance>('solid');
    readonly color = input<ButtonColor>(undefined);
    readonly type = useAttribute('type', { defaultValue: 'button' });

    constructor() {
        bindBooleanAttribute('disabled', this.disabled);
        bindModifier('is-loading', this.loading);
        bindModifierGroup(this.appearance);
        bindModifierGroup(this.color, { prefix: 'color' });
        bindAttribute('type', this.type);
        bindAttribute(
            'tabindex',
            computed(() => (this.disabled() ? '-1' : '0'))
        );
    }
}
