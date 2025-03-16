import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BooksList from "./BookList";
import CreateBook from "./CreateBook";
import EditBook from './EditBook';

const Books: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/books">
                    <Route index element={<BooksList />} />
                    <Route path="create" element={<CreateBook />} />
                    <Route path=":id/edit" element={<EditBook />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default Books;