import { useState } from "react";

export interface Option {
  value: string | boolean;
  label: string;
}

interface SelectProps {
  name?: string;
  options: Option[];
  placeholder?: string;
  onChange: (name: string, value: string) => void;
  className?: string;
  defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
}) => {
  // Manage the selected value

  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setSelectedValue(value);
    onChange(name, value); // Trigger parent handler
  };

  return (
    <div className="flex relative">
      <select
        name={name}
        className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
          selectedValue
            ? "text-gray-800 dark:text-white/90"
            : "text-gray-400 dark:text-gray-400"
        } ${className}`}
        value={selectedValue}
        onChange={handleChange}
        required>
        {/* Placeholder option */}
        <option
          value=""
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
          {placeholder}
        </option>
        {/* Map over options */}
        {options.map((option) => (
          <option
            key={option.value.toString()}
            value={option.value.toString()}
            className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
            {option.label}
          </option>
        ))}
      </select>
      <div className="flex items-center py-1 pl-1 pr-1 w-7 absolute right-2 top-[50%] -translate-y-[50%]">
        <button
          type="button"
          className="w-5 h-5 text-gray-700 outline-hidden cursor-pointer focus:outline-hidden dark:text-gray-400">
          <svg
            className={`stroke-current}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.79175 7.39551L10.0001 12.6038L15.2084 7.39551"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Select;
