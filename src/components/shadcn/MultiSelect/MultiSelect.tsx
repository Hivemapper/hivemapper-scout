import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { cn } from "@utils/helpers";
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

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
  className?: string;
  placeholder?: string;
}

const MultiSelect = forwardRef<HTMLButtonElement, MultiSelectProps>(
  ({ options, selected, onChange, className, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [onChange, selected]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className={className}>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`group min-w-[175px] justify-between ${
              selected.length > 1 ? "h-full" : "h-10"
            }`}
            onClick={() => setOpen(!open)}
          >
            <div className={`flex`}>
              <span className="mr-1">{props.placeholder ?? "Select..."} </span>
              {selected.length > 0 ? (
                <div className="flex items-center">
                  <Check width={13} height={13} />
                </div>
              ) : (
                ""
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className={className}>
            <CommandInput placeholder="Search ..." />
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  className="cursor-pointer"
                  key={option}
                  onSelect={() => {
                    onChange(
                      selected.some((item) => item === option)
                        ? selected.filter((item) => item !== option)
                        : [...selected, option],
                    );
                    setOpen(true);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.some((item) => item === option)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

export default MultiSelect;
