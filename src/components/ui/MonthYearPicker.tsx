"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { format, parse, isValid } from "date-fns"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import moment from "moment";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

interface MonthYearPickerProps {
  name?: string
  value?: string | undefined
  onChange?: (name: string, value: string) => void
  placeholder?: string
}

export default function MonthYearPicker({ name, value, onChange, placeholder = 'Pick a month/year' }: MonthYearPickerProps) {
  const [date, setDate] = useState<Date | null>(() => {
    if (value) {
      try {
        return parse(value, "MM/yyyy", new Date())
      } catch (error) {
        return null
      }
    }
    return null
  });

  const formattedDate = useCallback(() => {
    try {
      if (!date) return ""
      return format(date, "MM/yyyy")
    } catch (error) {
      return ""
    }
  }, [date]);

  const [year, setYear] = useState(() => date ? date.getFullYear() : new Date().getFullYear())
  const [inputValue, setInputValue] = useState(value)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value === 'present') {
      setDate(new Date())
      setYear(new Date().getFullYear())
    }
    else {
      const valueMoment = moment(value, "MM/YYYY");
      if (valueMoment.isValid()) {
        setDate(valueMoment.toDate())
        setYear(valueMoment.year())
      }
    }
  }, [value]);

  const handleYearChange = (increment: number) => {
    setYear(prevYear => {
      const newYear = prevYear + increment
      if (date) {
        const newDate = new Date(newYear, date.getMonth(), 1)
        setDate(newDate)
      }
      return newYear
    })
  }

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(year, monthIndex, 1)
    setDate(newDate)
    setIsOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (/^(0[1-9]|1[0-2])\/\d{4}$/.test(value)) {
      const parsedDate = parse(value, "MM/yyyy", new Date())
      if (isValid(parsedDate)) {
        setDate(parsedDate)
        setYear(parsedDate.getFullYear())
      }
    } else {
      if (!name || !onChange) return;
      onChange(name, value) // Pass the raw input value even if it's not a valid date
    }
  }

  const handleInputBlur = () => {
    if (!name || !onChange) return;
    if (date) {
      const formattedDate = format(date, "MM/yyyy")
      setInputValue(formattedDate)
      onChange(name, formattedDate)
    } else {
      setInputValue("")
      onChange(name, "")
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputBlur()
      setIsOpen(false)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          onClick={() => {
            setIsOpen(true)
            setTimeout(() => inputRef.current?.focus(), 0)
          }}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formattedDate() : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex items-center justify-between p-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => handleYearChange(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous year</span>
          </Button>
          <div className="text-sm font-medium">{year}</div>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => handleYearChange(1)}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next year</span>
          </Button>
        </div>
        <div className="p-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="MM/YYYY"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-3 gap-2 p-2">
          {months.map((month, index) => (
            <Button
              key={month}
              onClick={() => handleMonthSelect(index)}
              variant={date && date.getMonth() === index ? "default" : "outline"}
              className="text-sm"
            >
              {month.slice(0, 3)}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

