// components/TimePicker.js
import React from "react";
import { format, addMinutes } from "date-fns";

const TimePicker = ({ onSelectTime, className }) => {
  // Generate an array of times for every 15 minutes in a day
  const times = Array.from({ length: 24 * 4 }, (_, index) => {
    const time = addMinutes(new Date(0), index * 15);
    const formattedTime = format(time, "HH:mm a");
    return formattedTime;
  });

  return (
    <select
      onChange={(e) => onSelectTime(e.target.value)}
      className={`time-picker ${className}`}
    >
      {times.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};

export default TimePicker;
