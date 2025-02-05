import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useState } from "react";

export function Calendar() {
  const currentDate = new Date();
  const [visibleMonth, setVisibleMonth] = useState(currentDate);

  const visibleDates: Date[] = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  });

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const isPastDate = (date: Date) => {
    const today = new Date(currentDate);
    today.setHours(0, 0, 0, 0);
    return isBefore(date, today);
  };

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
      <div className="calendar-grid">
        {visibleDates.map((day, index) => (
          <div
            className={`calendar-day ${
              !isCurrentMonth(day) ? "out-of-month" : ""
            } ${isPastDate(day) ? "inactive" : ""}`}
          >
            {index < 7 ? (
              <>
                {format(day, "E")} <br /> {format(day, "d")}
              </>
            ) : (
              format(day, "d")
            )}
          </div>
        ))}
      </div>
    </>
  );
}
