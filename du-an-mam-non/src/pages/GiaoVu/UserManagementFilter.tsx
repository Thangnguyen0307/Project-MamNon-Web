import Select from "../../components/form/Select";
import Filter from "../../components/ui/filter";

interface OptionsProps {
  value: string;
  label: string;
}

interface PropFilter {
  optionsRole: OptionsProps[];
  setQueryParams: (key: string, value: string) => void;
}

const UserManagementFilter: React.FC<PropFilter> = ({
  optionsRole,
  setQueryParams,
}) => {
  return (
    <Filter search setQuery={setQueryParams}>
      <div className="w-1/6">
        <Select
          name="role"
          options={optionsRole}
          placeholder="Lọc theo cấp bậc"
          onChange={(name, value) => {
            setQueryParams(name, value);
          }}
          className="dark:bg-dark-900  "
        />
      </div>
    </Filter>
  );
};

export default UserManagementFilter;
