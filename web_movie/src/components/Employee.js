import { useEffect, useState } from "react";

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    // State để thêm/cập nhật nhân viên
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [editingId, setEditingId] = useState(null); // Lưu ID khi cập nhật

    // Fetch danh sách nhân viên
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/employees");
            const data = await response.json();
            setEmployees(data.data || []);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách nhân viên:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Thêm hoặc cập nhật nhân viên
    const handleSaveEmployee = async () => {
        if (!tenDangNhap) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const newEmployee = {tenDangNhap};
        try {
            let response;
            if (editingId) {
                response = await fetch(`http://localhost:8080/employees/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newEmployee)
                });
            } else {
                response = await fetch("http://localhost:8080/employees", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newEmployee)
                });
            }

            if (!response.ok) throw new Error("Lỗi khi lưu nhân viên");
            await fetchEmployees(); // Cập nhật danh sách
            setTenDangNhap("");
            setEditingId(null);
        } catch (error) {
            console.error(error);
        }
    };

    // Xóa nhân viên
    const handleDeleteEmployee = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này không?")) {
            try {
                await fetch(`http://localhost:8080/employees/${id}`, { method: "DELETE" });
                await fetchEmployees();
            } catch (error) {
                console.error("Lỗi khi xóa nhân viên:", error);
            }
        }
    };

    // Chỉnh sửa nhân viên
    const handleEditEmployee = (employee) => {
        setEditingId(employee._id);
        setTenDangNhap(employee.tenDangNhap);
    };

    return (
        <div className="container">
            <h1>Quản lý nhân viên</h1>

            {/* Form thêm/cập nhật nhân viên */}
            <div className="add-form">
                <h2>{editingId ? "Cập nhật" : "Thêm"} nhân viên</h2>
                <input type="text" placeholder="Tên nhân viên" value={tenDangNhap} onChange={(e) => setTenDangNhap(e.target.value)} />
                <button onClick={handleSaveEmployee}>{editingId ? "Cập nhật" : "Thêm"}</button>
                {editingId && <button onClick={() => setEditingId(null)}>Hủy</button>}
            </div>

            {/* Danh sách nhân viên */}
            <div className="work-schedule-container">
                <h2>Danh sách nhân viên</h2>
                {loading ? <p className="loading-text">Đang tải...</p> : (
                    <table className="work-schedule-table">
                        <thead>
                            <tr>
                                <th>Tên nhân viên</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length > 0 ? employees.map((employee) => (
                                <tr key={employee._id}>
                                    <td>{employee.tenDangNhap}</td>
                                    <td>
                                        <button className="update-btn" onClick={() => handleEditEmployee(employee)}>Cập nhật</button>
                                        <button className="delete-btn" onClick={() => handleDeleteEmployee(employee._id)}>Xóa</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="no-data">Không có nhân viên.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
