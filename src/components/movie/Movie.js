import React, { useState } from 'react';
import { setVoteClass } from '../../utils/setVoteClass';
import { useDispatch } from 'react-redux';
import { addToWishLish } from '../movieList/movieSlice';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const IMG_URL = 'https://image.tmdb.org/t/p/w1280';
const DEFAULT_IMG_POSTER =
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2059&q=80';

export default function Movie({ id, poster_path, title, vote_average, overview }) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const onAddMovie = (id) => {
    dispatch(addToWishLish({ id }));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div key={id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="movie">
      {isHovered && (
        <AddCircleOutlineIcon
          className="addIcon"
          onClick={() => onAddMovie(id)}
          style={{ position: 'absolute', top: 20, right: 20 }}
        />
      )}
      <img src={poster_path ? IMG_URL + poster_path : DEFAULT_IMG_POSTER} alt={title} />
      <div className="movie-info">
        <h3>{title}</h3>
        <span className={`tag ${setVoteClass(vote_average)}`}>{vote_average}</span>
      </div>
      <div className="movie-overview">
        <h2>Overview:</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
}
