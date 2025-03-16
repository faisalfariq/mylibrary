import { Book } from "../../services/types";
import { useNavigate } from "react-router-dom";
import { formatRupiah } from "../../services/convert";

interface BookRowProps {
    books: Book[];
    onDelete: (id: number | null) => void;
}

const BookRow: React.FC<BookRowProps> = ({ books, onDelete }) => {

    const navigate = useNavigate();

    if (!books) return null;

    return (
        books.map((book) => {
            return (
                <tr key={book.id}>
                    <td>{book.id}</td>
                    <td><a type="button" className="text-primary" onClick={() => navigate(`/books/${book.id}`)} >{book.title}</a>
                        <div className="table-links">
                            <a type="button" onClick={() => navigate(`/books/${book.id}`)} className="text-primary">
                                <i className="fas fa-eye"></i>
                                View
                            </a>
                            <div className="bullet"></div>
                            <a type="button" onClick={() => navigate(`/books/${book.id || null}/edit`)} className="text-warning">
                                <i className="fas fa-edit"></i>
                                Edit
                            </a>
                            <div className="bullet">
                            </div><a type="button" onClick={() => onDelete(book?.id ?? null)} className="text-danger btn-delete-product-tag">
                                <i className="fas fa-trash"></i>
                                Trash
                            </a>
                        </div>
                    </td>
                    <td>{book.category}</td>
                    <td>{book.publisher}</td>
                    <td>{book.isbn}</td>
                    <td>{book.author}</td>
                    <td>{book.year}</td>
                    <td>{formatRupiah(book.price || null)}</td>
                    <td>{book.desc}</td>
                </tr>
            );
        })
    )
}

export default BookRow;