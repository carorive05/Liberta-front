import React from "react";
import { Card, Text, Flex, Button } from "@radix-ui/themes";
import { Calendar, Trash2, ArrowRight } from "lucide-react";

interface ItineraryCardProps {
  id: string;
  name: string;
  description?: string | null;
  createdAt: string | Date;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ItineraryCard(props: ItineraryCardProps) {
  const { id, name, description, createdAt, onView, onDelete } = props;

  const formattedDate = new Date(createdAt).toLocaleDateString("es-CR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card
      size="2"
      style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "16px",
      }}
      className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <Flex direction="column" gap="3">
        {/* Cabecera de la tarjeta */}
        <Flex justify="between" align="start">
          <Flex direction="column" gap="1">
            <Text className="text-lg font-bold text-gray-800">{name}</Text>
            <Text className="text-xs text-[#6B6B68] flex items-center gap-1.5">
              <Calendar size={14} /> Creado el {formattedDate}
            </Text>
          </Flex>
          
          {/* Botón de eliminar */}
          <Button 
            variant="soft" 
            color="red" 
            size="1"
            className="cursor-pointer hover:bg-red-100 p-1.5 rounded-md"
            onClick={(e) => {
              e.stopPropagation(); // Evita que se disparen otros clicks de la tarjeta
              onDelete(id);
            }}
          >
            <Trash2 size={16} />
          </Button>
        </Flex>

        <Text className="text-sm text-gray-600 font-light line-clamp-2">
          {description || "Sin descripción de viaje añadida."}
        </Text>

        {/* Botón de acción para cargar e ir a ver detalles */}
        <Flex justify="end" className="mt-2 border-t border-gray-100 pt-3">
          <Button 
            size="2" 
            style={{ backgroundColor: "#085041" }}
            className="cursor-pointer text-white flex items-center gap-1.5 rounded-lg px-4"
            onClick={() => onView(id)}
          >
            Ver itinerario <ArrowRight size={14} />
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}