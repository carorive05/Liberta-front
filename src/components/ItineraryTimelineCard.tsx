import React from "react";
import { Card, Inset, Text, Flex, Badge } from "@radix-ui/themes";
import { ClockIcon } from "@radix-ui/react-icons";
import { Tag, MapPin } from "lucide-react"; 


interface TimelineCardProps {
  startTime: string;
  durationMinutes: number;
  title: string;
  category: string;
  imageSrc: string;
  rating: number;
  distance?: number | string;
  price: number;
}

export function ItineraryTimelineCard(props: TimelineCardProps) {
  const { 
    startTime, 
    durationMinutes, 
    title, 
    category, 
    imageSrc, 
    rating, 
    distance = "0", 
    price 
  } = props;

  const durationHours = durationMinutes / 60;

  return (
    <Flex gap="4" align="stretch" className="relative my-2 w-full">
      
      {/* 1. Indicador de la Línea de Tiempo  */}
      <Flex direction="column" align="center" className="w-24 shrink-0">
        <Flex align="center" gap="1" className="bg-[#085041] text-white px-2 py-1 rounded-md text-xs font-semibold">
          <ClockIcon />
          <span>{startTime}</span>
        </Flex>
        <Badge color="green" variant="soft" className="mt-1 text-[10px]">
          {durationHours} {durationHours === 1 ? "hora" : "horas"}
        </Badge>
        {/* Conector vertical */}
        <div className="w-0.5 bg-[#085041] grow mt-2 rounded-full min-h-[40px]" />
      </Flex>

      <Card
        size="2"
        style={{
          width: "100%",
          overflow: "hidden",
          backgroundColor: "white",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "row",
        }}
        className="shadow-sm border border-gray-200"
      >
        <Inset side="left" clip="padding-box">
          <img
            src={imageSrc}
            alt={title}
            style={{
              width: "200px", 
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Inset>

        <Flex className="flex-col p-2 pl-4 justify-between w-full">
          <div className="flex items-center justify-between">
            <Text className="text-sm text-[#6B6B68] flex items-center gap-1"> 
              <Tag className="p-0.5 w-4 h-4" /> {category}
            </Text>
            <Text className="text-sm text-[#6B6B68]">⭐ {rating}</Text>
          </div>
          
          <Text className="text-base font-bold text-gray-800">{title}</Text>

          <div className="flex items-center justify-between mt-2">
            <Text className="text-xs text-[#6B6B68] flex items-center gap-1"> 
              <MapPin className="p-0.5 w-4 h-4" /> {distance} km
            </Text>
            <Text className="text-xs font-bold text-gray-700">
              {price === 0 ? "Gratis" : `₡${price.toLocaleString()} / persona`}
            </Text>
          </div>
        </Flex>
      </Card>

    </Flex>
  );
}