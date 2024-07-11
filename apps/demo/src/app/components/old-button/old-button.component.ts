import { CommonModule } from '@angular/common';
import { Attribute, Component, ElementRef, HostBinding, inject, Input, OnInit, Renderer2 } from '@angular/core';

/**
 * A demo button without using @bynary/composables
 *
 * Has the same functionality as the {@link ButtonComponent} component.
 */
@Component({
    selector: 'demo-old-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './old-button.component.html',
    styleUrls: ['../button/button.component.scss'],
    host: {
        class: 'c-button'
    }
})
export class OldButtonComponent implements OnInit {
    @HostBinding('attr.type')
    type: string;

    @Input()
    disabled: boolean;

    @Input()
    @HostBinding('class.c-button--is-loading')
    loading = false;

    private _appearance?: 'solid' | 'outline';
    private _color?: 'red' | 'green';
    private readonly _renderer = inject(Renderer2);
    private readonly _elementRef = inject(ElementRef);

    constructor(@Attribute('type') type: string, @Attribute('disabled') disabled: string) {
        this.type = type ?? 'button';
        this.disabled = disabled != null;
    }

    @HostBinding('attr.disabled')
    get disabledAttr() {
        return this.disabled ? '' : null;
    }

    @HostBinding('attr.tabindex')
    get tabIndex() {
        return this.disabled ? '-1' : '0';
    }

    @Input()
    get appearance(): 'solid' | 'outline' | undefined {
        return this._appearance;
    }

    set appearance(value: 'solid' | 'outline' | undefined) {
        if (this._appearance === value) {
            return;
        }

        this._renderer.removeClass(this._elementRef.nativeElement, `c-button--${this._appearance}`);
        this._appearance = value;
        this._renderer.addClass(this._elementRef.nativeElement, `c-button--${this._appearance}`);
    }

    @Input()
    get color(): 'red' | 'green' | undefined {
        return this._color;
    }

    set color(value: 'red' | 'green' | undefined) {
        if (this._color === value) {
            return;
        }

        if (this._color) {
            this._renderer.removeClass(this._elementRef.nativeElement, `c-button--color-${this._color}`);
        }

        this._color = value;

        if (this._color) {
            this._renderer.addClass(this._elementRef.nativeElement, `c-button--color-${this._color}`);
        }
    }

    ngOnInit() {
        this.appearance = 'solid';
    }
}
