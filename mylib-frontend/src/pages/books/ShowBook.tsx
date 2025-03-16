import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showBook } from "../../services/api";
import { Book } from "../../services/types";
import { formatRupiah } from "../../services/convert";

const ShowBook: React.FC = () => {
    const [book, setBook] = useState<Partial<Book>>({});
    const { id } = useParams();
    const [bookId, setBookId] = useState<number | null>(null);

    const navigate = useNavigate();

    const fetchBooks =  useCallback(async () => {
        try {
            const response = await showBook(Number(id) || null);
            const data = await response.data;
            console.log(data);
            setBook(data);
            setBookId(data.id);
        } 
        catch (error) {
            console.error('Error fetching books:', error);
        }
    }, [id]);

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
                    <h1 className="text-primary">Detail Book</h1>
                    <div className="section-header-breadcrumb">
                        <div className="breadcrumb-item">{book.title}</div>
                        <div className="breadcrumb-item">Detail Book</div>
                        <div className="breadcrumb-item"><a type="button" className="text-primary" onClick={() => navigate('/books')}>Books</a></div>
                    </div>
                </div>
                <div className="section-body">
                    <div className="row mt-1">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="section-title text-primary m-0">Showed Book : {book.title}
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-body p-0">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label className="control-label text-primary">Title</label>
                                                            <p className="custom-switch-description">
                                                                {book.title}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label className="control-label text-primary">Category</label>
                                                            <p className="custom-switch-description">
                                                                {book.category}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label className="control-label text-primary">Publisher</label>
                                                            <p className="custom-switch-description">
                                                                {book.publisher}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label className="control-label text-primary">ISBN</label>
                                                            <p className="custom-switch-description">
                                                                {book.isbn}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label className="control-label text-primary">Author</label>
                                                            <p className="custom-switch-description">
                                                                {book.author}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label className="control-label text-primary">Year</label>
                                                            <p className="custom-switch-description">
                                                                {book.year}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label className="control-label text-primary">Price</label>
                                                            <p className="custom-switch-description">
                                                                {formatRupiah(book.price || null)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label className="control-label text-primary">Description</label>
                                                            <p className="custom-switch-description">
                                                                {book.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer text-right">
                                            <a type="button" onClick={()=>navigate(`/books`)}
                                                className="btn btn-danger mr-1"><i className="fas fa-angle-left"></i> Back</a>
                                            <a type="button" onClick={()=>navigate(`/books/${bookId}/edit`)}
                                                className="btn btn-primary"><i className="fas fa-edit"></i> Edit</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ShowBook;