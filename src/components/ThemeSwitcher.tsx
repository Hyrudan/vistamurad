import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "blue", label: "Blue" },
];

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <select
      aria-label="Switch theme"
      value={theme}
      onChange={e => setTheme(e.target.value as any)}
      className="
        rounded 
        px-2 py-2 
        text-sm
        sm:text-base
        bg-gray-200 text-gray-800
        focus:outline-none focus:ring-2 focus:ring-pink-400
        transition
        w-full
        sm:w-auto
        mt-2
        sm:mt-0
        sm:ml-4
        cursor-pointer
      "
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
};

export default ThemeSwitcher;
