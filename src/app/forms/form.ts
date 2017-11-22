import { FormControl, FormGroup, FormBuilder, Validator } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms/src/validators';
import { FormProperty, IFormFunctions } from '../deco/form-property.decorator';


@Injectable()
export class FormService extends FormGroup implements IFormFunctions {

	initForm: () => any;
	setFormValues: (any: any) => any;
	getFormValues: () => any;

	@FormProperty('n')
	name: FormControl = new FormControl('mkashif');

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

	}

	onSubmit = () => {
		this.setFormValues({
			id: 2,
			n: 'My name is khan',
			fg: {
				email: 'salam',
			}
		});
		console.log(this.getFormValues());
	}

}
