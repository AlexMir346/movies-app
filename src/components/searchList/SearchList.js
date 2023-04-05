import React, { useEffect, useState } from 'react';
import Movie from '../movie/Movie';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getSearchMovies } from '../movieList/movieSlice';
import Spinner from '../spinner/Spinner';
import Pagination from '../pagination/Pagination';

export default function SearchList() {
  const { searchedMovies, searchedTotalPages, isLoading, searchStatus } = useSelector(
    (state) => state.movies,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const { search } = useLocation();
  const dispatch = useDispatch();

  const params = new URLSearchParams(search);
  const searchText = params.get('movie');

  useEffect(() => {
    setCurrentPage(1);
    if (searchText !== null) {
      dispatch(getSearchMovies({ searchText, page: 1 }));
    }
  }, [dispatch, searchText]);

  const goToNextPage = () => {
    if (currentPage < searchedTotalPages) {
      dispatch(getSearchMovies({ searchText, page: currentPage + 1 }));
      setCurrentPage(currentPage + 1);
    }
  };

  const goToLastPage = () => {
    if (currentPage < searchedTotalPages) {
      dispatch(getSearchMovies({ searchText, page: searchedTotalPages }));
      setCurrentPage(searchedTotalPages);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      dispatch(getSearchMovies({ searchText, page: currentPage - 1 }));
      setCurrentPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    if (currentPage > 1) {
      dispatch(getSearchMovies({ searchText, page: 1 }));
      setCurrentPage(1);
    }
  };

  if (searchStatus === 'error') {
    return <div className="movie-container">There was an error fetching the movies</div>;
  }

  return (
    <>
      <Pagination
        goToFirstPage={goToFirstPage}
        goToLastPage={goToLastPage}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        totalPages={searchedTotalPages}
        currentPage={currentPage}
      />
      <div className="movie-results">
        <h1 className="movies-quantity">{`Results for the movie: ${searchText}`}</h1>
      </div>
      <div className="movie-container">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
}
