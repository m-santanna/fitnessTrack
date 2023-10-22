"use client";
import React from "react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Moon from "../icons/Moon";
import Sun from "../icons/Sun";

const DarkThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => {
        theme === "dark" ? setTheme("light") : setTheme("dark");
      }}
      className="mx-2"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
};

export default DarkThemeToggle;
