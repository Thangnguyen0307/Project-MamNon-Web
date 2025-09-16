import { useCallback } from "react";

export const usePagination = (
  totalItems: number,
  itemsPerPage: number = 10,
  currentPage: number,
  setPage: (key: string, value: number) => void
) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setPage("page", page);
      }
    },
    [totalPages, setPage]
  );

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  return {
    currentPage,
    totalPages,
    start,
    end,
    goToPage,
    nextPage,
    prevPage,
    totalItems,
  };
};
