export enum EditableInputType {
    input,
    select
}

export default class EditableInputProps<T> {
    item: T; 
    input: EditableInputType;
    fieldName: string;
    type?: string = "text";
    options?: any
    onChange?: CallableFunction;
    active?: boolean = false;
    label?: string;
    value?: any;
}