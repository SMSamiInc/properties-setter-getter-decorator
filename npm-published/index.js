// import { FormProperty, IModelFunctions } from './src/form-property.decorator';
// import { ModelProperty, IModelFunctions } from './src/model-property.decorator';


// export {
// 	FormProperty,
// 	IModelFunctions,
// 	ModelProperty,
// 	IModelFunctions,
// }

define(["require", "exports", "./src/form-property.decorator", "./src/model-property.decorator"], function (require, exports, form_property_decorator_1, model_property_decorator_1) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.FormProperty = form_property_decorator_1.FormProperty;
	exports.IModelFunctions = form_property_decorator_1.IModelFunctions;
	exports.ModelProperty = model_property_decorator_1.ModelProperty;
});
