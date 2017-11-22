function push(target, key, mapTo) {
	target['_list_'].push({ key, mapTo });
}

function checkKeys(mapTo, key, obj) {
	return mapTo in obj ? obj[mapTo] : obj[key];
}

function isDecoratorObject(obj) {
	return typeof obj === 'object' && 'setModelValues' in obj;
}

function isRawObject(obj) {
	return typeof obj === 'object' && !('setModelValues' in obj);
}

function copyRawObjectValue(source, dist) {
	if (isRawObject(dist)) {
		Object.keys(source).forEach((key, i) => {
			if (key in dist) {
				if (copyRawObjectValue(source[key], dist[key])) {
				} else {
					dist[key] = source[key];
				}
			}
		});
	} else {
		dist = source;
	}
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
				} else {
					// copyRawObjectValue(checkKeys(item.mapTo, item.key, json), checkKeys(item.mapTo, item.key, self));
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
					json[item.mapTo] = self[item.key];
				} else if (item.key) {
					json[item.key] = self[item.key];
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
