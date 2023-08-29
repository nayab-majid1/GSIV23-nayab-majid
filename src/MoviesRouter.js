import { Route, Switch } from 'react-router-dom';

import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';

function MoviesRouter() {
    return (
        <Switch>
            <Route exact path="/">
                <Movies />
            </Route>
            <Route path="/:movieId">
                <MovieDetails />
            </Route>
        </Switch>
    );
}

export default MoviesRouter;
