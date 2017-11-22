function push(target, key, mapTo) {
	target['_list_'].push({ key, mapTo });
}

function checkKeys(mapTo, key, obj) {
	return obj && (mapTo in obj ? obj[mapTo] : obj[key]);
}

function isDecoratorObject(obj) {
	return obj && typeof obj === 'object' && 'setModelValues' in obj;
}

function isRawObject(obj) {
	return obj && typeof obj === 'object' && !('setModelValues' in obj);
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

function copyDecoratorObjectValues(source, dist) {
	if (isDecoratorObject(dist)) {
		dist.setModelValues(source);
		return true;
	}
	return false;
}


function defineSetModelValues(target) {
	Reflect.defineProperty(target, 'setModelValues', {
		value: function (json) {
			const self = this;
			this['_list_'].forEach((item) => {
				if (copyDecoratorObjectValues(checkKeys(item.mapTo, item.key, json), self[item.key])) {
				} else if (isRawObject(self[item.key])) {
					self[item.key] = { ...self[item.key], ...copyRawObjectValue(checkKeys(item.mapTo, item.key, json)) };
				} else {
					self[item.key] = checkKeys(item.mapTo, item.key, json);
				}
			});
			return this;
		}
	});
}


function defineGetModelValues(target) {
	Reflect.defineProperty(target, 'getModelValues', {
		value: function () {
			const self = this;
			const json = {};
			this['_list_'].map((item) => {
				if (item.mapTo) {
				} else if (item.key) {
					if (isDecoratorObject(self[item.key])) {
						json[item.key] = self[item.key].getModelValues();
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


// modelProperty decorator
function ModelProperty(mapTo = null) {
	return function (target, key) {
		if ('_list_' in target) {
			push(target, key, mapTo);
		} else {
			target['_list_'] = [];
			push(target, key, mapTo);
		}
		defineSetModelValues(target);
		defineGetModelValues(target);
	};
}


export interface IModelFunctions {
	setModelValues: (any) => any;
	getModelValues: () => any;
}

export {
	ModelProperty,
};
