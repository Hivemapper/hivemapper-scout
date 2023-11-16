import React, { useEffect, useState } from "react";
import RcPagination from "rc-pagination";
import ArrowLeftCircle from "@components/icons/ArrowLeftCircle";
import ArrowRightCircle from "@components/icons/ArrowRightCircle";
import Ellipsis from "@components/icons/Ellipsis";
import { useStyles } from "@hooks/useStyles";
import palette from "@styles/palette";
import "./pagination.css";

export interface PaginationProps {
  total: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, onChange }) => {
  const [page, setPage] = useState<null | number>(null);
  const { darkMode } = useStyles();

  useEffect(() => {
    const element = document.getElementsByClassName(
      "rc-pagination-item-active"
    )[0] as HTMLElement;

    element.style.backgroundColor =
      palette[darkMode ? "dark" : "default"].accent;

    return () => {
      element.style.backgroundColor = "";
    };
  }, [darkMode, page]);

  return (
    <div className="flex justify-center p-4">
      <RcPagination
        className={`${darkMode ? "hm-pagination-dark" : "hm-pagination"}`}
        locale={{
          prev_page: "Prev",
          next_page: "Next",
          prev_5: "Prev 5",
          next_5: "Next 5",
          prev_3: "Prev 3",
          next_3: "Next 3",
        }}
        total={total}
        onChange={(page) => {
          setPage(page);
          onChange(page);
        }}
        prevIcon={<ArrowLeftCircle />}
        nextIcon={<ArrowRightCircle />}
        jumpPrevIcon={<Ellipsis />}
        jumpNextIcon={<Ellipsis />}
        showTitle
      />
    </div>
  );
};

export default Pagination;
