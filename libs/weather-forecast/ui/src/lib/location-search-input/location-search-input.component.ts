import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'bp-location-search-input',
	templateUrl: './location-search-input.component.html',
	styleUrls: ['./location-search-input.component.scss'],
	// encapsulation: ViewEncapsulation.ShadowDom,
	changeDetection: ChangeDetectionStrategy.OnPush  
})
export class LocationSearchInputComponent {

	get value(): string | null | undefined {
		return this.query.value;
	}

	@Input() set value(value: string | null | undefined) {
		this.query.setValue(value);
	}

	get busy(): boolean {
		return this.query.disabled;
	}

	@Input() set busy(value: boolean) {
		if (value) this.query.disable()
		else this.query.enable();
	}

	@Output() submitted = new EventEmitter<string>();

	query = new FormControl(''/*, [Validators.required]*/);

	doSubmit() {
		const value = this.query.value;
		if (value) this.submitted.emit(value);
	}
}
