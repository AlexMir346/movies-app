import React, { useState } from 'react';
import { setVoteClass } from '../../utils/setVoteClass';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishLish } from '../movieList/movieSlice';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Link } from 'react-router-dom';

import { IMG_URL, DEFAULT_IMG_POSTER } from '../../utils/constants';

export default function Movie({ id, poster_path, title, vote_average }) {
  const wishList = useSelector((state) => state.movies.wishList);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const onAddMovie = (id) => {
    const movieExists = wishList.find((movie) => movie.id === id);

    if (movieExists) {
      dispatch(addToWishLish({ id }));
    } else {
      dispatch(addToWishLish({ id }));
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div
        key={id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="movie">
        {isHovered && (
          <>
            {!wishList.find((movie) => movie.id === id) ? (
              <AddCircleOutlineIcon
                className="addIcon"
                onClick={() => onAddMovie(id)}
                style={{ position: 'absolute', top: 20, right: 20, color: 'rgb(2, 250, 250)' }}
              />
            ) : (
              <BookmarkAddedIcon
                className="addIcon"
                style={{ position: 'absolute', top: 20, right: 20, color: 'rgb(27, 244, 7)' }}
              />
            )}
          </>
        )}
        <Link to={`/movie-details/${id}`} style={{ color: 'white', textDecoration: 'none' }}>
          <img src={poster_path ? IMG_URL + poster_path : DEFAULT_IMG_POSTER} alt={title} />
        </Link>
        <div className="movie-info">
          <h3>{title}</h3>
          <span className={`tag ${setVoteClass(vote_average)}`}>{vote_average}</span>
        </div>
      </div>
    </>
  );
}
