import React from 'react'
import {useField} from "formik";

const Input = ({label, ...props}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name} className="col-form-label-sm m-0">{label}</label>
            <input {...field} {...props}
                   className={meta.touched && meta.error ? "form-control is-invalid" : "form-control"}/>
            {meta.touched && meta.error ? (
                <div className="invalid-feedback">{meta.error}</div>
            ) : null}
        </>
    );
};

export default Input;