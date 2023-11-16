import React from "react";

const DotIcon = ({ size = "10px" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="5"
        cy="5"
        r="4"
        fill="#2F7BED"
        stroke="#619EFA"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default DotIcon;
