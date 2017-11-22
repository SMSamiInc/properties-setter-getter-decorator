import { FormControl, FormGroup, FormBuilder, Validator } from '@angular/forms';
import { Injectable } from '@angular/core';
import { IBindModel, IBindForm } from '../deco/bindings.interface';
import { BindProperty } from '../deco/bindings.decorator';

class Coordinates implements IBindModel {
	set: (any: any) => any;
	getJson: () => any;

	@BindProperty()
	x: number;
	@BindProperty()
	y: number;

}
class Address implements IBindModel {

	set: (any: any) => any;
	getJson: () => any;

	@BindProperty()
	houseNumber: number;
	@BindProperty()
	street: string;
	@BindProperty()
	city: string;
	@BindProperty()
	coordinates: Coordinates;
}

@Injectable()
export class ModelService implements IBindModel {

	set: (any: any) => any;
	getJson: () => any;

	@BindProperty()
	username: string;
	@BindProperty()
	password: string;
	@BindProperty()
	address: Address;
	@BindProperty()
	id: number;

	constructor() {
		this.set({
			username: 'salam',
			password: '124',
			id: 342,
			address: new Address().set({
				houseNumber: 124,
				street: 'street 1',
				coordinates: new Coordinates().set({
					x: 1343123213,
					y: 234324324,
				})
			})
		});
	}
}

