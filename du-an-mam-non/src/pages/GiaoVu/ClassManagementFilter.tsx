import Select from "../../components/form/Select";
import Filter from "../../components/ui/filter";
import { yearOptions } from "../../utils/helper";

interface OptionsProps {
  value: string;
  label: string;
}

interface PropFilter {
  optionsTeachers: OptionsProps[];
  optionsLevels: OptionsProps[];
  setQueryParams: (key: string, value: string) => void;
}

const ClassManagementFilter: React.FC<PropFilter> = ({
  optionsTeachers,
  optionsLevels,
  setQueryParams,
}) => {
  return (
    <Filter setQuery={setQueryParams} search={false}>
      <div className="w-1/6">
        <Select
          name="startYear"
          options={yearOptions}
          placeholder="Từ năm"
          onChange={(name, value) => {
            setQueryParams(name, value);
          }}
          className="dark:bg-dark-900"
        />
      </div>
      <div className="w-1/6">
        <Select
          name="endYear"
          options={yearOptions}
          placeholder="Đến năm"
          onChange={(name, value) => {
            setQueryParams(name, value);
          }}
          className="dark:bg-dark-900"
        />
      </div>
      <div className="w-1/6">
        <Select
          name="teacher"
          options={optionsTeachers}
          placeholder="Lọc theo tên giáo viên"
          onChange={(name, value) => {
            setQueryParams(name, value);
          }}
          className="dark:bg-dark-900"
        />
      </div>
      <div className="w-1/6">
        <Select
          name="level"
          options={optionsLevels}
          placeholder="Lọc theo tên khối lớp"
          onChange={(name, value) => {
            setQueryParams(name, value);
          }}
          className="dark:bg-dark-900"
        />
      </div>
    </Filter>
  );
};

export default ClassManagementFilter;
