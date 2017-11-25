import { Component } from '@angular/core';
import { FormService } from './forms/form';

class Organization {
	private organization_id: number;

	constructor() {
		this.organization_id = 10;
	}
	public get id() {
		return this.organization_id;
	}
}

class Member extends Organization {

	public memberId: number;

	constructor() {
		super();
	}

}


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

	change = () => {
		console.log(this.form.name.valid);
		console.log(this.form.name.errors);
	}


}
