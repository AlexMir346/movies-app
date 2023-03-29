import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../spinner/Spinner';
import Movie from '../movie/Movie';
import Pagination from '../pagination/Pagination';
import { getMovies } from './movieSlice';

const MovieList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesItems = useSelector((state) => state.movies.movies);
  const loading = useSelector((state) => state.movies.isLoading);
  const totalPages = useSelector((state) => state.movies.totalPages);
  const dispatch = useDispatch();

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  useEffect(() => {
    dispatch(getMovies(currentPage));
  }, [currentPage, dispatch]);

  return (
    <>
      <Pagination
        goToFirstPage={goToFirstPage}
        goToLastPage={goToLastPage}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
      <div className="movie-container">
        {loading ? (
          <Spinner />
        ) : (
          moviesItems.map(({ id, poster_path, title, vote_average, overview }) => (
            <Movie
              key={id}
              id={id}
              poster_path={poster_path}
              title={title}
              vote_average={vote_average}
              overview={overview}
            />
          ))
        )}
      </div>
    </>
  );
};

export default MovieList;
