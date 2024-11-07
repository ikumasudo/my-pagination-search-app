// app/search/SearchComponent.tsx

'use client';

import { useState } from 'react';

interface SearchProps {
  onSearch: (search: string) => void;
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

const SearchComponent: React.FC<SearchProps> = ({ onSearch, onPageChange, currentPage, totalPages }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    onSearch(searchInput);
  };

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="検索..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch}>検索</button>
      <div>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          前へ
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          次へ
        </button>
      </div>
    </div>
  );
};

export default SearchComponent;
