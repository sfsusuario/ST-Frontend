import React from 'react';
import { useDispatch } from 'react-redux';
import EditableInputProps, { EditableInputType } from '../domain/props/EditableInputsProps';
import { updateElementProps } from '../redux/reducers';

/**
 * Editable input component
 * @returns 
 */
const EditableInput = (props: EditableInputProps<any>) => {
    const defaultValue = props.value ?? props.item[props.fieldName];
    const handleChange = (e:any) => {
        const value = e.target.value;
        props.onChange({
            value,
            item: props.item,
            fieldName: props.fieldName
        });
    }

    if(!props.active) {
        return (
            <>
                {props.label ?? defaultValue}
            </>
        );
    }
    
    return (
        <>
            {props.input == EditableInputType.select && 
                <select 
                    name={props.fieldName} 
                    onChange={ e => handleChange(e)} 
                    defaultValue={defaultValue}
                    >
                    {Object.keys(props.options).map( (key: any) =>
                        <option key={key} value={key}>{props.options[key]}</option>    
                    )}
                </select>
            }
            {props.input == EditableInputType.input && 
                <input 
                    type={props.type}
                    name={props.fieldName} 
                    onChange={ e => handleChange(e)} 
                    defaultValue={defaultValue}
                    />
            }
        </>
    );
}

export default EditableInput;
