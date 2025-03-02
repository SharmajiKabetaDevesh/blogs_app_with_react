import React, { useId } from 'react';

const Input = React.forwardRef(({ 
    label = "", 
    type = "text", 
    placeholder = "", 
    className = "", 
    ...props 
}, ref) => {
    const id = useId();
    
    return (
        <div className="w-full">
            {label && (
                <label className="inline-block mb-2 text-gray-700 font-semibold" htmlFor={id}>
                    {label}
                </label>
            )}
            <input 
                type={type} 
                id={id} 
                ref={ref} 
                placeholder={placeholder} 
                className={`
                    w-full px-4 py-2 rounded-lg 
                    border border-gray-300 bg-gray-50 
                    focus:ring-2 focus:ring-blue-400 focus:outline-none 
                    transition-all duration-300 ease-in-out
                    shadow-sm hover:shadow-md
                    ${className}
                `} 
                {...props} 
            />
        </div>
    );
});

export default Input;
