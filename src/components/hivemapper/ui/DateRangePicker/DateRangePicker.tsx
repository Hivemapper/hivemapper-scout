"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@utils/helpers";
import { Button } from "@components/shadcn/Button";
import { Calendar } from "@components/shadcn/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/shadcn/Popover";
import classNames from "classnames";
import { useStyles } from "@hooks/useStyles";

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const { stripTailwindClasses } = useStyles();

  const containerClasses = classNames(
    {
      [cn("grid gap-2", className)]: !stripTailwindClasses,
    },
    "hm-drp-container"
  );

  const buttonClasses = classNames(
    {
      [cn(
        "w-[280px] justify-start text-left font-normal",
        !date && "text-muted-foreground"
      )]: !stripTailwindClasses,
    },
    "hm-drp-button"
  );

  return (
    <div className={containerClasses}>
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant={"outline"} className={buttonClasses}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
