import React, { useState } from "react";
import Input from "@components/hivemapper/ui/Input";
import CloseCircle from "@components/icons/CloseCircle";
import palette from "@styles/palette";
import { useConfig } from "@hooks/useConfig";
import * as cn from "./classNames";

export interface SearchProps {
  placeholder?: string;
  onChange: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ placeholder, onChange }) => {
  const [value, setValue] = useState("");
  const { darkMode } = useConfig();

  return (
    <div className={cn.searchWrapper()}>
      <div
        className={cn.searchClear(value)}
        onClick={() => {
          setValue("");
          onChange("");
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
