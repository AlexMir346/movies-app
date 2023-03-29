import React, { useEffect } from 'react';
import Movie from '../movie/Movie';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getSearchMovies } from '../movieList/movieSlice';
import Spinner from '../spinner/Spinner';

export default function SearchList() {
  const searchedMovies = useSelector((state) => state.movies.searchedMovies);
  const loading = useSelector((state) => state.movies.isLoading);
  const { search } = useLocation();
  const dispatch = useDispatch();

  const params = new URLSearchParams(search);
  const searchText = params.get('movie');

  useEffect(() => {
    dispatch(getSearchMovies(searchText));
  }, [dispatch, searchText]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="movies-quantity">{`Results for the movie: ${searchText}`}</h1>
          <div className="movie-container">
            {searchedMovies.map(({ id, poster_path, title, vote_average, overview }) => (
              <Movie
                key={id}
                id={id}
                poster_path={poster_path}
                title={title}
                vote_average={vote_average}
                overview={overview}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
