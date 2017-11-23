var __assign = (this && this.__assign) || Object.assign || function(t) {
	for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
					t[p] = s[p];
	}
	return t;
};
define(["require", "exports", "@angular/forms"], function (require, exports, forms_1) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function push(target, key, mapTo) {
			target['_list_'].push({ key: key, mapTo: mapTo });
	}
	function isObjectDefined(obj) {
			return (obj !== undefined && obj !== null);
	}
	function checkKeys(mapTo, key, obj) {
			if (isObjectDefined(obj) && mapTo in obj) {
					return obj[mapTo];
			}
			else if (isObjectDefined(obj)) {
					return obj[key];
			}
			else {
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
			var obj = {};
			if (src) {
					var recurseObject_1 = function (source, dist) {
							Object.keys(source).forEach(function (key) {
									if (isRawObject(source[key])) {
											recurseObject_1(source[key], dist[key]);
									}
									else {
											dist[key] = source[key];
									}
							});
					};
					recurseObject_1(src, obj);
					return obj;
			}
			return null;
	}
	function defineInitForm(target) {
			// form initialization
			Reflect.defineProperty(target, 'initForm', {
					value: function () {
							var _this = this;
							var self = this;
							this['_list_'].forEach(function (item) {
									var control = self[item.key] ? self[item.key] : new forms_1.FormControl();
									if (control instanceof forms_1.FormGroup || control instanceof forms_1.FormControl) {
											_this.addControl(item.key, control);
									}
									else {
											_this[item.key] = control;
									}
							});
					}
			});
	}
	function defineSetFormValues(target) {
			Reflect.defineProperty(target, 'setFormValues', {
					value: function (json) {
							var self = this;
							this['_list_'].forEach(function (item) {
									if (isFormObject(self[item.key])) {
											var value = checkKeys(item.mapTo, item.key, json);
											if (isObjectDefined(value)) {
													self[item.key].patchValue(value);
											}
									}
									else if (isDecoratorObject(self[item.key])) {
											self[item.key].setFormValues(checkKeys(item.mapTo, item.key, json));
									}
									else if (isRawObject(self[item.key])) {
											self[item.key] = __assign({}, self[item.key], copyRawObjectValue(checkKeys(item.mapTo, item.key, json)));
									}
									else {
											var value = checkKeys(item.mapTo, item.key, json);
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
							var _this = this;
							var self = this;
							var json = {};
							this['_list_'].map(function (item) {
									if (item.mapTo) {
											if (isFormObject(self[item.key])) {
													json[item.mapTo] = _this.get(item.key).value;
											}
											else if (isDecoratorObject(self[item.key])) {
													json[item.mapTo] = self[item.key].getFormValues();
											}
											else if (isRawObject(self[item.key])) {
													json[item.mapTo] = copyRawObjectValue(self[item.key]);
											}
											else {
													json[item.mapTo] = self[item.key];
											}
									}
									else if (item.key) {
											if (isFormObject(self[item.key])) {
													json[item.key] = _this.get(item.key).value;
											}
											else if (isDecoratorObject(self[item.key])) {
													json[item.key] = self[item.key].getFormValues();
											}
											else if (isRawObject(self[item.key])) {
													json[item.key] = copyRawObjectValue(self[item.key]);
											}
											else {
													json[item.key] = self[item.key];
											}
									}
							});
							return json;
					}
			});
	}
	// formProperty decorator
	function FormProperty(mapTo) {
			if (mapTo === void 0) { mapTo = null; }
			return function (target, key) {
					if ('_list_' in target) {
							push(target, key, mapTo);
					}
					else {
							target['_list_'] = [];
							push(target, key, mapTo);
					}
					defineInitForm(target);
					defineSetFormValues(target);
					defineGetFormValues(target);
			};
	}
	exports.FormProperty = FormProperty;
});
