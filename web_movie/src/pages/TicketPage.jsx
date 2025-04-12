import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TicketList from '../components/TicketList';
import TicketModal from '../components/TicketModal';
import {
  fetchTickets,
  addNewTicket,
  removeTicket,
  collectTicket,
} from '../redux/slices/ticketSlice';

function TicketPage() {
  const dispatch = useDispatch();
  const { tickets, status, error } = useSelector((state) => state.tickets);
  const { auth } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // Lấy danh sách vé khi component được render
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTickets());
    }
  }, [dispatch, status]);

  console.log(tickets);
  

  // Hàm thêm vé mới
  const addTicket = (ticket) => {
    dispatch(addNewTicket({...ticket, maNhanVien: auth._id}));
    setIsModalOpen(false); // Đóng modal sau khi thêm
    window.location.reload();
  };

  // Hàm xóa vé
  const deleteTicket = (id) => {
    dispatch(removeTicket(id));
    window.location.reload()
  };

  const handleCollectTicket = (id) => {
    dispatch(collectTicket(id));
    // window.location.reload() // Gọi action thu vé
  };


  // Hàm tìm kiếm vé
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Hàm lọc vé theo ngày
  const handleFilterDate = (e) => {
    setFilterDate(e.target.value);
  };

  // Lọc vé dựa trên tìm kiếm và ngày
  // const filteredTickets = tickets?.filter((ticket) => {
  //   const matchesSearch = ticket.movieName
  //     ?.toLowerCase()
  //     .includes(searchTerm.toLowerCase());
  //   const matchesDate = filterDate
  //     ? ticket.showTime.startsWith(filterDate)
  //     : true;
  //   return matchesSearch && matchesDate;
  // });

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-6'>
      {/* Thanh tìm kiếm và lọc */}
      <div className='flex flex-col md:flex-row items-center justify-between mb-6 gap-4'>
        <input
          type='text'
          placeholder='🔍 Tìm kiếm theo tên phim...'
          value={searchTerm}
          onChange={handleSearch}
          className='w-full md:w-1/3 border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500'
        />
        <input
          type='date'
          value={filterDate}
          onChange={handleFilterDate}
          className='w-full md:w-1/3 border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500'
        />
      </div>

      {/* Danh sách vé */}
      <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
        {status === 'loading' && <p>Đang tải danh sách vé...</p>}
        {status === 'failed' && <p>Lỗi: {error}</p>}
        {status === 'succeeded' && (
          <TicketList tickets={tickets} deleteTicket={deleteTicket} collectTicket={handleCollectTicket}/>
        )}
      </div>
      {/* Nút thêm vé */}
      <div className='flex justify-center'>
        <button
          className='bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition-all duration-300'
          onClick={() => setIsModalOpen(true)}
        >
          Thêm Vé
        </button>
      </div>

      {/* Modal thêm vé */}
      {isModalOpen && (
        <TicketModal
          addTicket={addTicket}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default TicketPage;
