import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMinute,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useState } from "react";

export function Calendar() {
  const currentDate = new Date();
  const [visibleMonth, setVisibleMonth] = useState(currentDate);

  const visibleDates: Date[] = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate)),
  });

  return (
    <>
      <div className="calendar-header">
        <button
          aria-label="go-to-current-month-btn"
          className="today-btn"
          onClick={() => setVisibleMonth(currentDate)}
        >
          Today
        </button>
        <button
          className="change-current-month-btn"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
        >
          {"<"}
        </button>
        <button
          className="change-current-month-btn"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
        >
          {">"}
        </button>
        <span>{format(new Date(visibleMonth), "MMMM yyyy")}</span>
      </div>
    </>
  );
}
