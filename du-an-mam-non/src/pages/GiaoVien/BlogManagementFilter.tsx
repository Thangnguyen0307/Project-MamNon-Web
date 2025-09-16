import DatePicker from "../../components/form/date-picker";
import Select from "../../components/form/Select";
import Filter from "../../components/ui/filter";

const BlogManagementFilter = () => {
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];
  return (
    <Filter>
      <DatePicker
        id="date-picker"
        placeholder="Chọn niên khoá"
        onChange={(dates, currentDateString) => {
          // Handle your logic
          console.log({ dates, currentDateString });
        }}
        type="Y"
      />
      <div className="w-1/6 max-sm:w-full">
        <Select
          options={options}
          placeholder="Select Option"
          className="dark:bg-dark-900"
          onChange={(name, value) => console.log(name, value)}
        />
      </div>
    </Filter>
  );
};

export default BlogManagementFilter;
