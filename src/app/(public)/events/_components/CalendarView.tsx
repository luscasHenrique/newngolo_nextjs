// src/app/events/_components/CalendarView.tsx
"use client";

import React, { useState, useMemo } from "react";
import type { Event } from "../types/Event"; // Caminho corrigido para _types
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { isWithinInterval, startOfDay, endOfDay, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link"; // Importar Link para o botão "Ver Detalhes do Evento" no modal do dia

interface CalendarViewProps {
  currentMonth: Date;
  events: Event[];
  onMonthChange: (newMonth: Date) => void;
  onEventClick: (event: Event) => void; // Este callback original é para se o CalendarView navegasse.
  // Como estamos usando o modal e um botão Link, este pode não ser mais estritamente necessário para o fluxo atual,
  // mas é mantido como prop caso a lógica de navegação mude no futuro.
}

const CalendarView: React.FC<CalendarViewProps> = ({
  currentMonth,
  events,
  onMonthChange,
  onEventClick, // Mantido como prop
}) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);

  const getCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDayOfWeek = firstDayOfMonth.getDay();
    const days: (Date | null)[] = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    while (days.length % 7 !== 0) {
      days.push(null);
    }
    return days;
  };

  const calendarDays = useMemo(
    () => getCalendarDays(currentMonth),
    [currentMonth]
  );

  const goToPrevMonth = () =>
    onMonthChange(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  const goToNextMonth = () =>
    onMonthChange(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  const currentMonthName = currentMonth.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const handleDayCellClick = (day: Date) => {
    setSelectedDay(day);
    setIsDayModalOpen(true);
  };

  const eventsForSelectedDay = useMemo(() => {
    if (!selectedDay) return [];
    return events
      .filter((event) => {
        const eventStartDate = new Date(event.dateStart);
        const eventEndDate = new Date(event.dateEnd);
        return isWithinInterval(selectedDay, {
          start: startOfDay(eventStartDate),
          end: endOfDay(eventEndDate),
        });
      })
      .sort(
        (a, b) =>
          new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
      );
  }, [selectedDay, events]);

  const handleEventClickInCell = (event: Event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
    setIsDayModalOpen(false); // Fecha o modal do dia se estiver aberto
  };

  return (
    <>
      <Card className="p-4">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Button variant="outline" onClick={goToPrevMonth}>
            Anterior
          </Button>
          <CardTitle className="text-2xl font-bold capitalize">
            {currentMonthName}
          </CardTitle>
          <Button variant="outline" onClick={goToNextMonth}>
            Próximo
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mb-2">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <div key={day} className="py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const isDayOfCurrentMonth =
                day && day.getMonth() === currentMonth.getMonth();
              const dayKey = day ? day.toISOString() : `empty-${index}`;

              const dayEvents = isDayOfCurrentMonth
                ? events.filter((event) => {
                    const eventStartDate = new Date(event.dateStart);
                    const eventEndDate = new Date(event.dateEnd);
                    return isWithinInterval(day!, {
                      start: startOfDay(eventStartDate),
                      end: endOfDay(eventEndDate),
                    });
                  })
                : [];

              const isToday =
                day && day.toDateString() === new Date().toDateString();

              return (
                <div
                  key={dayKey}
                  className={`h-28 p-1 rounded-md overflow-hidden relative ${
                    isDayOfCurrentMonth
                      ? "bg-gray-100 hover:bg-gray-200 transition-colors"
                      : "bg-gray-50"
                  } ${isToday ? "border-2 border-green-500 bg-green-50" : ""}
                     ${isDayOfCurrentMonth ? "cursor-pointer" : ""}`}
                  onClick={() => day && handleDayCellClick(day)}
                >
                  {day && (
                    <>
                      <div
                        className={`text-sm font-bold ${
                          isToday ? "text-green-700" : "text-gray-800"
                        }`}
                      >
                        {day.getDate()}
                      </div>
                      <div className="flex flex-col gap-1 mt-1 text-xs">
                        {dayEvents.slice(0, 2).map((event) => (
                          <p
                            key={event.id}
                            className="bg-green-500 text-white px-1 py-0.5 rounded truncate cursor-pointer hover:bg-green-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Não chama handleEventClickInCell aqui se você quer ir direto para a página.
                              // Em vez disso, o Link abaixo cuidará disso.
                              onEventClick(event); // Usa a prop onEventClick para navegar
                            }}
                            title={`${event.title} (${new Date(
                              event.dateStart
                            ).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })} - ${new Date(event.dateEnd).toLocaleTimeString(
                              "pt-BR",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )})`}
                          >
                            {event.title}
                          </p>
                        ))}
                        {dayEvents.length > 2 && (
                          <p
                            className="text-green-500 font-bold cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDayCellClick(day);
                            }}
                          >
                            +{dayEvents.length - 2} mais
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalhes do Evento Único */}
      <Dialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEvent.title}</DialogTitle>
                <DialogDescription>
                  {/* CORREÇÃO DO ERRO AQUI: Separe data e hora para toLocaleDateString e toLocaleTimeString */}
                  🗓️{" "}
                  {new Date(selectedEvent.dateStart).toLocaleDateString(
                    "pt-BR",
                    { dateStyle: "full" } // dateStyle para toLocaleDateString
                  )}{" "}
                  às{" "}
                  {new Date(selectedEvent.dateStart).toLocaleTimeString(
                    "pt-BR",
                    { hour: "2-digit", minute: "2-digit" } // timeStyle para toLocaleTimeString
                  )}
                  {new Date(selectedEvent.dateStart).toDateString() !==
                    new Date(selectedEvent.dateEnd).toDateString() &&
                    ` - ${new Date(selectedEvent.dateEnd).toLocaleDateString(
                      "pt-BR",
                      { dateStyle: "full" }
                    )} às ${new Date(selectedEvent.dateEnd).toLocaleTimeString(
                      "pt-BR",
                      { hour: "2-digit", minute: "2-digit" }
                    )}`}
                  {selectedEvent.location && ` | 📍 ${selectedEvent.location}`}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-gray-700 mb-2">
                  {selectedEvent.longDescription || selectedEvent.description}
                </p>
                <div className="flex flex-wrap gap-2 text-sm mt-3">
                  <span className="p-1 px-3 bg-green-100 text-green-800 rounded-full font-semibold">
                    {selectedEvent.category}
                  </span>
                  {selectedEvent.isOnline && (
                    <span className="p-1 px-3 bg-blue-100 text-blue-800 rounded-full font-semibold">
                      Online
                    </span>
                  )}
                  {selectedEvent.speakers &&
                    selectedEvent.speakers.length > 0 && (
                      <span className="p-1 px-3 bg-gray-100 text-gray-700 rounded-full">
                        Palestrantes: {selectedEvent.speakers.join(", ")}
                      </span>
                    )}
                </div>
                <div className="mt-4 flex gap-2">
                  {/* Este botão já leva para a página de detalhes */}
                  <Button asChild>
                    <Link href={`/events/${selectedEvent.id}`}>
                      Ver Página do Evento
                    </Link>
                  </Button>
                  {selectedEvent.registrationLink && (
                    <Button asChild variant="outline">
                      <a
                        href={selectedEvent.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Inscrever-se
                      </a>
                    </Button>
                  )}
                  {selectedEvent.materialsLink && (
                    <Button asChild variant="outline">
                      <a
                        href={selectedEvent.materialsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Materiais
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal para Ver Todos os Eventos de um Dia Específico */}
      <Dialog open={isDayModalOpen} onOpenChange={setIsDayModalOpen}>
        <DialogContent className="sm:max-w-md md:max-w-xl lg:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Eventos em{" "}
              {selectedDay ? format(selectedDay, "PPPP", { locale: ptBR }) : ""}
            </DialogTitle>
            <DialogDescription>
              Todos os eventos agendados para este dia.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {eventsForSelectedDay.length === 0 ? (
              <p className="text-center text-gray-600">
                Nenhum evento neste dia.
              </p>
            ) : (
              eventsForSelectedDay.map((event) => (
                <div
                  key={event.id}
                  className="border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
                >
                  <h4 className="text-lg font-semibold text-gray-800">
                    {event.title}
                  </h4>
                  <p className="text-sm text-green-600">
                    {format(new Date(event.dateStart), "HH:mm", {
                      locale: ptBR,
                    })}{" "}
                    -{" "}
                    {format(new Date(event.dateEnd), "HH:mm", { locale: ptBR })}
                    {event.location && ` | ${event.location}`}
                  </p>
                  <p className="text-gray-700 text-sm mt-1 line-clamp-2">
                    {event.description}
                  </p>
                  {/* Botão para ir para a página de detalhes do evento */}
                  <Button
                    asChild
                    variant="link"
                    className="px-0 h-auto mt-2 text-green-600 hover:underline"
                  >
                    <Link href={`/events/${event.id}`}>
                      Ver Detalhes do Evento →
                    </Link>
                  </Button>
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsDayModalOpen(false)}
              variant={"outline"}
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalendarView;
