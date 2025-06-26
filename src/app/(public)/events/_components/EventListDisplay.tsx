// src/app/events/_components/EventListDisplay.tsx
"use client";

import { useState, useCallback } from "react";
import { useEventFilters } from "../_hooks/useEventFilters";
import { useCalendarNavigation } from "../_hooks/useCalendarNavigation";
import type { Event } from "../types/Event";
import EventListView from "./EventListView";
import CalendarView from "./CalendarView";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface EventListDisplayProps {
  initialEvents: Event[];
  availableCategories: string[];
}

const EventListDisplay: React.FC<EventListDisplayProps> = ({
  initialEvents,
  availableCategories,
}) => {
  const { filters, setFilters, filteredEvents } =
    useEventFilters(initialEvents);
  const { currentMonth, setCurrentMonth } = useCalendarNavigation();

  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({ ...prev, searchTerm: e.target.value }));
    },
    [setFilters]
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      setFilters((prev) => ({ ...prev, category: value }));
    },
    [setFilters]
  );

  const handleOnlineFilterChange = useCallback(
    (value: "all" | "online" | "presential") => {
      setFilters((prev) => ({ ...prev, isOnlineFilter: value }));
    },
    [setFilters]
  );

  const handleEventClick = useCallback((event: Event) => {
    window.location.href = `/events/${event.id}`;
  }, []);

  return (
    <>
      {/* Seção de Filtros e Controles de Visualização */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Input
          type="text"
          placeholder="Pesquisar por título, descrição, local ou palestrante..."
          value={filters.searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-2/3"
        />

        <Select value={filters.category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full md:w-1/3">
            <SelectValue placeholder="Todas as Categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Categorias</SelectItem>
            {availableCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.isOnlineFilter}
          onValueChange={handleOnlineFilterChange}
        >
          <SelectTrigger className="w-full md:w-1/3">
            <SelectValue placeholder="Todos os Tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Tipos</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="presential">Presencial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* O componente Tabs deve envolver tanto TabsList quanto TabsContent */}
        <Tabs
          value={viewMode}
          onValueChange={(value) => setViewMode(value as "list" | "calendar")}
          className="w-full  flex"
        >
          <TabsList>
            <TabsTrigger value="list">Visualização em Lista</TabsTrigger>
            <TabsTrigger value="calendar">
              Visualização em Calendário
            </TabsTrigger>
          </TabsList>

          {/* As TabsContent DEVEM estar dentro do Tabs */}
          {/* Remova as classes 'block'/'hidden' aqui, o shadcn/ui já faz isso */}
          <TabsContent value="list">
            <EventListView events={filteredEvents} />
          </TabsContent>
          <TabsContent value="calendar">
            <CalendarView
              currentMonth={currentMonth}
              events={filteredEvents}
              onMonthChange={setCurrentMonth}
              onEventClick={handleEventClick}
            />
          </TabsContent>
        </Tabs>{" "}
        {/* <-- AQUI TERMINA O COMPONENTE TABS */}
      </div>
    </>
  );
};

export default EventListDisplay;
