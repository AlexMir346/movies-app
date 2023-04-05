import React from 'react';

import Input from '../searchForm/SearchForm';
import { Link, useNavigate } from 'react-router-dom';

import './header.css';

export default function Header() {
  const navigate = useNavigate();

  const handleOnSubmit = (searchText) => {
    navigate(`/search?movie=${searchText}`);
  };

  return (
    <header>
      <div className="btns-group">
        <Link to="/" className="button">
          Home
        </Link>
        <Link to="/wishList" className="button">
          Wishlist
        </Link>
      </div>
      <Input onSubmit={handleOnSubmit} />
    </header>
  );
}
