import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, Output, ViewEncapsulation } from '@angular/core';
import { bindAttribute, useAttribute, useBooleanAttribute } from '@bynary/angular-composables/attribute';
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

    readonly element = inject(ElementRef).nativeElement as HTMLElement;

    readonly role = useAttribute('role', { defaultValue: 'button' });
    readonly type = useAttribute('type', { defaultValue: 'button' });
    readonly disabled = useBooleanAttribute('disabled');

    readonly loading = useModifier('loading', { applyInitially: false });

    readonly appearance = useModifierGroup('solid');
    readonly color = useModifierGroup(undefined, { prefix: 'color' });

    @Output()
    readonly active = useActivate({ click: true, keydown: [ 'Enter' ] });

    constructor() {
        bindAttribute('tabindex', computed(() => this.disabled() ? '-1' : '0'));
    }

}
