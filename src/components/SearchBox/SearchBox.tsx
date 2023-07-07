import React, { useState } from "react";
import "./SearchBox.css";

const SearchBox: React.FC<{ onSearch: (data: any) => void }> = ({
  onSearch,
}) => {
  const [keyword, setKeyword] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword);
  };
  return (
    <form className="search-box-compo" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit">검색</button>
    </form>
  );
};

export default SearchBox;
