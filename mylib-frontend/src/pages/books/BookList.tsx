import React, { useCallback, useEffect, useState } from "react";
import BookRow from "./BookRow";
import SearchBook from "../../components/books/SearchBook";
import { deleteBook, getBooks } from "../../services/api";
import { Book } from "../../services/types";
import { useNavigate } from "react-router-dom";

const BooksList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [keyword, setKeyword] = useState<string>("");

    const fetchBooks = useCallback(async () => {
        try {
            const response = await getBooks(keyword);
            const data = await response.data;
            setBooks(data);
        }
        catch (error) {
            console.error('Error fetching books:', error);
        }
    }, [keyword]);

    const handleDelete = async (id: number | null) => {
        try {
            await deleteBook(id);
            await fetchBooks();
            alert("Book deleted successfully!");
        } catch (error) {
            console.error("Failed to delete book:", error);
            alert("Failed to delete book.");
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        console.log("effect execute")
        console.log(keyword);
        fetchBooks();
    }, [keyword, fetchBooks]);

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <div className="section-header">
                        <h1 className="text-primary">Book List</h1>
                        <div className="section-header-breadcrumb">
                            <div className="breadcrumb-item">Books List</div>
                            <div className="breadcrumb-item"><a type="button" className="text-primary" onClick={() => navigate('/books')}>Books</a></div>
                        </div>
                    </div>
                    <div className="section-body">
                        <div className="row mt-1">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <a type="button" onClick={() => navigate('/books/create')} className="btn btn-primary">Add New</a>
                                    </div>
                                    <div className="card-body">
                                        <div className="float-right">
                                            <SearchBook keyword={keyword} setKeyword={setKeyword} />
                                        </div>
                                        <div className="clearfix mb-3"></div>
                                        <div id="bookTableList">
                                            <div className="table-responsive">
                                                <table className="table-striped table" style={{ width: "170%" }}>
                                                    <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Title</th>
                                                            <th>Category</th>
                                                            <th>Publisher</th>
                                                            <th>ISBN</th>
                                                            <th>Author</th>
                                                            <th>Year</th>
                                                            <th>price</th>
                                                            <th>Desc</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="bookList">
                                                        <BookRow books={books} onDelete={handleDelete} />
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="float-right" id="pagination">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default BooksList;