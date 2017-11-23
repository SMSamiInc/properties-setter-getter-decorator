import { FormControl, FormGroup, FormBuilder, Validator } from '@angular/forms';

function push(target, key, mapTo) {
	target['_list_'].push({ key, mapTo });
}

function isObjectDefined(obj) {
	return (obj !== undefined && obj !== null);
}

function checkKeys(mapTo, key, obj) {
	if (isObjectDefined(obj) && mapTo in obj) {
		return obj[mapTo];
	} else if (isObjectDefined(obj)) {
		return obj[key];
	} else {
		return null;
	}
}

function isFormObject(obj) {
	return isObjectDefined(obj) && typeof obj === 'object' && 'patchValue' in obj;
}

function isDecoratorObject(obj) {
	return isObjectDefined(obj) && typeof obj === 'object' && 'setFormValues' in obj;
}

function isRawObject(obj) {
	return isObjectDefined(obj) && typeof obj === 'object' && !('setFormValues' in obj);
}

function copyRawObjectValue(src) {
	const obj = {};
	if (src) {
		const recurseObject = (source, dist) => {
			Object.keys(source).forEach((key) => {
				if (isRawObject(source[key])) {
					recurseObject(source[key], dist[key]);
				} else {
					dist[key] = source[key];
				}
			});
		};
		recurseObject(src, obj);
		return obj;
	}
	return null;
}

function defineInitForm(target) {
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

}

function defineSetFormErrors(target) {
	Reflect.defineProperty(target, 'setFormErrors', {
		value: function (json) {
			const self = this;
			this['_list_'].forEach((item) => {
				if (isFormObject(self[item.key])) {
					self[item.key].setErrors(checkKeys(item.mapTo, item.key, json));
				}
			});
		}
	});
}

function defineClearFormErrors(target) {
	Reflect.defineProperty(target, 'clearFormErrors', {
		value: function () {
			const self = this;
			this['_list_'].forEach((item) => {
				if (isFormObject(self[item.key])) {
					self[item.key].setErrors(null);
				}
			});
		}
	});
}

function defineSetFormValues(target) {
	Reflect.defineProperty(target, 'setFormValues', {
		value: function (json) {
			const self = this;
			this['_list_'].forEach((item) => {
				if (isFormObject(self[item.key])) {
					const value = checkKeys(item.mapTo, item.key, json);
					if (isObjectDefined(value)) {
						self[item.key].patchValue(value);
					}
				} else if (isDecoratorObject(self[item.key])) {
					self[item.key].setFormValues(checkKeys(item.mapTo, item.key, json));
				} else if (isRawObject(self[item.key])) {
					self[item.key] = { ...self[item.key], ...copyRawObjectValue(checkKeys(item.mapTo, item.key, json)) };
				} else {
					const value = checkKeys(item.mapTo, item.key, json);
					self[item.key] = isObjectDefined(value) ? value : self[item.key];
				}
			});
			return this;
		}
	});
}


function defineGetFormValues(target) {
	Reflect.defineProperty(target, 'getFormValues', {
		value: function () {
			const self = this;
			const json = {};
			this['_list_'].map((item) => {
				if (item.mapTo) {
					if (isFormObject(self[item.key])) {
						json[item.mapTo] = this.get(item.key).value;
					} else if (isDecoratorObject(self[item.key])) {
						json[item.mapTo] = self[item.key].getFormValues();
					} else if (isRawObject(self[item.key])) {
						json[item.mapTo] = copyRawObjectValue(self[item.key]);
					} else {
						json[item.mapTo] = self[item.key];
					}
				} else if (item.key) {
					if (isFormObject(self[item.key])) {
						json[item.key] = this.get(item.key).value;
					} else if (isDecoratorObject(self[item.key])) {
						json[item.key] = self[item.key].getFormValues();
					} else if (isRawObject(self[item.key])) {
						json[item.key] = copyRawObjectValue(self[item.key]);
					} else {
						json[item.key] = self[item.key];
					}
				}
			});
			return json;
		}
	});
}


// formProperty decorator
function FormProperty(mapTo = null) {
	return function (target, key) {
		if ('_list_' in target) {
			push(target, key, mapTo);
		} else {
			target['_list_'] = [];
			push(target, key, mapTo);
		}
		defineInitForm(target);
		defineSetFormErrors(target);
		defineClearFormErrors(target);
		defineSetFormValues(target);
		defineGetFormValues(target);
	};
}


export interface IFormFunctions {
	initForm: () => any;
	setFormValues: (any) => any;
	getFormValues: () => any;
	setFormErrors: (any) => any;
	clearFormErrors: () => any;
}

export {
	FormProperty,
};
