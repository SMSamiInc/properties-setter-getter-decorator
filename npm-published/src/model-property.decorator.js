var __assign = (this && this.__assign) || Object.assign || function(t) {
	for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
					t[p] = s[p];
	}
	return t;
};
define(["require", "exports"], function (require, exports) {
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
	function isDecoratorObject(obj) {
			return isObjectDefined(obj) && typeof obj === 'object' && 'setModelValues' in obj;
	}
	function isRawObject(obj) {
			return isObjectDefined(obj) && typeof obj === 'object' && !('setModelValues' in obj);
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
	function defineSetModelValues(target) {
			Reflect.defineProperty(target, 'setModelValues', {
					value: function (json) {
							var self = this;
							this['_list_'].forEach(function (item) {
									if (isDecoratorObject(self[item.key])) {
											self[item.key].setModelValues(checkKeys(item.mapTo, item.key, json));
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
	function defineGetModelValues(target) {
			Reflect.defineProperty(target, 'getModelValues', {
					value: function () {
							var self = this;
							var json = {};
							this['_list_'].map(function (item) {
									if (item.mapTo) {
											if (isDecoratorObject(self[item.key])) {
													json[item.mapTo] = self[item.key].getModelValues();
											}
											else if (isRawObject(self[item.key])) {
													json[item.mapTo] = copyRawObjectValue(self[item.key]);
											}
											else {
													json[item.mapTo] = self[item.key];
											}
									}
									else if (item.key) {
											if (isDecoratorObject(self[item.key])) {
													json[item.key] = self[item.key].getModelValues();
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
	// modelProperty decorator
	function ModelProperty(mapTo) {
			if (mapTo === void 0) { mapTo = null; }
			return function (target, key) {
					if ('_list_' in target) {
							push(target, key, mapTo);
					}
					else {
							target['_list_'] = [];
							push(target, key, mapTo);
					}
					defineSetModelValues(target);
					defineGetModelValues(target);
			};
	}
	exports.ModelProperty = ModelProperty;
});
