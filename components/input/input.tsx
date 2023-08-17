import React, { memo } from 'react';
interface InputProps
{
    type: any,
    value: any,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    name: string,
    textarea?: boolean,
    id: string
    placeholder?: string,
    big?: boolean
}



function Input( { type, value, onChange, name, textarea, id, placeholder, big } : InputProps ) {
    return (
        <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            type={ type }
            value={ value }
            onChange={ onChange }
            name={ name }
            id={ id }
            placeholder={ placeholder }
        />
    );
}

export default memo( Input );