import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVoteClass } from '../../utils/setVoteClass';

import { removeFromWishList } from '../movieList/movieSlice';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const IMG_API = 'https://image.tmdb.org/t/p/w1280';

export default function WishMovieList() {
  const addedMovies = useSelector((state) => state.movies.wishList);
  const [isHovered, setIsHovered] = useState(addedMovies.map(() => false));
  const dispatch = useDispatch();

  const onRemoveMovie = (id) => {
    dispatch(removeFromWishList(id));
  };

  const handleMouseEnter = (index) => {
    setIsHovered((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };
  const handleMouseLeave = (index) => {
    setIsHovered((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  const addMessage =
    addedMovies.length > 1 || addedMovies.length === 0
      ? `Added ${addedMovies.length} movies`
      : `Added ${addedMovies.length} movie`;

  return (
    <>
      <div className="movie-results">
        <h1 className="movies-quantity_wishlist">{addMessage}</h1>
      </div>

      <div className="movie-container">
        {addedMovies.map((movie, index) => (
          <div
            key={movie.id}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            className="movie">
            {isHovered[index] && (
              <DeleteForeverOutlinedIcon
                className="deleteIcon"
                onClick={() => onRemoveMovie(movie.id)}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  color: 'rgb(2, 250, 250)',
                }}
              />
            )}
            <img
              src={
                movie.poster_path
                  ? IMG_API + movie.poster_path
                  : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2059&q=80'
              }
              alt={movie.title}
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <span className={`tag ${setVoteClass(movie.vote_average)}`}>
                {movie.vote_average}
              </span>
            </div>
            <div className="movie-overview">
              <h2>Overview:</h2>
              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
