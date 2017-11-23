import { Component } from '@angular/core';
import { FormService } from './forms/form';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [FormService],
})
export class AppComponent {


	constructor(
		private form: FormService,
	) {
	}

}
