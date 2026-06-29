import React from "react"; // Evita el error de módulo global UMD
import { Box, Flex, Heading } from "@radix-ui/themes";
import { ItineraryTimelineCard } from "./ItineraryTimelineCard";

// interfaz de la actividad individual
interface ItineraryItem {
  id: string;
  dayNumber: number;
  startTime: string;
  durationMinutes: number;
  placeData: {
    title: string;
    category: string;
    imageSrc: string;
    rating: number;
    location: string;
    price: number;
  };
}

// Interfaz para las propiedades del componente de sección por día
interface DaySectionProps {
  dayNumber: number;
  dateLabel: string;
  items: ItineraryItem[];
}

export function ItineraryDaySection(props: DaySectionProps) {
  const { dayNumber, dateLabel, items } = props;

  // Ordenar los ítems cronológicamente por hora de inicio de forma automática
  const sortedItems = [...items].sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <Box className="mb-8">
      {/* Badge indicador del Día */}
      <Flex align="center" gap="3" className="mb-4">
        <span className="bg-[#085041] text-white text-xs font-bold px-3 py-1 rounded-full">
          Día {dayNumber}
        </span>
        <Heading size="3" className="text-gray-700 font-semibold">
          {dateLabel}
        </Heading>
      </Flex>

      {/* Contenedor de la Línea de Tiempo del Día */}
      <Flex direction="column" gap="2" className="pl-2">
        {sortedItems.length === 0 ? (
          <p className="text-xs text-gray-400 italic pl-28 py-2">
            No hay actividades asignadas para este día.
          </p>
        ) : (
          sortedItems.map((item) => (
            <ItineraryTimelineCard 
              key={item.id}
              startTime={item.startTime}
              durationMinutes={item.durationMinutes}
              title={item.placeData.title}
              category={item.placeData.category}
              imageSrc={item.placeData.imageSrc}
              rating={item.placeData.rating}
              distance={item.placeData.location}
              price={item.placeData.price}
            />
          ))
        )}
      </Flex>
    </Box>
  );
}