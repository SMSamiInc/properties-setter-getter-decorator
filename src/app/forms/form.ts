import { FormControl, FormGroup, FormBuilder, Validators, AsyncValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';
import { IFormFunctions, FormProperty } from '../deco/form-property.decorator';
import { Observable } from 'rxjs/Observable';
import { Subject, } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AbstractControl } from '@angular/forms/src/model';
import { ValidationErrors, Validator } from '@angular/forms/src/directives/validators';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { User } from './model';
import { UserService } from './service';


@Injectable()
export class FormService extends FormGroup implements IFormFunctions {

	initForm: (validatorService: any) => any;
	setFormValues: (any: any) => any;
	getFormValues: () => any;
	setFormErrors: (any) => any;
	clearFormErrors: () => any;
	setFormAsyncValidators: (validatorService: any) => any;

	@FormProperty('user_name')
	name: FormControl = new FormControl('testName');

	@FormProperty()
	password: FormControl = new FormControl('welcome');

	@FormProperty()
	email: FormControl = new FormControl('test@mail.com');

	@FormProperty()
	address: FormGroup = new FormGroup({
		street: new FormControl('street 1'),
		city: new FormControl('city abc'),
		country: new FormControl('country xyz'),
	});



	constructor(
		private user: User,
		private userService: UserService,
	) {
		super({});
		this.initForm(this.userFormValidator);
	}

	userFormValidator(key) {
		return function (control: AbstractControl) {
			return this.userService.httpRequest()
				.catch((error) => {
					return Observable.of({ serverError: error.model[key] }).map(resp => resp);
				});
		};
	}

	onSubmit = () => {
		this.userService.pushErrors();
	}

}
