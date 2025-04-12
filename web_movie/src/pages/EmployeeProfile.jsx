import React from "react";

function EmployeeProfile() {
  const employeeProfile = {
    name: "Nguyễn Văn A",
    role: "Quản lý rạp chiếu phim",
    email: "nguyenvana@example.com",
  };

  const handleLogout = () => {
    // Xử lý logic đăng xuất tại đây
    console.log("Đăng xuất thành công!");
    alert("Bạn đã đăng xuất!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-blue-700 text-center mb-6">
          Thông Tin Nhân Viên
        </h2>
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            <strong className="text-blue-600">Họ tên:</strong> {employeeProfile.name}
          </p>
          <p className="text-lg text-gray-700">
            <strong className="text-blue-600">Vị trí:</strong> {employeeProfile.role}
          </p>
          <p className="text-lg text-gray-700">
            <strong className="text-blue-600">Email:</strong> {employeeProfile.email}
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition-all duration-300">
            Chỉnh sửa thông tin
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-600 transition-all duration-300"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;