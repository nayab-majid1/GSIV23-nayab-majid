import { Button, Form } from 'react-bootstrap';

function SearchBar({ setSearchText }) {
    let searchItem = '';

    const searchField = (value) => {
        searchItem = value;
    };

    // TODO: Handle the search field 

    return (
        <div className="d-flex justify-content-around">
            <Form.Control
                className="m-2 rounded-3"
                type="text"
                placeholder="Search a Movie"
                onChange={(e) => searchField(e.target.value)}
            />
            <Button
                className="m-2"
                variant="primary"
                onClick={() => setSearchText(searchItem)}
            >
                Search{' '}
            </Button>

        </div>
    );
}

export default SearchBar;
