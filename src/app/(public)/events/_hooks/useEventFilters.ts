// src/app/events/_hooks/useEventFilters.ts
"use client";

import { useState, useMemo } from "react";
import type { Event, EventFiltersState } from "../types/Event";
import {
  isValid,
  parse,
  isSameDay,
  isSameMonth,
  isSameYear,
  isBefore,
  isAfter,
  startOfDay,
  endOfDay,
} from "date-fns"; // Adicionado startOfDay, endOfDay, isBefore, isAfter
import { ptBR } from "date-fns/locale";

export const useEventFilters = (events: Event[]) => {
  const [filters, setFilters] = useState<EventFiltersState>({
    searchTerm: "",
    category: "all",
    isOnlineFilter: "all",
  });

  const filteredEvents = useMemo(() => {
    let tempFiltered = events;
    const lowerCaseSearchTerm = filters.searchTerm.toLowerCase();

    let parsedDate: Date | null = null;
    if (lowerCaseSearchTerm) {
      const possibleFormats = [
        "dd/MM/yyyy",
        "dd-MM-yyyy",
        "d/M/yyyy",
        "d-M-yyyy",
        "MM/yyyy",
        "M/yyyy",
        "yyyy-MM-dd",
        "yyyy", // Para pesquisar apenas o ano
      ];

      for (const formatStr of possibleFormats) {
        const dateAttempt = parse(lowerCaseSearchTerm, formatStr, new Date(), {
          locale: ptBR,
        });
        if (isValid(dateAttempt)) {
          parsedDate = dateAttempt;
          break;
        }
      }

      if (!parsedDate) {
        const monthNamesPt = [
          "janeiro",
          "fevereiro",
          "março",
          "abril",
          "maio",
          "junho",
          "julho",
          "agosto",
          "setembro",
          "outubro",
          "novembro",
          "dezembro",
        ];
        const monthIndex = monthNamesPt.indexOf(lowerCaseSearchTerm);
        if (monthIndex !== -1) {
          parsedDate = new Date(new Date().getFullYear(), monthIndex, 1);
        }
      }
    }

    if (lowerCaseSearchTerm) {
      tempFiltered = tempFiltered.filter((event) => {
        // --- Filtro por DATA ---
        if (parsedDate) {
          const eventStartDate = new Date(event.dateStart);
          const eventEndDate = new Date(event.dateEnd);

          // Verifica se o dia pesquisado está dentro do período do evento
          // startOfDay e endOfDay são usados para comparar apenas a data, ignorando a hora
          const searchDayStart = startOfDay(parsedDate);
          const searchDayEnd = endOfDay(parsedDate);

          // Um evento é incluído se:
          // 1. Ele começa ou termina no dia pesquisado (isSameDay)
          // 2. Ou se o dia pesquisado está entre o início e o fim do evento (isAfter start AND isBefore end)
          // 3. Ou se o evento envolve o mês e ano pesquisados (se parsedDate for apenas mês/ano)
          // 4. Ou se o evento envolve o ano pesquisado (se parsedDate for apenas ano)

          const isEventOnSearchDay =
            isSameDay(eventStartDate, parsedDate) ||
            isSameDay(eventEndDate, parsedDate);

          const isSearchDayBetweenEventDates =
            isAfter(searchDayStart, startOfDay(eventStartDate)) &&
            isBefore(searchDayEnd, endOfDay(eventEndDate));

          // Lógica para pesquisa por Mês/Ano ou Apenas Ano (se parsedDate for o 1º dia do mês/ano)
          const isParsedDateMonthAndYearOnly =
            parsedDate.getDate() === 1 &&
            parsedDate.getHours() === 0 &&
            parsedDate.getMinutes() === 0;
          const isParsedDateYearOnly =
            isParsedDateMonthAndYearOnly && parsedDate.getMonth() === 0;

          if (
            isEventOnSearchDay ||
            isSearchDayBetweenEventDates ||
            (isParsedDateMonthAndYearOnly &&
              isSameMonth(eventStartDate, parsedDate) &&
              isSameYear(eventStartDate, parsedDate)) ||
            (isParsedDateYearOnly && isSameYear(eventStartDate, parsedDate))
          ) {
            return true;
          }
        }

        // --- Filtro por TEXTO ---
        return (
          event.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          event.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          event.location.toLowerCase().includes(lowerCaseSearchTerm) ||
          event.speakers?.some((speaker) =>
            speaker.toLowerCase().includes(lowerCaseSearchTerm)
          ) ||
          event.tags?.some((tag) =>
            tag.toLowerCase().includes(lowerCaseSearchTerm)
          )
        );
      });
    }

    if (filters.category !== "all") {
      tempFiltered = tempFiltered.filter(
        (event) => event.category === filters.category
      );
    }

    if (filters.isOnlineFilter === "online") {
      tempFiltered = tempFiltered.filter((event) => event.isOnline);
    } else if (filters.isOnlineFilter === "presential") {
      tempFiltered = tempFiltered.filter((event) => !event.isOnline);
    }

    // Ordenar eventos por data de início
    tempFiltered.sort(
      (a, b) =>
        new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
    );

    return tempFiltered;
  }, [events, filters]);

  return {
    filters,
    setFilters,
    filteredEvents,
  };
};
