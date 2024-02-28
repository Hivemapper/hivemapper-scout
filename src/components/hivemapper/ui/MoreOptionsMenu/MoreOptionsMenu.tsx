import * as React from "react";

import { Button } from "@components/shadcn/Button";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@components/shadcn/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/shadcn/Popover";
import MoreOptions from "@components/icons/MoreOptions";

export interface MoreOptionsMenuProps {
  elements: React.ReactElement<any, any>[];
}

const MoreOptionsMenu: React.FC<MoreOptionsMenuProps> = ({
  elements,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
      <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
        >
          <MoreOptions width={20} height={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent fitContents>
        <Command>
          <CommandGroup>
            {elements.map((element, index) => (
              <CommandItem
                key={`${element}_${index.toString()}`}
                preventHighlighting
                onSelect={() => {
                  setOpen(false);
                }}
                >
                {element}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MoreOptionsMenu;
