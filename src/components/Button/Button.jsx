import React from 'react';

const Button = ({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    hoverColor = "hover:bg-blue-700",
    activeColor = "active:bg-blue-800",
    className = '',
    ...props
}) => {
    return (
        <button
            type={type}
            className={`
                px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 ease-in-out
                ${bgColor} ${textColor} ${hoverColor} ${activeColor} 
                shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400
                disabled:opacity-50 disabled:cursor-not-allowed 
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
