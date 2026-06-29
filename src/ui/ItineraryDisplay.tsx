import React, { useState, useEffect } from "react";
import { Theme, Box, Flex, Button, Card, Heading, Badge } from "@radix-ui/themes";
import { Navbar } from "../components/NavBar";
import { ItineraryDaySection } from "../components/ItineraryDaySection";
import { tokenStorage } from "../utils/token";
import { checkTimeCollision } from "../utils/timeValidation"; 

export default function ItineraryDisplay() {
  const [itineraryName, setItineraryName] = useState("Mi Itinerario");
  const [itineraryDescription, setItineraryDescription] = useState("Planifica tu viaje accesible por Costa Rica con tus actividades seleccionadas");
  
  // Lista de actividades dentro del itinerario actual
  const [itineraryItems, setItineraryItems] = useState<any[]>([]);

  // Estado para las actividades guardadas (las que el usuario guarda) disponibles para seleccionar
  const [savedPlaces, setSavedPlaces] = useState<any[]>([]);
  const [loadingSaved, setLoadingSaved] = useState<boolean>(true);

  // Form  para añadir nueva actividad al itinerario
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>("");
  const [formDay, setFormDay] = useState<number>(1);
  const [formTime, setFormTime] = useState<string>("09:00");
  const [formDurationHours, setFormDurationHours] = useState<number>(2);

  // Hook para cargar las actividades guardadas del usuario real, luego lo cambiamos de archivo, es bastante parecido al de keepdisplay
  useEffect(() => {
    const userRaw = tokenStorage.getUser();
    const currentUserId = userRaw ? JSON.parse(userRaw).id : null;

    if (!currentUserId) return;

    const fetchSavedPlaces = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/places/saved/${currentUserId}`, {
          headers: {
            "Authorization": `Bearer ${tokenStorage.getToken()}`
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (result.ok && result.data) {
            setSavedPlaces(result.data);
            if (result.data.length > 0) setSelectedPlaceId(result.data[0].id);
          }
        }
      } catch (error) {
        console.error("Error al traer favoritos para el itinerario:", error);
      } finally {
        setLoadingSaved(false);
      }
    };

    fetchSavedPlaces();
  }, []);

  // Manejar la acción de añadir actividad validando colisiones (tiempo, dia)
  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();

    const targetPlace = savedPlaces.find(p => p.id === selectedPlaceId);
    if (!targetPlace) {
      alert("Por favor selecciona una actividad válida.");
      return;
    }

    const durationMinutes = formDurationHours * 60;

    const newActivityPayload = {
      dayNumber: formDay,
      startTime: formTime,
      durationMinutes: durationMinutes
    };

    // Formateamos los items actuales para pasárselos a la función de colisión
    const existingActivitiesFormat = itineraryItems.map(item => ({
      dayNumber: item.dayNumber,
      startTime: item.startTime,
      durationMinutes: item.durationMinutes
    }));

    const hasCollision = checkTimeCollision(newActivityPayload, existingActivitiesFormat);

    if (hasCollision) {
      alert(`Choque de Horarios, no se puede agregar "${targetPlace.title}" a las ${formTime} porque coincide con otra actividad ya agendada en tu Día ${formDay}.`);
      return;
    }

    // Si no hay colisión, creamos la estructura visual completa
    const newItem = {
      id: crypto.randomUUID(),
      activityId: targetPlace.id,
      dayNumber: formDay,
      startTime: formTime,
      durationMinutes: durationMinutes,
      placeData: {
        title: targetPlace.title,
        category: targetPlace.category || "Destino",
        imageSrc: targetPlace.imageSrc || targetPlace.image,
        rating: targetPlace.rating || 5.0,
        location: targetPlace.ubication || targetPlace.location,
        price: targetPlace.price || 0
      }
    };

    setItineraryItems([...itineraryItems, newItem]);
  };

  //  Guardar el itinerario consolidado en el Backend
  const handleSaveItinerary = async () => {
    const userRaw = tokenStorage.getUser();
    const currentUserId = userRaw ? JSON.parse(userRaw).id : null;

    if (!currentUserId) {
      alert("Debes iniciar sesión para guardar tu itinerario.");
      return;
    }

    const payload = {
      userId: currentUserId,
      name: itineraryName,
      description: itineraryDescription,
      items: itineraryItems.map((item, index) => ({
        activityId: item.activityId,
        dayNumber: item.dayNumber,
        startTime: item.startTime,
        durationMinutes: item.durationMinutes,
        order: index
      }))
    };

    try {
      const response = await fetch("http://localhost:3000/api/itineraries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenStorage.getToken()}`
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        alert("¡Itinerario guardado con éxito en la base de datos! Buen viaje!");
      } else {
        alert(`Error al guardar: ${result.message}`);
      }
    } catch (error) {
      console.error("Error guardando el itinerario:", error);
    }
  };

  // Obtener la lista única de días agendados para renderizar las secciones de forma dinámica
  const distinctDays = Array.from(new Set(itineraryItems.map(item => item.dayNumber))).sort((a, b) => a - b);

  return (
    <Theme>
      <Navbar />
      <Box p="6" style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
        <div className="max-w-6xl mx-auto">
          
          {/* Cabecera del Itinerario */}
          <Flex justify="between" align="center" className="mb-6 border-b border-gray-200 pb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#085041]">{itineraryName}</h1>
              <p className="text-gray-500 text-sm">{itineraryDescription}</p>
            </div>
            <Button color="green" size="3" onClick={handleSaveItinerary} className="cursor-pointer bg-[#085041]">
              Guardar Itinerario
            </Button>
          </Flex>

          {/* Layout principal: dos columnas (izquierda: El form para seleccionar, derecha: el itinerario en tiempo reeal) */}
          <Flex gap="6" direction={{ initial: "column", md: "row" }} align="start">
            
            {/* Columna Izquierda */}
            <Card className="w-full md:w-80 p-4 shrink-0 shadow-sm bg-white border border-gray-200 rounded-xl">
              <Heading size="3" className="mb-4 text-gray-800">Planificador de itinerario</Heading>
              
              {loadingSaved ? (
                <p className="text-xs text-gray-500">Cargando tus actividades guardadas...</p>
              ) : savedPlaces.length === 0 ? (
                <p className="text-xs text-gray-400 italic">Primero debes guardar destinos turísticos en tus favoritos para poder agendarlos aquí.</p>
              ) : (
                <form onSubmit={handleAddActivity} className="flex flex-col gap-6">
                  
                  {/* Selector de Actividad */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-600">Seleccionar Destino:</label>
                    <select 
                      value={selectedPlaceId} 
                      onChange={(e) => setSelectedPlaceId(e.target.value)}
                      className="w-full text-xs p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:border-[#085041]"
                    >
                      {savedPlaces.map((place) => (
                        <option key={place.id} value={place.id}>{place.title}</option>
                      ))}
                    </select>
                  </div>

                  {/* Fila para Día y Duración */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-gray-600">Día del Viaje:</label>
                      <input 
                        type="number" 
                        min="1" 
                        value={formDay} 
                        onChange={(e) => setFormDay(Number(e.target.value))}
                        className="w-full text-xs p-2 border border-gray-300 rounded-md text-center bg-gray-50"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-gray-600">Duración (Horas):</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="12"
                        value={formDurationHours} 
                        onChange={(e) => setFormDurationHours(Number(e.target.value))}
                        className="w-full text-xs p-2 border border-gray-300 rounded-md text-center bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Selector de Hora Nativo */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-600">Hora de Inicio:</label>
                    <input 
                      type="time" 
                      value={formTime} 
                      onChange={(e) => setFormTime(e.target.value)}
                      className="w-full text-xs p-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>

                  <Button type="submit" className="w-full mt-2 cursor-pointer bg-[#2fa318]">
                    + Agregar a la Agenda
                  </Button>
                </form>
              )}
            </Card>

            {/* Columna derecha */}
            <Box className="grow w-full">
              {itineraryItems.length === 0 ? (
                <div className="text-center py-16 bg-white border-2 border-dashed border-gray-200 rounded-2xl">
                  <p className="text-gray-400 font-light text-sm">Tu itinerario está vacío.</p>
                  <p className="text-xs text-gray-400 mt-1">Usa el planificador de la izquierda para acomodar tus paradas.</p>
                </div>
              ) : (
                distinctDays.map((day) => (
                  <ItineraryDaySection 
                    key={day} 
                    dayNumber={day} 
                    dateLabel={`Día asignado (aqui va la fecha)`} 
                    items={itineraryItems.filter(i => i.dayNumber === day)} 
                  />
                ))
              )}
            </Box>

          </Flex>
        </div>
      </Box>
    </Theme>
  );
}