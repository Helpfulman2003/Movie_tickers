import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WorkScheduleList() {
    const [workSchedules, setWorkSchedules] = useState([]);  // Danh sách hiển thị
    const [allSchedules, setAllSchedules] = useState([]); // Danh sách gốc
    const [loading, setLoading] = useState(false);
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const navigate = useNavigate(); // Khai báo biến navigate


    // State để thêm lịch làm việc
    const [ngayLam, setNgayLam] = useState("");
    const [gioBatDau, setGioBatDau] = useState("");
    const [gioKetThuc, setGioKetThuc] = useState("");
    const [loaiCaTruc, setLoaiCaTruc] = useState("");

    // Hàm lấy toàn bộ danh sách từ API
    const fetchAllSchedules = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/workSchedule`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setAllSchedules(data.data || []);
            setWorkSchedules(data.data || []);
        } catch (error) {
            console.error("Lỗi khi gọi API:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // Gọi API lần đầu khi component được mount
    useEffect(() => {
        fetchAllSchedules();
    }, []);

    // Hàm lọc danh sách theo ngày, tháng, năm
    const filterWorkSchedules = () => {
        if (!day && !month && !year) {
            setWorkSchedules(allSchedules); // Nếu không nhập gì, hiển thị tất cả
            return;
        }

        let filtered = allSchedules.filter(ws => {
            let date = new Date(ws.ngayLam);
            return (!day || date.getDate() === parseInt(day)) &&
                   (!month || date.getMonth() + 1 === parseInt(month)) &&
                   (!year || date.getFullYear() === parseInt(year));
        });

        setWorkSchedules(filtered);
    };

    // Hàm thêm lịch làm việc mới
    const handleAddSchedule = async () => {
        if (!ngayLam || !gioBatDau || !gioKetThuc || !loaiCaTruc) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const newSchedule = {
            ngayLam,
            gioBatDau,
            gioKetThuc,
            loaiCaTruc
        };

        try {
            const response = await fetch(`http://localhost:8080/workSchedule`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newSchedule)
            });

            if (!response.ok) {
                throw new Error(`Lỗi tạo lịch làm việc: ${response.statusText}`);
            }

            const data = await response.json();
            setWorkSchedules([...workSchedules, data.data]); // Cập nhật danh sách hiển thị
            setAllSchedules([...allSchedules, data.data]); // Cập nhật danh sách gốc

            // Reset form sau khi thêm
            setNgayLam("");
            setGioBatDau("");
            setGioKetThuc("");
            setLoaiCaTruc("");

            alert("Thêm lịch làm việc thành công!");
        } catch (error) {
            console.error("Lỗi khi thêm lịch làm việc:", error);
        }
    };

    // 🗑️ Hàm xóa lịch làm việc
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa lịch làm việc này không?")) {
            try {
                const response = await fetch(`http://localhost:8080/workSchedule/${id}`, {
                    method: "DELETE",
                });

                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                    fetchAllSchedules(); // Load lại danh sách sau khi xóa
                } else {
                    alert("Lỗi khi xóa: " + result.message);
                }
            } catch (error) {
                console.error("Lỗi khi xóa:", error.message);
            }
        }
    };

    return (
        <div className="container">
            <h1>Quản lý lịch làm việc</h1>

            {/* Form lọc */}
            <div className="filter-box">
                <h2>Lọc lịch làm việc</h2>
                <div className="filter-inputs">
                    <input type="number" min="1" max="31" placeholder="Ngày" value={day} onChange={e => setDay(e.target.value)} />
                    <input type="number" min="1" max="12" placeholder="Tháng" value={month} onChange={e => setMonth(e.target.value)} />
                    <input type="number" placeholder="Năm" value={year} onChange={e => setYear(e.target.value)} />
                    <button onClick={filterWorkSchedules}>Lọc</button>
                </div>
            </div>

            {/* Form thêm lịch làm việc */}
            <div className="add-form">
                <h2>Thêm lịch làm việc</h2>
                <div className="form-group">
                    <input type="date" value={ngayLam} onChange={e => setNgayLam(e.target.value)} />
                    <input type="time" value={gioBatDau} onChange={e => setGioBatDau(e.target.value)} />
                    <input type="time" value={gioKetThuc} onChange={e => setGioKetThuc(e.target.value)} />
                    <input type="text" placeholder="Ca trực" value={loaiCaTruc} onChange={e => setLoaiCaTruc(e.target.value)} />
                    <button onClick={handleAddSchedule}>Thêm</button>
                </div>
            </div>
            
            <div className="work-schedule-container">
            <h2>Danh sách lịch làm việc</h2>
            {loading ? <p className="loading-text">Đang tải...</p> : (
                <table className="work-schedule-table">
                    <thead>
                        <tr>
                            <th>Ngày làm</th>
                            <th>Giờ bắt đầu</th>
                            <th>Giờ kết thúc</th>
                            <th>Ca trực</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workSchedules.length > 0 ? workSchedules.map((ws, index) => (
                            <tr key={index}>
                                <td>{new Date(ws.ngayLam).toLocaleDateString("vi-VN")}</td>
                                <td>{new Date(ws.gioBatDau).toLocaleTimeString()}</td>
                                <td>{new Date(ws.gioKetThuc).toLocaleTimeString()}</td>
                                <td>{ws.loaiCaTruc}</td>
                                <td>
                                    <button className="update-btn" onClick={() => navigate(`/update/${ws._id}`)}>Cập nhật</button>
                                    <button className="delete-btn" onClick={() => handleDelete(ws._id)}>Xóa</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="no-data">Không có lịch làm việc.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                )}
            </div>
        </div>
    );
}

