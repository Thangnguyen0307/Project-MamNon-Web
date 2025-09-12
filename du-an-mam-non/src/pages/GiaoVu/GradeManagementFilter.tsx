import DatePicker from "../../components/form/date-picker";
import Filter from "../../components/ui/filter";

const GradeManagementFilter = () => {
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
    </Filter>
  );
};

export default GradeManagementFilter;
