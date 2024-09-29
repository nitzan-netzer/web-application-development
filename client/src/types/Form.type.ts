export type FormState = {
	message: string;
	errors: Record<string, string>[] | undefined;
	fieldValues: Record<string, string>[];
};

export type FormInput = {
	name: string;
	label: string;
	type: string;
	placeholder?: string | undefined;
	required?: boolean | undefined;
	options?: string[] | undefined;
	isMultiSelect?: boolean | undefined;
	accept?: string | undefined;
	disabled?: boolean | undefined;
	defaultValue?: any | undefined;
	props?: any;
};

export interface Form {
	name: string;
	title: string;
	schema?: any;
	inputs: FormInput[];
	onSubmit?: (data: any) => any | void;
	serverAction: (prevState: any, form: FormData) => Promise<any | void>;
	className?: string;
	defaultValues?: Record<string, string>;
}

export default Form;