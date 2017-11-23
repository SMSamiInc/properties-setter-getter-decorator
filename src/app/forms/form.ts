import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { IFormFunctions, FormProperty } from '../deco/form-property.decorator';
// import { FormProperty, IFormFunctions } from 'ng-properties-setter-getter';


@Injectable()
export class FormService extends FormGroup implements IFormFunctions {

	initForm: () => any;
	setFormValues: (any: any) => any;
	getFormValues: () => any;
	setFormErrors: (any) => any;
	clearFormErrors: () => any;

	@FormProperty('n')
	name: FormControl = new FormControl('salam', [Validators.required, Validators.minLength(5)]);

	@FormProperty('fg')
	formGroup = new FormGroup({
		email: new FormControl('test@mail.com'),
		password: new FormControl('welcome'),
	});

	@FormProperty()
	id = 0;

	constructor() {
		super({});
		this.initForm();

		this.setFormErrors({
			n: [{
				error: 'some error'
			}],
		});

		// this.clearFormErrors();

		console.log(this.name.status);
		console.log(this.name.errors);
	}

	onSubmit = () => {

	}

}
