import { FormControl, FormGroup, FormBuilder, Validator } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms/src/validators';
import { IBindModel, IBindForm, BindControl, BindProperty } from 'ng-property-binding';

class Coordinates implements IBindModel {
	set: (any: any) => any;
	getJson: () => any;

	@BindProperty()
	x: number;
	@BindProperty()
	y: number;

}

class Address implements IBindForm {
	initForm: () => void;
	set: (any: any) => any;
	getJson: () => any;

	@BindControl()
	houseNumber: FormControl;
	@BindControl()
	street: FormControl;
	@BindControl()
	city: FormControl;
	@BindControl()
	coordinates: Coordinates;

}

@Injectable()
export class FormService extends FormGroup implements IBindForm {
	initForm: () => void;
	set: (any: any) => any;
	getJson: () => any;

	@BindControl()
	username: FormControl = new FormControl('SALAM');
	@BindControl()
	password: FormControl = new FormControl('12123232');
	@BindControl()
	address: FormGroup = new FormGroup({
		houseNumber: new FormControl('1243'),
		street: new FormControl('street 1'),
		city: new FormControl('nowshera'),
	});

	@BindControl('co')
	coord: Coordinates = new Coordinates().set({ x: 123123, y: 1231231 });

	constructor() {
		super({});
		this.initForm();
		this.set({
			username: 'new user',
			password: 'new password',
			address: {
				houseNumber: 'new house'
			},
			co: {
				x: 3,
				y: 4
			}
		})

	}

	onSubmit = () => {
		console.log(this.getJson());
	}

}
