# ng-properties-setter-getter
Helping decorators and interfaces which automates the integrations between Model and Form classes. 
# Why do I need it!
In large Angular applications we deal with lot of Model classes and Angular Forms. Every Model contains certain amout properties for which we need Forms to Add and Edit our data. So we always repeat some work like.
```
	model.setData(somejson), model.getData()
	form.setData(somejson), form.getData()
```
So we almost repeat same kind of work for every model and form. "ng-properties-setter-getter" solve this problem.

### Installation
```sh
$ npm install ng-properties-setter-getter
```

# How it works
lets look to a Model First.
```
 import { ModelProperty, IModelFunctions } from 'ng-properties-setter-getter';

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
```
Now we can use getModelValues() and setModelValues({}) functions for our UserModel class it autmatically maps data for you. You dont need to write code for it.
```
    let user = new User();
    user.setModelValues({ user_name: 'john', email: 'john@example.com' });
    http.post('someu url', user.getModelValues()) 
    
   // result:  {user_name:'john', Email:'john@example.com'}
```
It automatically set those properties which are binded in the above UserModel class and it also return the json object with value.! Now lets come to the @ModelProperty('user_name') part. As we see we use property 'username' in our class but gave 'user_name' in decorator it gives you the flexiblity of maping variables names. 
Some times naming varibles are deffrent in Backend from Frontend like some data we recieve from http response we get a property name 'user_name' but we use property name 'userName'. So @ModelProperty(mapvariableto) provides mapping variable.

Now lets look to the Form Service Class
```
    import { FormProperty, IFormFunctions } from 'ng-properties-setter-getter';



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

```
Bind property of a form class works same as for ModelClass just little modification. You need extend form class from Angular "FormGroup" second it has an extra function called "initForm".
Which allow you to use our own custom class as a FormGroup. Yes! you can use the instance of the form class directly as html form group like.

``` 
	// app.component.ts
	export class AppComponent {
		constructor(
			private form: UserFormService,
		) {}
```
```
	// app.component.html
	<form [formGroup]="form" (ngSubmit)="form.onSubmit()">
		<input formControlName="name" (change)="change()">
		<app-show-error [control]="form.name"></app-show-error>
		<br>
		<input formControlName="email">
		<app-show-error [control]="form.email"></app-show-error>
		<br>
		<input formControlName="password">
		<app-show-error [control]="form.password"></app-show-error>
		<br>
		<div formGroupName="address">
			<input formControlName="street" (change)="change()">
			<app-show-error [control]="form.get('address.street')"></app-show-error>
			<br>

			<input formControlName="city" (change)="change()">
			<app-show-error [control]="form.get('address.city')"></app-show-error>
			<br>

			<input formControlName="country" (change)="change()">
			<app-show-error [control]="form.get('address.country')"></app-show-error>
			<br>



		</div>
		<button type=" submit ">Done</button>
		{{form.value | json}}
	</form>
```
As UserFormService is extended from FormGroup so you can use every function of FormGroup as you need.
### Installation
```sh
$ npm install ng-properties-setter-getter
```

You are good to Go!

License
----

MIT

