// src/components/MovieManagement.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieManagement = () => {
    const navigate = useNavigate();
    // const [movies, setMovies] = useState([]);
    // const [newMovie, setNewMovie] = useState({
    //     tenPhim: '',
    //     theLoai: '',
    //     thoiLuong: '',
    //     daoDien: '',
    //     namSanXuat: '',
    //     moTa: '',
    //     ngayCongChieu: '',
    //     anhBia: '',
    //     trangThai: true
    // });
    // const [editingMovieId, setEditingMovieId] = useState(null);


    // const [message, setMessage] = useState(null);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [moviesPerPage] = useState(10);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(10);

     // Thêm state cho form
     const [editingMovie, setEditingMovie] = useState(null);
     const [newMovie, setNewMovie] = useState({
         tenPhim: '',
         theLoai: '',
         thoiLuong: '',
         daoDien: '',
         namSanXuat: '',
         moTa: '',
         ngayCongChieu: '',
         anhBia: '',
         trangThai: true
     });
    const validateMovie = () => {
        if (!newMovie.tenPhim) {
            setMessage('Vui lòng nhập tên phim!');
            return false;
        }
        if (!newMovie.theLoai) {
            setMessage('Vui lòng nhập thể loại!');
            return false;
        }
        if (!newMovie.thoiLuong) {
            setMessage('Vui lòng nhập thời lượng!');
            return false;
        }
        if (!newMovie.namSanXuat) {
            setMessage('Vui lòng nhập năm sản xuất!');
            return false;
        }
        if (!newMovie.ngayCongChieu) {
            setMessage('Vui lòng chọn ngày công chiếu!');
            return false;
        }
        return true;
    };
    // Fetch movies
    useEffect(() => {
        fetchMovies();
    }, []);

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    // 2. Cập nhật hàm fetchMovies
    const fetchMovies = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/movies');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data); // Debug log để xem cấu trúc data

            // Kiểm tra xem data có thuộc tính data hay không
            const moviesData = data.data || data;
            if (!moviesData || !Array.isArray(moviesData)) {
                console.error('Invalid data from API:', data);
                setMovies([]);
                setMessage('Không thể lấy danh sách phim');
                return;
            }

            setMovies(moviesData);
            setMessage(null);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setMovies([]);
            setMessage('Lỗi khi lấy danh sách phim');
        } finally {
            setLoading(false);
        }
    };
    const handleEdit = (movie) => {
        setEditingMovie(movie);
        setNewMovie({
            tenPhim: movie.tenPhim,
            theLoai: movie.theLoai,
            thoiLuong: movie.thoiLuong,
            daoDien: movie.daoDien,
            namSanXuat: movie.namSanXuat,
            moTa: movie.moTa,
            ngayCongChieu: movie.ngayCongChieu,
            anhBia: movie.anhBia,
            trangThai: movie.trangThai
        });
        navigate(`/movies/addmovie/${movie._id}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateMovie()) return;

        setLoading(true);
        try {
            const response = await fetch(
                editingMovie ? `http://localhost:8080/movies/${editingMovie._id}` : 'http://localhost:8080/movies',
                {
                    method: editingMovie ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newMovie)
                }
            );

            if (!response.ok) throw new Error('Lỗi khi lưu phim');

            setMessage('Lưu phim thành công!');
            setEditingMovie(null);
            setNewMovie({
                tenPhim: '',
                theLoai: '',
                thoiLuong: '',
                daoDien: '',
                namSanXuat: '',
                moTa: '',
                ngayCongChieu: '',
                anhBia: '',
                trangThai: true
            });
            fetchMovies();
        } catch (error) {
            setMessage(`Lỗi: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (movieId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa phim này?')) {
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:8080/movies/${movieId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Lỗi khi xóa phim');
            }
    
            setMessage('Xóa phim thành công!');
            fetchMovies();
        } catch (error) {
            console.error('Error deleting movie:', error);
            setMessage(`Lỗi: ${error.message}`);
        }
    };
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    // hàm phân trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div className="container mx-auto px-4 py-8">
            {loading && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
                </div>
            )}
            {message && (
            <div className="fixed top-4 right-4 p-4 rounded-lg bg-green-100 text-green-800">
                {message}
            </div>
        )}
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Quản lý Phim</h1>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <button 
                onClick={() => navigate('/movies/addmovie')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mb-6"
            >
                Thêm phim mới
            </button>
        </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Danh sách phim</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xl font-medium text-gray-800 uppercase tracking-wider">Tên phim</th>
                                <th className="px-6 py-4 text-left text-xl font-medium text-gray-800 uppercase tracking-wider">Thể loại</th>
                                <th className="px-6 py-4 text-left text-xl font-medium text-gray-800 uppercase tracking-wider">Thời lượng</th>
                                <th className="px-6 py-4 text-left text-xl font-medium text-gray-800 uppercase tracking-wider">Đạo diễn</th>
                                <th className="px-6 py-4 text-left text-xl font-medium text-gray-800 uppercase tracking-wider">Năm SX</th>
                                <th className="px-6 py-4 text-left text-xl font-medium text-gray-800 uppercase tracking-wider">Ngày CC</th>
                                <th className="px-6 py-4 text-left text-xl font-medium text-gray-800 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-4 text-left text-xl font-medium text-gray-800 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        {currentMovies && currentMovies.length > 0 ? (
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentMovies.map((movie, index) => (
                                    <tr key={`${movie._id}-${index}`} className="hover:bg-gray-50">
                                        <td className="px-6 py-6 whitespace-nowrap text-lg text-gray-900">
                                            {movie.tenPhim}
                                        </td>
                                        <td className="px-6 py-6 whitespace-nowrap text-lg text-gray-900">
                                            {movie.theLoai}
                                        </td>
                                        <td className="px-6 py-6 whitespace-nowrap text-lg text-gray-900">
                                            {movie.thoiLuong} phút
                                        </td>
                                        <td className="px-6 py-6 whitespace-nowrap text-lg text-gray-900">
                                            {movie.daoDien}
                                        </td>
                                        <td className="px-6 py-6 whitespace-nowrap text-lg text-gray-900">
                                            {movie.namSanXuat}
                                        </td>
                                        <td className="px-6 py-6 whitespace-nowrap text-lg text-gray-900">
                                            {new Date(movie.ngayCongChieu).toLocaleDateString("vi-VN")}
                                        </td>
                                        <td className="px-6 py-6 whitespace-nowrap text-lg text-gray-900">
                                            <span className={`px-3 py-1 rounded-full text-sm ${movie.trangThai ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {movie.trangThai ? 'Đang chiếu' : 'Ngừng chiếu'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 whitespace-nowrap text-lg text-gray-900">
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => handleEdit(movie._id)}
                                                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    Cập Nhật
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(movie._id)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                                >
                                                    Xóa
                                                </button>
                                               
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <td colSpan="8" className="text-center py-6 text-gray-500">
                                        Không có phim nào trong danh sách
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                    <div className="flex justify-center mt-6">
                        {[...Array(totalPages).keys()].map((pageNumber) => (
                            <button 
                                key={pageNumber}
                                onClick={() => paginate(pageNumber + 1)}
                                className={`px-4 py-2 rounded-lg ${currentPage === pageNumber + 1 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'} 
                                hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2`}
                            >
                                {pageNumber + 1}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-8">
                    <div className="text-sm text-gray-700">
                        Hiển thị {indexOfFirstMovie + 1} đến {indexOfLastMovie} trong tổng số {movies.length} phim
                    </div>
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-md text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        >
                            Trước
                        </button>
                        <span className="px-4 py-2 bg-gray-200 rounded-md text-sm">
                            Trang {currentPage} / {totalPages}
                        </span>
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-md text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        >
                            Sau
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieManagement;
