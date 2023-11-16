import React, { useState } from "react";
import { Input } from "@components/shadcn/Input";
import CloseCircle from "@components/icons/CloseCircle";
import palette from "@styles/palette";
import { useStyles } from "@hooks/useStyles";

export interface SearchProps {
  placeholder?: string;
  onChange: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ placeholder, onChange }) => {
  const [value, setValue] = useState("");
  const { darkMode } = useStyles();

  return (
    <div className="relative min-w-[30%]">
      <div
        className="absolute top-1/2 transform -translate-y-1/2 right-2"
        onClick={() => setValue("")}
        style={{
          cursor: value ? "pointer" : "default",
        }}
      >
        <CloseCircle
          color={
            value ? undefined : palette[darkMode ? "dark" : "default"].accent
          }
          width={17}
          height={17}
        />
      </div>
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value.toLowerCase());
        }}
      />
    </div>
  );
};

export default Search;
