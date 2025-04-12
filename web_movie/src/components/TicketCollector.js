import React, { useState } from 'react';
import axios from 'axios';

const TicketCollector = () => {
  const [maVe, setMaVe] = useState(''); // Lưu trữ mã vé nhập vào
  const [message, setMessage] = useState(''); // Lưu trữ thông báo từ server
  const [error, setError] = useState(''); // Lưu trữ lỗi nếu có

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // Gửi yêu cầu thu vé đến API
      const response = await axios.post(
        'http://localhost:8080/tickets/thu-ve',
        {
          maVe,
        }
      );
      // Hiển thị thông báo thành công
      setMessage(response.data.message);
    } catch (err) {
      // Hiển thị lỗi nếu có
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Thu Vé</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor='maVe'>Mã Vé:</label>
          <input
            type='text'
            id='maVe'
            value={maVe}
            onChange={(e) => setMaVe(e.target.value)}
            placeholder='Nhập mã vé'
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>
        <button type='submit' style={{ padding: '5px 10px' }}>
          Thu Vé
        </button>
      </form>

      {/* Hiển thị thông báo thành công */}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      {/* Hiển thị lỗi nếu có */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TicketCollector;
