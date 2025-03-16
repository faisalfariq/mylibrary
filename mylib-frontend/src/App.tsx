import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
// import Books from './pages/books/Books'
import BooksList from './pages/books/BookList'
import CreateBook from './pages/books/CreateBook'
import EditBook from './pages/books/EditBook'
import ShowBook from './pages/books/ShowBook'

function App() {
  return (
    <Router>
      <div id="app">
          <div className="main-wrapper">
            <Header/>
            <Sidebar/>
            <Routes>
              <Route path="/" element={<Navigate to="/books"/>} />
              <Route path="/books">
                <Route index element={<BooksList />} /> {/* Menampilkan daftar buku */}
                <Route path="create" element={<CreateBook />} /> 
                <Route path=":id/edit" element={<EditBook />} /> 
                <Route path=":id" element={<ShowBook/>} /> 
              </Route>
            </Routes>
            <Footer />
          </div>
      </div>
    </Router>
  )
}

export default App
