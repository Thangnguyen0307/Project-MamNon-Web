import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative  z-1 dark:bg-gray-900 sm:p-0">
      <div
        className="relative flex flex-col justify-center w-full h-screen lg:flex-row bg-cover bg-white sm:p-0 p-6"
        style={{
          backgroundImage:
            "url('https://png.pngtree.com/background/20210714/original/pngtree-hand-painted-book-graduation-cap-cartoon-kindergarten-enrollment-background-material-picture-image_1193207.jpg')",
        }}>
        {children}
      </div>
    </div>
  );
}
