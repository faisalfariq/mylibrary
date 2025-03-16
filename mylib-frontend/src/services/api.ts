import axios from 'axios';
import API_URL from './config';

// Inisialisasi Axios
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Fungsi untuk mendapatkan daftar buku
export const getBooks = async (keyword: string) => {
    try {
        console.log("getbook: " + keyword);
        const response = await api.get('/books', { params: { keyword } });
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

// Fungsi untuk menambahkan buku 
export const createBook = async (bookData: object) => {
    try {
        const response = await api.post('/books', bookData);
        return response.data;
    } catch (error) {
        console.error('Error creating book:', error);
        throw error;
    }
};

// Fungsi untuk edit buku
export const editBook = async (id: number | null) => {
    try {
        const response = await api.get(`/books/${id}/edit`);
        return response.data;
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
};

// Fungsi untuk show buku
export const showBook = async (id: number | null) => {
    try {
        const response = await api.get(`/books/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
};

// Fungsi untuk mengupdate buku
export const updateBook = async (id: number | null, bookData: object) => {
    try {
        const response = await api.put(`/books/${id}`, bookData);
        return response.data;
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
};

// Fungsi untuk menghapus buku
export const deleteBook = async (id: number | null) => {
    try {
        const response = await api.delete(`/books/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};
