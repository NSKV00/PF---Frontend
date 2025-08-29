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
        selected={undefined}
        onSelect={onSelect}
        onMonthChange={salvarData}
        className="
          rounded-lg border 
          text-sm sm:text-base md:text-lg
          p-2 sm:p-4 md:p-6
          w-full max-w-full
          scale-95 sm:scale-100 md:scale-110
          [&_.rdp-cell:first-child]:pl-1 
          [&_.rdp-cell:last-child]:pr-1
          sm:[&_.rdp-cell:first-child]:pl-3 
          sm:[&_.rdp-cell:last-child]:pr-3
          [&_.rdp-cell]:p-1 sm:[&_.rdp-cell]:p-2 md:[&_.rdp-cell]:p-3
          [&_.rdp-cell]:rounded-full
        "
        disabled={{ before: today }}
        fixedWeeks
      />
    </div>
  );
};
