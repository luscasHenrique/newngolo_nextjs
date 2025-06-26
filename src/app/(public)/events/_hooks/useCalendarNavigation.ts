// src/app/events/_hooks/useCalendarNavigation.ts
"use client";

import { useState, useCallback } from "react";

export const useCalendarNavigation = (initialDate?: Date) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    initialDate || new Date()
  );

  const goToPrevMonth = useCallback(() => {
    setCurrentMonth(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1)
    );
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1)
    );
  }, []);

  const goToToday = useCallback(() => {
    setCurrentMonth(new Date());
  }, []);

  return {
    currentMonth,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    setCurrentMonth, // Caso precise definir um mês específico de fora
  };
};
