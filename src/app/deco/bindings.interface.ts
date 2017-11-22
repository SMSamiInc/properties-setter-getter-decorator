export interface IBindModel {
	set: (any) => any;
	getJson: () => any;
}

export interface IBindForm {
	initForm: () => void;
	set: (any) => any;
	getJson: () => any;
}
