import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { FormProperty, IFormFunctions } from 'ng-properties-setter-getter';


@Injectable()
export class FormService extends FormGroup implements IFormFunctions {

	initForm: () => any;
	setFormValues: (any: any) => any;
	getFormValues: () => any;

	@FormProperty('n')
	name: FormControl = new FormControl('', [Validators.required, Validators.minLength(5)]);

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
		console.log(this.status);
		this.setFormValues({
			id: 2,
			n: 'My name is khan',
			fg: {
				email: 'salam',
			}
		});
	}

}
