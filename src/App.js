import { BrowserRouter as Router } from 'react-router-dom';

import MoviesRouter from './MoviesRouter';

function App() {
    return (
        <Router>
            <MoviesRouter />
        </Router>
    );
}

export default App;
