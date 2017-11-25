import { AbstractControl } from '@angular/forms/src/model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';


@Injectable()
export class UserService {

	sub = new Subject();

	httpRequest = () => {
		return this.sub.asObservable();
	}

	pushErrors() {
		this.sub.error({
			model: {
				user_name: ['user not found', 'some more error'],
				country_code: ['country_code node found'],
			}
		});
	}

}
