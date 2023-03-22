import React, { useState } from "react";
import DayNightToggle from "react-day-and-night-toggle";

const Darknight = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <DayNightToggle
      onChange={() => setIsDarkMode(!isDarkMode)}
      checked={isDarkMode}
    />
  );
};
