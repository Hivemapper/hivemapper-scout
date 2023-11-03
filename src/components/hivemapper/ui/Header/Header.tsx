import React from "react";
import classNames from "classnames";
import { useStyles } from "@hooks/useStyles";
import DropdownMenu from "@components/hivemapper/ui/Menu";
import { DateRangePicker } from "@components/hivemapper/ui/DateRangePicker";
import Search from "@components/hivemapper/ui/Search";
import { Button } from "@components/shadcn/Button";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { stripTailwindClasses } = useStyles();

  const headerClasses = classNames(
    { "w-full": !stripTailwindClasses },
    "hm-header"
  );

  return (
    <div className={headerClasses}>
      <DropdownMenu />
      <DateRangePicker />
      <Search />
      <Button>Button</Button>
    </div>
  );
};

export default Header;
