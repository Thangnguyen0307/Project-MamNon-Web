
import React, { useState } from 'react';

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.0254 6.17845C8.0254 4.90629 9.05669 3.875 10.3289 3.875C11.601 3.875 12.6323 4.90629 12.6323 6.17845C12.6323 7.45061 11.601 8.48191 10.3289 8.48191C9.05669 8.48191 8.0254 7.45061 8.0254 6.17845ZM10.3289 2.375C8.22827 2.375 6.5254 4.07786 6.5254 6.17845C6.5254 8.27904 8.22827 9.98191 10.3289 9.98191C12.4294 9.98191 14.1323 8.27904 14.1323 6.17845C14.1323 4.07786 12.4294 2.375 10.3289 2.375ZM8.92286 11.03C5.7669 11.03 3.2085 13.5884 3.2085 16.7444V17.0333C3.2085 17.4475 3.54428 17.7833 3.9585 17.7833C4.37271 17.7833 4.7085 17.4475 4.7085 17.0333V16.7444C4.7085 14.4169 6.59533 12.53 8.92286 12.53H11.736C14.0635 12.53 15.9504 14.4169 15.9504 16.7444V17.0333C15.9504 17.4475 16.2861 17.7833 16.7004 17.7833C17.1146 17.7833 17.4504 17.4475 17.4504 17.0333V16.7444C17.4504 13.5884 14.8919 11.03 11.736 11.03H8.92286Z" fill="currentColor" />
  </svg>
);

const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M6.54142 3.7915C6.54142 2.54886 7.54878 1.5415 8.79142 1.5415H11.2081C12.4507 1.5415 13.4581 2.54886 13.4581 3.7915V4.0415H15.6252H16.666C17.0802 4.0415 17.416 4.37729 17.416 4.7915C17.416 5.20572 17.0802 5.5415 16.666 5.5415H16.3752V8.24638V13.2464V16.2082C16.3752 17.4508 15.3678 18.4582 14.1252 18.4582H5.87516C4.63252 18.4582 3.62516 17.4508 3.62516 16.2082V13.2464V8.24638V5.5415H3.3335C2.91928 5.5415 2.5835 5.20572 2.5835 4.7915C2.5835 4.37729 2.91928 4.0415 3.3335 4.0415H4.37516H6.54142V3.7915ZM14.8752 13.2464V8.24638V5.5415H13.4581H12.7081H7.29142H6.54142H5.12516V8.24638V13.2464V16.2082C5.12516 16.6224 5.46095 16.9582 5.87516 16.9582H14.1252C14.5394 16.9582 14.8752 16.6224 14.8752 16.2082V13.2464ZM8.04142 4.0415H11.9581V3.7915C11.9581 3.37729 11.6223 3.0415 11.2081 3.0415H8.79142C8.37721 3.0415 8.04142 3.37729 8.04142 3.7915V4.0415ZM8.3335 7.99984C8.74771 7.99984 9.0835 8.33562 9.0835 8.74984V13.7498C9.0835 14.1641 8.74771 14.4998 8.3335 14.4998C7.91928 14.4998 7.5835 14.1641 7.5835 13.7498V8.74984C7.5835 8.33562 7.91928 7.99984 8.3335 7.99984ZM12.4168 8.74984C12.4168 8.33562 12.081 7.99984 11.6668 7.99984C11.2526 7.99984 10.9168 8.33562 10.9168 8.74984V13.7498C10.9168 14.1641 11.2526 14.4998 11.6668 14.4998C12.081 14.4998 12.4168 14.1641 12.4168 13.7498V8.74984Z" fill="currentColor" />
  </svg>
);

type Teacher = {
  id: number;
  name: string;
  email: string;
  role: 'Giáo viên' | 'Quản trị viên';
};

const initialTeachers: Teacher[] = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a@school.edu', role: 'Giáo viên' },
  { id: 2, name: 'Trần Thị B', email: 'b@school.edu', role: 'Quản trị viên' },
];

const UserManagement: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', role: 'Giáo viên' });

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.email) return;
    setTeachers([
      ...teachers,
      {
        id: Date.now(),
        name: newTeacher.name,
        email: newTeacher.email,
        role: newTeacher.role as Teacher['role'],
      },
    ]);
    setNewTeacher({ name: '', email: '', role: 'Giáo viên' });
  };

  const handleDeleteTeacher = (id: number) => {
    setTeachers(teachers.filter(t => t.id !== id));
  };

  const handleRoleChange = (id: number, role: Teacher['role']) => {
    setTeachers(teachers.map(t => t.id === id ? { ...t, role } : t));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-blue-700 text-center drop-shadow-lg">Quản lý giáo viên</h1>

      <form onSubmit={handleAddTeacher} className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-white p-4 rounded-2xl shadow-lg border border-blue-100">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Tên giáo viên</label>
          <input
            type="text"
            placeholder="Nhập tên giáo viên"
            value={newTeacher.name}
            onChange={e => setNewTeacher({ ...newTeacher, name: e.target.value })}
            className="border border-gray-300 px-3 py-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Nhập email"
            value={newTeacher.email}
            onChange={e => setNewTeacher({ ...newTeacher, email: e.target.value })}
            className="border border-gray-300 px-3 py-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Vai trò</label>
          <select
            value={newTeacher.role}
            onChange={e => setNewTeacher({ ...newTeacher, role: e.target.value })}
            className="border border-gray-300 px-3 py-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          >
            <option value="Giáo viên">Giáo viên</option>
            <option value="Quản trị viên">Quản trị viên</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-transparent select-none">.</label>
          <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition text-white px-6 py-2 rounded-xl font-semibold w-full flex items-center justify-center gap-3 shadow-md h-[44px] min-w-[180px]">
            <span className="flex items-center gap-2 w-full justify-center">
              <UserIcon />
              <span className="whitespace-nowrap">Tạo tài khoản</span>
            </span>
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-2xl shadow-lg border border-blue-100">
          <thead>
            <tr className="bg-blue-100 text-blue-700">
              <th className="px-4 py-3 text-left rounded-tl-2xl">Tên</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Vai trò</th>
              <th className="px-4 py-3 text-center rounded-tr-2xl">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(teacher => (
              <tr key={teacher.id} className="hover:bg-blue-50 transition group">
                <td className="px-4 py-2 border-b border-blue-50 flex items-center gap-2">
                  <span className="inline-block text-blue-500"><UserIcon /></span>
                  <span className="font-semibold group-hover:text-blue-700 transition">{teacher.name}</span>
                </td>
                <td className="px-4 py-2 border-b border-blue-50">{teacher.email}</td>
                <td className="px-4 py-2 border-b border-blue-50">
                  <select
                    value={teacher.role}
                    onChange={e => handleRoleChange(teacher.id, e.target.value as Teacher['role'])}
                    className="border border-gray-300 rounded-xl px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                  >
                    <option value="Giáo viên">Giáo viên</option>
                    <option value="Quản trị viên">Quản trị viên</option>
                  </select>
                </td>
                <td className="px-4 py-2 border-b border-blue-50 text-center">
                  <button
                    onClick={() => handleDeleteTeacher(teacher.id)}
                    className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition text-white px-4 py-1 rounded-xl font-medium flex items-center justify-center gap-1 shadow-md"
                  >
                    <TrashIcon />
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
