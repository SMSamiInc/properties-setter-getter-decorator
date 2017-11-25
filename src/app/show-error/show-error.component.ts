import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-show-error',
	templateUrl: './show-error.component.html',
	styleUrls: ['./show-error.component.css']
})
export class ShowErrorComponent implements OnInit {

	@Input()
	control: FormControl = new FormControl();

	constructor() {
	}

	ngOnInit() {
	}

}
