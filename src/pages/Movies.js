import { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Col, Row } from "reactstrap";
import { useHistory, Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

import SearchBar from '../Components/SearchBar';
import Loader from '../Components/Loader';
import MoviePagination from "../Components/Pagination";
import { callApi } from '../store/middleware/api';
import { basePosterUrl } from '../store/url';

import homeIcon from "../assets/icons/home.svg"
import defaultMovie from "../assets/icons/default-movie.jpg"

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const history = useHistory();

  const fetchMovies = async (page) => {
    setLoading(true);
    let url = (!isEmpty(searchText)) ? `search/movie?query=${searchText}&include_adult=false&page=${page}` : `movie/upcoming?language=en-US&page=${page}`

    await callApi(url, 'GET', null, null)
      .then(response => {
        setPage(response.page)
        setTotalPages(response.total_pages);
        setMovies(response.results);
        setLoading(false);
      })
      .catch(err => {
        setError(`Server Error : ${err}`);
      });
  };

  useEffect(() => {
    fetchMovies(1);
  }, [searchText]);

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const onClickViewMovie = ({ id }) => {
    history.push(`/${id}`);
  };

  return (
    <>
      <Navbar expand="lg" variant="dark" className="shadow bg-white">
        <SearchBar setSearchText={setSearchText} />
        <Nav>
          <Link to="/" className="home-icon">
            <img src={homeIcon} alt="home" height={'28px'} />
          </Link>
        </Nav>
      </Navbar>

      {error && <p>{error}</p>}
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '100vh' }}
        >
          <Loader />
        </div>
      ) :
        Object.keys(movies).length > 0 ?
          (<>
            <Row className="d-flex flex-wrap justify-content-start m-0">
              {movies.map((movie) => {
                const { title = '', id = '', vote_average = '', overview = '', poster_path = '' } = movie;
                return (
                  <Col sm={6} xs={6} md={2} >
                    <div key={id} className="card shadow bg-white rounded mt-3" onClick={() => onClickViewMovie(movie)}>
                      <img src={poster_path ? `${basePosterUrl}${poster_path}` : defaultMovie} alt="Movie Poster"></img>
                      <div className='p-2 mt-2'>
                        <div className='card-title-rating'>
                          <h5 className="title">{title}</h5>
                          <p className='rating'>⭐ {vote_average && vote_average}</p>
                        </div>
                        <p className="desc">{overview}</p>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
            <MoviePagination
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            /></>
          ) : <h1 style={{ textAlign: 'center' }}>No results found</h1>
      }
    </>
  );
}

export default Movies;
