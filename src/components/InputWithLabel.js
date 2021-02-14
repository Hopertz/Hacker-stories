import React from 'react'; 

const InputWithLabel = ({id,type,children, value, onInputChange}) =>
    <div>
       <label htmlFor = {id} className = 'label'> {children} : </label>
       &nbsp;

       <input  
           id = {id} 
           type={type} 
           value={value} 
           onChange = {onInputChange} 
           className = 'input'
       /> 
       <p>Searching for <strong>{value}</strong></p>            
    </div>

export default InputWithLabel;