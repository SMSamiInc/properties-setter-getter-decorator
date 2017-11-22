import { FormControl, FormGroup, FormBuilder, Validator } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms/src/validators';
import { FormProperty, IFormFunctions } from '../deco/form-property.decorator';


@Injectable()
export class FormService extends FormGroup implements IFormFunctions {

	initForm: () => any;
	setFormValues: (any: any) => any;
	getFormValues: () => any;

	@FormProperty()
	name: FormControl = new FormControl('mkashif');

	constructor() {
		super({});
		this.initForm();

	}

	onSubmit = () => {
		console.log(this.getFormValues());
	}

}
