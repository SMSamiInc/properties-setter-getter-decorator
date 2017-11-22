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
