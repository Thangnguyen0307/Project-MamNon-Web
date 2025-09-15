import DatePicker from "../../components/form/date-picker";
import Select from "../../components/form/Select";
import Filter from "../../components/ui/filter";

const UserManagementFilter = () => {
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
      <div className="w-1/6">
        <Select
          options={options}
          placeholder="Select Option"
          onChange={() => {
            console.log("Selected value:", value);
          }}
          className="dark:bg-dark-900  "
        />
      </div>
    </Filter>
  );
};

export default UserManagementFilter;
