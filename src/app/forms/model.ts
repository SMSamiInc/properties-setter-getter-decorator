import { FormControl, FormGroup, FormBuilder, Validator } from '@angular/forms';
import { Injectable } from '@angular/core';
import { IModelFunctions, ModelProperty } from '../deco/model-property.decorator';

@Injectable()
export class User implements IModelFunctions {
	setModelValues: (any: any) => any;
	getModelValues: () => any;

	@ModelProperty('user_name')
	name: string;
	@ModelProperty()
	password: string;
	@ModelProperty()
	email: string;

	@ModelProperty()
	street: string;
	@ModelProperty()
	city: string;
	@ModelProperty('country_code')
	country: string;

	constructor() {
		this.setModelValues({
			user_name: 'mkashif',
			country_code: 'pakistan',
			city: 'nowshera',
		});
	}



}
