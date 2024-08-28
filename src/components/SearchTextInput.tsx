import React, { useState } from 'react';

interface SearchTextInputProps {
    onSearch: (searchText: string) => void;
}

const SearchTextInput: React.FC<SearchTextInputProps> = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch(searchText);
        }
    };

    return (
        <div className="flex items-center">
            <input
                className="border border-gray-300 rounded-lg p-2 w-80"
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
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
        </div>
    );
};

export default SearchTextInput;
