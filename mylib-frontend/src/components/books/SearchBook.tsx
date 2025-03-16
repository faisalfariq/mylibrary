import React, { useState } from "react";

interface SearchBookProps {
    keyword: string;
    setKeyword: (keyword: string) => void;
}

const SearchBook: React.FC<SearchBookProps> = ({ keyword, setKeyword }) => {
    const [tempKeyword, setTempKeyword] = useState<string>(keyword);
    return (
        <div className="input-group">
            <input type="text" className="form-control" id="keyword" name="keyword" value={tempKeyword}
                onChange={(e) => setTempKeyword(e.target.value)} placeholder="Search" />
            <div className="input-group-append" >
                <a type="button" className="btn btn-primary" onClick={() => setKeyword(tempKeyword)}>
                    <i className="fas fa-search"></i>
                </a>
            </div>
        </div>
    )
}

export default SearchBook;