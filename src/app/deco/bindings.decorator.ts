import { FormControl, FormGroup, FormBuilder, Validator } from '@angular/forms';

function push(target, key, mapTo) {
	target['_list_'].push({ key, mapTo });
}

function BindControl(mapTo = null) {
	return function (target, key) {
		if ('_list_' in target) {
			push(target, key, mapTo);
		} else {
			target['_list_'] = [];
			push(target, key, mapTo);

			// form initialization
			Reflect.defineProperty(target, 'initForm', {
				value: function () {
					const self = this;
					this['_list_'].forEach((item) => {
						const control = self[item.key] ? self[item.key] : new FormControl();
						if (control instanceof FormGroup || control instanceof FormControl) {
							this.addControl(item.key, control);
						} else {
							this[item.key] = control;
						}
					});
				}
			});

			// set form values
			Reflect.defineProperty(target, 'set', {
				value: function (json) {
					const self = this;
					this['_list_'].forEach((item) => {
						if (item.mapTo) {
							if ('getJson' in this[item.key]) {
								this[item.key].set(json[item.mapTo]);
							} else {
								this.patchValue(json);
							}
						} else {
							if ('getJson' in this[item.key]) {
								this[item.key].set(json[item.key]);
							} else {
								this.patchValue(json);
							}
						}
					});

					return this;
				}
			});

			// get form values
			Reflect.defineProperty(target, 'getJson', {
				value: function () {
					const self = this;
					const json = {};
					this['_list_']
						.forEach((item) => {
							if (item.mapTo) {
								if (this.get(item.mapTo) instanceof FormGroup) {
									json[item.mapTo] = this.get(item.key) ? this.get(item.key).value : null;
								} else if ('getJson' in this[item.key]) {
									json[item.mapTo] = this[item.key] ? this[item.key].getJson() : null;
								}
							} else {
								if ('getJson' in this[item.key]) {
									json[item.key] = this[item.key] ? this[item.key].getJson() : null;
								} else {
									json[item.key] = this.get(item.key) ? this.get(item.key).value : null;
								}
							}
						});
					return json;
				}
			});
		}
	};
}

function BindProperty(mapTo = null) {
	return function (target, key) {
		if ('_list_' in target) {
			push(target, key, mapTo);
		} else {
			target['_list_'] = [];
			push(target, key, mapTo);

			// get form values
			Reflect.defineProperty(target, 'set', {
				value: function (json) {
					const self = this;
					this['_list_'].forEach((item) => {
						if (typeof self[item.key] === 'object') {
							self[item.key].set(item.mapTo in json ? json[item.mapTo] : json[item.key]);
						} else if (json) {
							self[item.key] = item.mapTo in json ? json[item.mapTo] : json[item.key];
						}
					});
					return this;
				}
			});

			// get form values
			Reflect.defineProperty(target, 'getJson', {
				value: function () {
					const self = this;
					const json = {};
					this['_list_'].map((item) => {
						if (item.mapTo) {
							json[item.mapTo] = typeof self[item.key] === 'object' ? self[item.key].getJson() : self[item.key];
						} else {
							json[item.key] = typeof self[item.key] === 'object' ? self[item.key].getJson() : self[item.key];
						}
					});
					return json;
				}
			});
		}
	};
}


export {
	BindControl,
	BindProperty,
};
