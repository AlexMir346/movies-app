import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import { getMovieById } from './movieDetailsSlice';
import { addToWishLish } from '../movieList/movieSlice';

import { IMG_URL, DEFAULT_IMG_POSTER } from '../../utils/constants';
import { setVoteClass } from '../../utils/setVoteClass';

import './movieDetails.css';

export default function MoviesDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => state.movie.selectedMovie);
  const wishList = useSelector((state) => state.movies.wishList);
  const loading = useSelector((state) => state.movie.isLoading);
  const [isAdded, setIsAdded] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const onAddMovie = (id) => {
    const movieExists = wishList.find((movie) => movie.id === id);
    if (movieExists) {
      setIsAdded(true);
      setIsDisabled(true);
    } else {
      dispatch(addToWishLish({ id }));
      setIsAdded(true);
    }
  };

  useEffect(() => {
    dispatch(getMovieById(id));
  }, [dispatch, id]);

  useEffect(() => {
    const movieExists = wishList.find((movie) => movie.id === selectedMovie?.id);
    if (movieExists) {
      setIsAdded(true);
      setIsDisabled(true);
    } else {
      setIsAdded(false);
      setIsDisabled(false);
    }
  }, [wishList, selectedMovie]);

  return (
    <div className="movie-details">
      {loading ? (
        <Spinner />
      ) : (
        selectedMovie && (
          <>
            <div className="movie-details__poster">
              <img
                src={
                  selectedMovie.poster_path
                    ? IMG_URL + selectedMovie.poster_path
                    : DEFAULT_IMG_POSTER
                }
                alt={selectedMovie.title}
              />
            </div>

            <div className="movie-details__info">
              <h3 className="movie-details__title">{selectedMovie.title}</h3>
              <span className={`movie_tag  ${setVoteClass(selectedMovie.vote_average)}`}>
                Rating: {selectedMovie.vote_average}
              </span>
              <p className="movie-details__release">Release: {selectedMovie.release_date}</p>
              <p className="movie-details__revenue">Revenue: {selectedMovie.revenue} $</p>
              <p className="movie-details__runtime">Runtime: {selectedMovie.runtime} min.</p>
              <p className="movie-details__genres">
                Genres:{' '}
                {selectedMovie.genres && selectedMovie.genres.map((genre) => genre.name).join(', ')}
              </p>
              <p className="movie-details__overview">Overview: {selectedMovie.overview}</p>

              <div className="btns-group">
                {isAdded ? (
                  <button className="button" disabled>
                    Already Added
                  </button>
                ) : (
                  <button
                    className="button"
                    disabled={isDisabled}
                    onClick={() => onAddMovie(selectedMovie.id)}>
                    Add to wishlist
                  </button>
                )}
                <Link to="/" className="button">
                  Home page
                </Link>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
