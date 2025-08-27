import { Calendar } from "@/components/ui/calendar";

interface CalendarioProps {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  salvarData: (date: Date) => void;
}

export const Calendario = ({ date, onSelect, salvarData }: CalendarioProps) => {
  const today = new Date();

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={onSelect}
        onMonthChange={salvarData}
        className="rounded-lg border"
        disabled={{ before: today }}
        fixedWeeks
      />
    </div>
  );
};
