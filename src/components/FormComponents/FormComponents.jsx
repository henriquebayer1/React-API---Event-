import React from 'react';
import "./FormComponents.css"

export const InputForm = ({
    type,
    id,
    value,
    required,
    name,
    placeholder,
    onChange,
    addClass = ""
}) => {


    return (

        <input type={type}
        id={id}
        name={name}
        value={value}
        required={required ? "required" : ""}
        placeholder={placeholder}
        onChange={onChange}
        className={` input-component  ${addClass}`}
        autoComplete="off"
        />
    )
};

export const LabelForm = ({
htmlfor, 
labeltext
}) => { 
return (

<label 
htmlFor={htmlfor}
>
    {labeltext}

</label>

)};

export const ButtonForm = ({
    id,
    name,
    textButton,
    type,
    manipulationFunction,
    addClass = ""
}) => {
return(

<button
id={id}
name={name}
type={type}
onClick={manipulationFunction}
className={`button-component ${addClass}`}
>
{textButton}

</button>

)}


export const SelectForm = ({
    selectValue,
    required,
    id,
    name,
    options,
    manipulationFunction,
    addClass = "",
    defaultValue = ""
}) => {
    return (

<select 
name={name} 
id={id}
required={required}
onChange={manipulationFunction}
value={defaultValue}
className={`input-component ${addClass}`}
>
<option value="">{selectValue}</option>
{options.map((o) => {

    
    return (
        <option key={Math.random()} value={o.value}>{o.text}</option>
    )
})}

</select>


    )


}