import React from 'react';

import Input from '../searchForm/SearchForm';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleOnSubmit = (searchText) => {
    navigate(`/search?movie=${searchText}`);
  };

  return (
    <header>
      <div className="btns-group">
        <Link to="/" className="button">
          Main Page
        </Link>
        <Link to="/wishList" className="button">
          Wish list
        </Link>
      </div>
      <Input onSubmit={handleOnSubmit} />
    </header>
  );
}
