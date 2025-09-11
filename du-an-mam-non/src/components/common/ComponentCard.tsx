interface ComponentCardProps {
  title: React.ReactNode;
  button?: React.ReactNode;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
  filter?: React.ReactNode;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  button,
  children,
  className = "",
  desc = "",
  filter,
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}>
      {/* Card Header */}
      <div className="flex flex-col justify-between gap-5 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center dark:border-gray-800">
        <div className="">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            {title}
          </h3>
          {desc && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {desc}
            </p>
          )}
        </div>
        {button && <div className="">{button}</div>}
      </div>
      {/* Filter */}
      {filter}
      {/* Card Body */}
      <div className="p-4 border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
