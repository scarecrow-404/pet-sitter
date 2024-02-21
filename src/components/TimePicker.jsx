// components/TimePicker.js
import React from "react";
import { format } from "date-fns";

const TimePicker = ({ onSelectTime, className }) => {
  // Generate an array of times for every 15 minutes from 7:00 to 23:30
  const times = Array.from({ length: 17 * 4 }, (_, index) => {
    // Calculate hours and minutes from index
    const hours = Math.floor(index / 4) + 7; // Start from 7:00
    const minutes = (index % 4) * 15;

    // Ensure the time doesn't exceed 23:30
    if (hours === 23 && minutes > 30) {
      return null; // Skip times after 23:30
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
