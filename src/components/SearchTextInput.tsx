import React, { useState } from 'react';

interface SearchTextInputProps {
    onSearch: (searchText: string) => void;
    description?: string;
    options: string[];
    isSideBar?: boolean;
}

const SearchTextInput: React.FC<SearchTextInputProps> = ({ onSearch, description, options, isSideBar }) => {
    const [searchText, setSearchText] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);

        if (value) {
            const filtered = options.filter(option =>
                option.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOptions(filtered);
            setShowDropdown(true);
            setHighlightedIndex(-1); // Reset highlighting when typing
        } else {
            setShowDropdown(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case 'ArrowDown':
                // Navigate down in the dropdown list
                setHighlightedIndex(prevIndex =>
                    prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
                );
                break;
            case 'ArrowUp':
                // Navigate up in the dropdown list
                setHighlightedIndex(prevIndex =>
                    prevIndex > 0 ? prevIndex - 1 : prevIndex
                );
                break;
            case 'Tab':
                // Select the current highlighted option
                if (highlightedIndex >= 0 && showDropdown) {
                    event.preventDefault(); // Prevent the default tabbing behavior
                    selectOption(filteredOptions[highlightedIndex]);
                }
                break;
            case 'Enter':
                if (highlightedIndex >= 0) {
                    // Select the current highlighted option
                    selectOption(filteredOptions[highlightedIndex]);
                } else {
                    onSearch(searchText); // Submit the search if no option is highlighted
                }
                setShowDropdown(false);
                break;
            case 'Escape':
                // Close the dropdown
                setShowDropdown(false);
                break;
            default:
                break;
        }
    };

    const selectOption = (option: string) => {
        setSearchText(option);
        onSearch(option);
        setShowDropdown(false);
    };

    const handleOptionClick = (option: string) => {
        selectOption(option);
    };

    return (
        <div className={`flex items-center  gap-4  ${isSideBar === true ? '' : 'h-screen flex-col justify-center'}`}>
            {description && <p>{description}</p>}
            <div className="relative">
                <input
                    className="border border-gray-300 rounded-lg p-2 w-80 dark:bg-opacity-20 dark:bg-black"
                    type="text"
                    placeholder="eg. Australia"
                    value={searchText}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400 absolute right-2 top-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-5.2-5.2"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>

                {showDropdown && (
                    <ul className="absolute z-[500] bg-white dark:bg-black border border-gray-300 rounded-lg w-80 mt-1 max-h-60 overflow-y-auto z-10">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleOptionClick(option)}
                                    className={`p - 2 cursor - pointer ${index === highlightedIndex ? 'bg-gray-200 dark:bg-gray-600' : ''
                                        } `}

                                >
                                    {option}
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-gray-500">No options found</li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchTextInput;
