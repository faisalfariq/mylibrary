import React, { useCallback, useEffect, useState } from "react";
import { editBook, updateBook } from "../../services/api";
import { Book } from "../../services/types";
import { useNavigate, useParams } from "react-router-dom";

const EditBook: React.FC = () => {
    const [book, setBook] = useState<Partial<Book>>({});
    const { id } = useParams(); // Ambil id dari URL
    const [bookId, setBookId] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Updated New Book");

        const formData = new FormData(e.currentTarget);
        const bookData = {
            title: formData.get("title") as string,
            category: formData.get("category") as string,
            publisher: formData.get("publisher") as string,
            isbn: formData.get("isbn") as string,
            author: formData.get("author") as string,
            year: Number(formData.get("year")),
            price: Number(formData.get("price")),
            desc: formData.get("desc") as string
        };
        
        try {
            await updateBook(bookId, bookData);
            console.log("Update a Book:", bookData);
            navigate(`/books/${bookId}`)
            alert("Book Updated successfully!");
        } catch (error) {
            console.error("Failed to update book:", error);
            alert("Failed to update book.");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBook((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const fetchBooks =  useCallback(async () => {
        try {
            const response = await editBook(Number(id));
            const data = await response.data;
            console.log(data);
            setBook(data);
            setBookId(data.id);
        } 
        catch (error) {
            console.error('Error fetching books:', error);
        }
    }, [id]);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("effect execute")
        if (id) {
            console.log("Fetching book with ID:", id);
            fetchBooks();
        }
    }, [id, fetchBooks]);


    return (
        <div className="main-content">
            <section className="section">
                <div className="section-header">
                    <h1 className="text-primary">Edit Book</h1>
                    <div className="section-header-breadcrumb">
                        <div className="breadcrumb-item">Edit Book</div>
                        <div className="breadcrumb-item"><a type="button" className="text-primary" onClick={() => navigate('/books')}>Books</a></div>
                    </div>
                </div>
                <div className="section-body">
                    <div className="row mt-1">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="section-title text-primary m-0">Form Edit Book</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <form action="#" onSubmit={handleSubmit} id="form-edit-master-books" method="post" encType="multipart/form-data">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-body p-0">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="control-label text-primary">Title</label>
                                                                <input type="text" className="form-control" name="title"
                                                                    required={true} value={book.title || ""} onChange={handleChange} />
                                                                <div className="invalid-feedback title_error">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="control-label text-primary">Category</label>
                                                                <input type="text" className="form-control" name="category"
                                                                    required={true} value={book.category || ""} onChange={handleChange} />
                                                                <div className="invalid-feedback category_error">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="control-label text-primary">Publisher</label>
                                                                <input type="text" className="form-control" name="publisher"
                                                                    required={true} value={book.publisher || ""} onChange={handleChange} />
                                                                <div className="invalid-feedback publisher_error">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="control-label text-primary">ISBN</label>
                                                                <input type="text" className="form-control" name="isbn"
                                                                    required={true} value={book.isbn || ""} onChange={handleChange} />
                                                                <div className="invalid-feedback isbn_error">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="control-label text-primary">Author</label>
                                                                <input type="text" className="form-control" name="author"
                                                                    required={true} value={book.author || ""} onChange={handleChange} />
                                                                <div className="invalid-feedback author_error">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="control-label text-primary">Year</label>
                                                                <input type="text" className="form-control" name="year"
                                                                    required={true} value={book.year || ""} onChange={handleChange} />
                                                                <div className="invalid-feedback year_error">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="control-label text-primary">Price</label>
                                                                <input type="text" className="form-control" name="price"
                                                                    required={true} value={book.price || ""} onChange={handleChange} />
                                                                <div className="invalid-feedback price_error">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="control-label text-primary">Description</label>
                                                                <input type="text" className="form-control" name="desc"
                                                                    required={true} value={book.desc || ""} onChange={handleChange} />
                                                                <div className="invalid-feedback desc_error">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer text-right">
                                                <a type="button" onClick={() => navigate(`/books/${bookId}`)}
                                                    className="btn btn-danger mr-2"><i className="fas fa-angle-left"></i> Back</a>
                                                <button type="submit" className="btn btn-primary"><i className="fas fa-upload"></i>Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default EditBook;