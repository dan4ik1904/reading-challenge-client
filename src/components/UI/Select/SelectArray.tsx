import React, { Dispatch, SetStateAction, useState } from 'react';


interface CustomSelectProps {
    options: string[];
    onChange: (label: string) => void;
    placeholder?: string;
    setIsOpen: Dispatch<SetStateAction<boolean>>
    isOpen: boolean;
}

const CustomSelectArray: React.FC<CustomSelectProps> = ({ options, onChange, placeholder, isOpen, setIsOpen }) => {
    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleOptionClick = (label: string) => {
        setSelectedValue(label);
        onChange(label);
        setIsOpen(false);
    };

    return (
        <div className="custom-select form-control" style={{ position: 'relative', width: '100%' }}>
            <div 
                className="selected-option" 
                onClick={() => {setIsOpen(true)}} 
                style={{
                    padding: '2px',
                    borderRadius: '0',
                    cursor: 'pointer',
                    backgroundColor: '#fff',
                }}
            >
                {selectedValue || placeholder}
            </div>
            {isOpen && (
                <div 
                    className="options" 
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                        zIndex: 1000,
                        overflow: 'scroll',
                        maxHeight: '350px'
                    }}
                >
                    {options.map(option => (
                        <div 
                            key={option} 
                            className="option" 
                            onClick={() => handleOptionClick(option)} 
                            style={{
                                padding: '10px',
                                cursor: 'pointer',
                                // '&:hover': { backgroundColor: '#f0f0f0' }
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelectArray;
