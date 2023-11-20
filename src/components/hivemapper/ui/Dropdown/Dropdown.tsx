import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@components/shadcn/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@components/shadcn/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/shadcn/Popover";
import { capitalizeFirstCharacter } from "@utils/string";
import * as cn from "./classNames";

export interface DropdownProps {
  elements: string[];
  placeholder?: string;
  onChange?: (description: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  elements,
  placeholder = "Description",
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const uniques = [...new Set(elements)];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn.buttonWrapper()}
        >
          {capitalizeFirstCharacter(
            value ? uniques.find((element) => element === value) : placeholder
          )}
          <ChevronsUpDown className={cn.buttonChevron()} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn.buttonPopover()}>
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No element found.</CommandEmpty>
          <CommandGroup>
            {uniques.map((element, index) => (
              <CommandItem
                key={`${element}_${index.toString()}`}
                value={element}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);

                  if (onChange) {
                    onChange(currentValue);
                  }
                }}
              >
                <Check className={cn.buttonCheckmark(value === element)} />
                {capitalizeFirstCharacter(element)}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Dropdown;
