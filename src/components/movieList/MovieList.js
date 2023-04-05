import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../spinner/Spinner';
import Movie from '../movie/Movie';
import Pagination from '../pagination/Pagination';
import { getMovies } from '../movieList/movieSlice';

const MovieList = () => {
  const { movies, totalPages, isLoading, moviesStatus } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getMovies({ page: 1 }));
  }, [dispatch]);

  const goToFirstPage = () => {
    if (currentPage > 1) {
      dispatch(getMovies({ page: 1 }));
      setCurrentPage(1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      dispatch(getMovies({ page: currentPage - 1 }));
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < 500) {
      dispatch(getMovies({ page: currentPage + 1 }));
      setCurrentPage(currentPage + 1);
    }
  };

  const goToLastPage = () => {
    if (currentPage < 500) {
      dispatch(getMovies({ page: 500 }));
      setCurrentPage(500);
    }
  };

  if (moviesStatus === 'error') {
    return <div className="movie-container">There was an error fetching the movies</div>;
  }

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
        {isLoading ? (
          <Spinner />
        ) : (
          movies.map(({ id, poster_path, title, vote_average, overview }) => (
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
