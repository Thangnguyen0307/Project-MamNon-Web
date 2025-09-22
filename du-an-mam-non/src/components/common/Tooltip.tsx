import { ReactNode } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
  return (
    <div className="relative group inline-block">
      {children}
      <span
        className="
          absolute left-1/2 -translate-x-1/2 mt-2
          hidden group-hover:block
          whitespace-nowrap rounded-md bg-gray-800 px-2 py-1
          text-xs text-white shadow-lg
          z-50
        ">
        {text}
      </span>
    </div>
  );
}
