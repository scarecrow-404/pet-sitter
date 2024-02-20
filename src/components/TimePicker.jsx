// components/TimePicker.js
import React from "react";
import { format, addMinutes } from "date-fns";

const TimePicker = ({ onSelectTime, className }) => {
  // Generate an array of times for every 15 minutes until 23:45
  const times = Array.from({ length: 23 * 4 + 3 }, (_, index) => {
    // Calculate hours and minutes from index
    const hours = Math.floor(index / 4);
    const minutes = (index % 4) * 15;

    // Ensure the time doesn't exceed 23:45
    if (hours === 23 && minutes > 45) {
      return null; // Skip times after 23:45
    }

    const time = new Date();
    time.setHours(hours);
    time.setMinutes(minutes);

    const formattedTime = format(time, "HH:mm a");

    return formattedTime;
  }).filter((time) => time !== null);

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
