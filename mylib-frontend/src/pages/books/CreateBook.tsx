import React from "react";
import { createBook } from "../../services/api";
import { useNavigate } from "react-router-dom";

const CreateBook: React.FC = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Created New Book");

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
            await createBook(bookData);
            console.log("Created New Book:", bookData);
            alert("Book added successfully!");
            navigate('/books')
        } catch (error) {
            console.error("Failed to create book:", error);
            alert("Failed to add book.");
        }
    }
    return (
        <div className="main-content">
            <section className="section">
                <div className="section-header">
                    <h1 className="text-primary">Create New Book</h1>
                    <div className="section-header-breadcrumb">
                        <div className="breadcrumb-item">Create New Book</div>
                        <div className="breadcrumb-item"><a type="button" className="text-promary" onClick={() => navigate('/books')}>Books</a></div>
                    </div>
                </div>
                <div className="section-body">
                    <div className="row mt-1">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="section-title text-primary m-0">Form Create Book</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <form action="#" onSubmit={handleSubmit} id="form-add-master-books" method="post" encType="multipart/form-data">
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
                                                                    required={true} />
                                                                <div className="invalid-feedback title_error">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="control-label text-primary">Category</label>
                                                                <input type="text" className="form-control" name="category"
                                                                    required={true} />
                                                                <div className="invalid-feedback category_error">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="control-label text-primary">Publisher</label>
                                                                <input type="text" className="form-control" name="publisher"
                                                                    required={true} />
                                                                <div className="invalid-feedback publisher_error">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="control-label text-primary">ISBN</label>
                                                                <input type="text" className="form-control" name="isbn"
                                                                    required={true} />
                                                                <div className="invalid-feedback isbn_error">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="control-label text-primary">Author</label>
                                                                <input type="text" className="form-control" name="author"
                                                                    required={true} />
                                                                <div className="invalid-feedback author_error">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="control-label text-primary">Year</label>
                                                                <input type="text" className="form-control" name="year"
                                                                    required={true} />
                                                                <div className="invalid-feedback year_error">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="control-label text-primary">Price</label>
                                                                <input type="text" className="form-control" name="price"
                                                                    required={true} />
                                                                <div className="invalid-feedback price_error">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="control-label text-primary">Description</label>
                                                                <input type="text" className="form-control" name="desc"
                                                                    required={true} />
                                                                <div className="invalid-feedback desc_error">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer text-right">
                                                <a type="button" onClick={() => navigate('/books')}
                                                    className="btn btn-danger mr-1"><i className="fas fa-angle-left"></i> Back</a>
                                                <button type="submit" className="btn btn-primary"><i className="fas fa-upload"></i>
                                                    Save</button>
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
export default CreateBook;