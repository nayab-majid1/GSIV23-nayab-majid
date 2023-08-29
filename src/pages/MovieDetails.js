import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Card } from 'react-bootstrap';
import { Col, Row, CardTitle } from "reactstrap";

import Header from '../Components/Header';
import Loader from '../Components/Loader';

import { basePosterUrl } from '../store/url';
import { callApi } from '../store/middleware/api';
import defaultMovie from "../assets/icons/movie-icon.jpg"

function MovieDetails() {
    const { movieId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [details, setDetails] = useState({});

    useEffect(() => {
        fetchMovieDetails();
    }, []);

    function toHoursAndMinutes(totalMinutes) {
        const hours = ("0" + Math.floor(totalMinutes / 60)).slice(-2)
        const minutes = ("0" + (totalMinutes % 60)).slice(-2)
        return `${hours}:${minutes}`
    }

    const fetchMovieDetails = async () => {

        const detailsEndpoint = `/movie/${movieId}`
        const creditsEndpoint = `${detailsEndpoint}/credits`

        await callApi(detailsEndpoint, 'GET', null, null)
            .then(response => {
                let data = response;

                callApi(creditsEndpoint, 'GET', null, null)
                    .then(response => {
                        const credits = response
                        const directors = credits.crew.filter(({ job }) => job === 'Director')
                        const director = directors.length > 0 ? directors[0] : undefined
                        data.director = director !== undefined ? director.name : undefined
                        data.cast = credits.cast.map((person) => person.name)
                        setDetails(data);
                        setLoading(false);
                    })
                    .catch(err => {
                        setError(`Credit api Error : ${err}`);
                    });
            })
            .catch(err => {
                setError(`Movie Details api Error : ${err}`);
            });
    };

    return (
        <>
            <Header />
            {error && <Alert variant="danger">{error}</Alert>}
            {loading || Object.keys(details).length <= 0 ? (
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: '100vh' }}
                >
                    <Loader />
                </div>
            ) : (
                <Row key={movieId} className="shadow bg-white rounded mt-3 m-0">
                    <Col sm={3} xs={12} md={3} >
                        <Card.Body>
                            <img src={details.poster_path ? `${basePosterUrl}${details.poster_path}` : defaultMovie} alt="Movie Poster" className='p-2'></img>
                        </Card.Body>
                    </Col>

                    <Col sm={9} xs={12} md={9} >
                        <Card.Body className='p-2'>
                            <CardTitle className='mt-3 mb-4 justify-content-between'>
                                <h3 className="movie-title" style={{ float: "left" }}>{details.title}
                                    {
                                        details.vote_average > 0 &&
                                        <span className='rating'>&nbsp;&nbsp;&nbsp; ⭐ {details.vote_average}</span>
                                    }
                                </h3>
                            </CardTitle>
                            <br></br>
                            <hr></hr>
                            <Card.Text className='mt-4'>
                                {
                                    details.release_date &&
                                    <span className="year">
                                        <b className="label"> Release Date : </b>
                                        {details.release_date} |
                                    </span>
                                }
                                {
                                    details.runtime &&
                                        details.runtime > 0 ?
                                        <span className="length">
                                            <b className="label"> Length : </b>
                                            {toHoursAndMinutes(details.runtime)} |
                                        </span> : ''
                                }
                                {
                                    details.director &&
                                    <span className="director">
                                        <b className="label"> Director : </b>
                                        {details.director}
                                    </span>
                                }
                                {
                                    details.cast &&
                                    details.cast.length > 0 &&
                                    <p className="cast mt-3">
                                        <b className="label">Cast : </b>
                                        {
                                            Object.keys(details).length > 0 &&
                                            details.cast.length > 0 &&
                                            details.cast.slice(0, 10).map((name, index) =>
                                                <box key={index}>{name}, </box>)
                                        }
                                    </p>
                                }
                                {
                                    details.overview &&
                                    <p className="description mt-3">
                                        <b> Description : </b>
                                        <span>{details.overview}</span>
                                    </p>
                                }
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default MovieDetails;
