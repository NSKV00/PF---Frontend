import { useState } from "react"
import { Calendar } from "../calendario/Calendario"
import { Popover, PopoverTrigger, PopoverContent } from "../popover/popover"
import { Button } from "../button/button"

export function DatePicker() {
  const [date, setDate] = useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>{date ? date.toDateString() : "Selecionar data"}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  )
}
