import React, { useId } from 'react';

const Select = React.forwardRef(({ 
    options = [], 
    label = "", 
    className = "", 
    ...props 
}, ref) => {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label 
                    htmlFor={id} 
                    className="block text-gray-700 font-medium mb-1"
                >
                    {label}
                </label>
            )}

            <select 
                id={id} 
                className={`
                    w-full px-4 py-2.5 rounded-lg border border-gray-300 
                    focus:outline-none focus:ring-2 focus:ring-blue-400 
                    bg-white text-gray-800 shadow-sm transition-all duration-300 
                    hover:border-blue-500 ${className}
                `} 
                ref={ref}
                {...props}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;
