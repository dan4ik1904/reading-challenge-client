import React, { useState } from 'react';

interface Option {
    value: number;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    onChange: (value: number, label: string) => void;
    placeholder?: string;
    onClick?: () => void
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onChange, placeholder, onClick }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleOptionClick = (value: number, label: string) => {
        setSelectedValue(label);
        onChange(value, label);
        setIsOpen(false);
    };

    return (
        <div onClick={onClick} className="custom-select form-control" style={{ position: 'relative', width: '100%' }}>
            <div 
                className="selected-option" 
                onClick={() => setIsOpen(!isOpen)} 
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
                            key={option.value} 
                            className="option" 
                            onClick={() => handleOptionClick(option.value, option.label)} 
                            style={{
                                padding: '10px',
                                cursor: 'pointer',
                                // '&:hover': { backgroundColor: '#f0f0f0' }
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
