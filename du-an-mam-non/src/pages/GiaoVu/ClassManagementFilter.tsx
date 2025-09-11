import Filter from "../../components/ui/filter";

const ClassManagementFilter = () => {
  return (
    <Filter>
      <div className="mb-5">
        <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300">
          Niên khoá
        </label>
        <input
          type="text"
          className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
          placeholder="Nhập khoá học ..."
        />
      </div>
      <div className="mb-5">
        <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300">
          Lớp học
        </label>
        <input
          type="text"
          className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
          placeholder="Nhập lớp học ..."
        />
      </div>
      <button className="bg-brand-500 hover:bg-brand-600 h-10 w-full rounded-lg px-3 py-2 text-sm font-medium text-white">
        Áp dụng
      </button>
    </Filter>
  );
};

export default ClassManagementFilter;
