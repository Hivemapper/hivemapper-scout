import React from "react";
import { Input } from "@components/shadcn/Input";

export interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  return <Input onChange={() => console.log("search changed")} />;
};

export default Search;
