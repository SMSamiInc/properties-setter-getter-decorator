import { Component } from '@angular/core';
import { ModelService } from './forms/model';
import { FormService } from './forms/form';
import { ModelProperty, IModelFunctions } from './deco/model-property.decorator';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [ModelService, FormService],
})
export class AppComponent {


	constructor(
		private form: FormService,
	) {
	}

}

class Position implements IModelFunctions {
	setModelValues: (any: any) => any;
	getModelValues: () => any;

	@ModelProperty('x')
	X = 1;
	@ModelProperty()
	Y = 2;

	z = 0;
}

class Address implements IModelFunctions {
	setModelValues: (any: any) => any;
	getModelValues: () => any;

	@ModelProperty()
	city: string;
	@ModelProperty()
	street: string;
	@ModelProperty('hn')
	house: number;

	@ModelProperty('raw2')
	raw2 = {
		a: 100,
		b: 100,
	};

}

class User implements IModelFunctions {

	setModelValues: (any: any) => any;
	getModelValues: () => any;

	@ModelProperty('Name')
	name = 'mkashif';

	@ModelProperty()
	test = {
		a: 2,
		b: 'some string',
	};

	@ModelProperty()
	pos = new Position();


}

const t = new User();
t.setModelValues({
	name: 'salam',
	pos: {
		x: 222,
	},
});

console.log(t.getModelValues());
