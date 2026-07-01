import React, { useState, useEffect } from "react";
import { Theme, Box, Flex, Button, Card, Heading, Text } from "@radix-ui/themes";
import { Navbar } from "../components/NavBar";
import { ItineraryDaySection } from "../components/ItineraryDaySection";
import { tokenStorage } from "../utils/token";
import { checkTimeCollision } from "../utils/timeValidation"; 
import { ItineraryCard } from "../components/ItineraryCard";
import { Plus, FolderHeart } from "lucide-react";

export default function ItineraryDisplay() {

  //Estado para pasar del modo "editor" a un modo de vista
  const [activeTab, setActiveTab] = useState<"list" | "editor">("list");
  const [savedItineraries, setSavedItineraries] = useState<any[]>([]);
  const [loadingItineraries, setLoadingItineraries] = useState<boolean>(true);

  // Estados para el nombre y descripción del itinerario
  const [itineraryName, setItineraryName] = useState("Mi Itinerario");
  const [itineraryDescription, setItineraryDescription] = useState("Planifica tu viaje accesible por Costa Rica con tus actividades seleccionadas");
  
  // Lista de actividades dentro del itinerario actual, el que se esta creando
  const [itineraryItems, setItineraryItems] = useState<any[]>([]);

  // Estado para las actividades guardadas (las que el usuario guarda) disponibles para seleccionar
  const [savedPlaces, setSavedPlaces] = useState<any[]>([]);
  const [loadingSaved, setLoadingSaved] = useState<boolean>(true);

  // Form para añadir nueva actividad al itinerario
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>("");
  const [formDay, setFormDay] = useState<number>(1);
  const [formTime, setFormTime] = useState<string>("09:00");
  const [formDurationHours, setFormDurationHours] = useState<number>(2);

  const fetchUserItineraries = async () => {
    const userRaw = tokenStorage.getUser();
    const currentUserId = userRaw ? JSON.parse(userRaw).id : null;

    if (!currentUserId) return;

    try {
      setLoadingItineraries(true);
      const response = await fetch(`http://localhost:3000/api/itineraries?userId=${currentUserId}`, {
        headers: {
          "Authorization": `Bearer ${tokenStorage.getToken()}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.itineraries) {
          setSavedItineraries(result.itineraries);
        }
      }
    } catch (error) {
      console.error("Error al obtener la lista de itinerarios:", error);
    } finally {
      setLoadingItineraries(false);
    }
  };

  // Disparar la carga de itinerarios existentes al montar el componente
  useEffect(() => {
    fetchUserItineraries();
  }, []);

  // Borrar
  const handleDeleteItinerary = async (itineraryId: string) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar permanentemente este itinerario?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/itineraries/${itineraryId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${tokenStorage.getToken()}`
        }
      });

      const result = await response.json();
      if (result.success) {
        alert("¡Itinerario eliminado correctamente!");
        setSavedItineraries(prev => prev.filter(iti => iti.id !== itineraryId));
      } else {
        alert(`Error al eliminar: ${result.message}`);
      }
    } catch (error) {
      console.error("Error eliminando itinerario:", error);
    }
  };

  // Cargar temporalmente los textos de la cabecera del itinerario seleccionado
const handleViewItinerary = async (itineraryId: string) => {
    try {
      // Hacemos la petición para traer el itinerario completo con sus actividades
      const response = await fetch(`http://localhost:3000/api/itineraries/${itineraryId}`, {
        headers: {
          "Authorization": `Bearer ${tokenStorage.getToken()}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          // steteamos a los estados la info del itinerario seleccionado
          setItineraryName(result.data.name);
          setItineraryDescription(result.data.description || "");
          setItineraryItems(result.data.items || []); // En este van todas las activiffdades del itinerario
          setActiveTab("editor"); // Se cambia la pestaña para entrar al modo "edicion"
        }
      } else {
        alert("No se pudo cargar la información detallada de este itinerario.");
      }
    } catch (error) {
      console.error("Error cargando itinerario detallado:", error);
      alert("Ocurrió un error en la conexión al cargar el itinerario.");
    }
  };

  // Hook para cargar las actividades guardadas del usuario real para que aparezcan en el selector del form
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

  // Manejar la acción de añadir actividad validando colisiones (tiempo, dia), aqui se usó IA al igual que las funciones de timeValidation
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

  // Guardar el itinerario consolidado en el back
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
        fetchUserItineraries(); // Recarga la lista de itinerarios
        setActiveTab("list");   // devuelve a la pestaña principal
      } else {
        alert(`Error al guardar: ${result.message}`);
      }
    } catch (error) {
      console.error("Error guardando el itinerario:", error);
    }
  };

  const distinctDays = Array.from(new Set(itineraryItems.map(item => item.dayNumber))).sort((a, b) => a - b);

  return (
    <Theme>
      <Navbar />
      <Box p="6" style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
        <div className="max-w-6xl mx-auto">
          
          {activeTab === "list" && (
            <Box>
              <Flex justify="between" align="center" className="mb-8 border-b border-gray-200 pb-4">
                <Flex direction="column">
                  <Heading size="6" style={{ color: "#085041" }} className="font-bold">
                    Mis Itinerarios de Viaje
                  </Heading>
                  <Text size="2" color="gray">
                    Planifica tu viaje accesible por Costa Rica con tus actividades seleccionadas.
                  </Text>
                </Flex>

                <Button 
                  size="3" 
                  style={{ backgroundColor: "#085041" }}
                  className="cursor-pointer font-medium flex items-center gap-1.5 rounded-xl text-white px-4"
                  onClick={() => {
                    setItineraryName("Mi Nuevo Viaje");
                    setItineraryDescription("Planifica tu viaje accesible por Costa Rica con tus actividades seleccionadas");
                    setItineraryItems([]);
                    setActiveTab("editor");
                  }}
                >
                  <Plus size={18} /> Crear Nuevo Itinerario
                </Button>
                
              </Flex>

              {loadingItineraries ? (
                <Flex justify="center" p="8">
                  <Text size="2" color="gray" className="animate-pulse">Cargando tus rutas...</Text>
                </Flex>
              ) : savedItineraries.length === 0 ? (
                <Flex direction="column" align="center" justify="center" className="py-20 bg-white border-2 border-dashed border-gray-200 rounded-2xl gap-3">
                  <FolderHeart size={48} className="text-gray-300" />
                  <Text className="text-gray-500 font-medium">No tienes itinerarios creados todavía.</Text>
                  <Text className="text-xs text-gray-400">¡Presiona el botón de arriba para diseñar tu primer viaje!</Text>
                </Flex>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedItineraries.map((itinerary) => (
                    <ItineraryCard 
                      key={itinerary.id}
                      id={itinerary.id}
                      name={itinerary.name}
                      description={itinerary.description}
                      createdAt={itinerary.createdAt || new Date()}
                      onView={handleViewItinerary}
                      onDelete={handleDeleteItinerary}
                    />
                  ))}
                </div>
              )}
            </Box>
          )}

          {activeTab === "editor" && (
            <Box>
              {/* Cabecera del Itinerario */}
              <Flex justify="between" align="center" className="mb-6 border-b border-gray-200 pb-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#085041]">{itineraryName}</h1>
                  <p className="text-gray-500 text-sm">{itineraryDescription}</p>
                </div>

                <Flex gap="3">
                  <Button 
                    variant="outline" 
                    color="gray" 
                    size="3" 
                    className="cursor-pointer text-gray-700 border-gray-300"
                    onClick={() => setActiveTab("list")}
                  >
                    Volver a la lista
                  </Button>
                  <Button color="green" size="3" onClick={handleSaveItinerary} className="cursor-pointer bg-[#085041]">
                    Guardar Itinerario
                  </Button>
                </Flex>
              </Flex>

              {/* Layout principal: dos columnas */}
              <Flex gap="6" direction={{ initial: "column", md: "row" }} align="start">
                
                {/* Columna Izquierda , el form para crear itinerarios */}
                <Card className="w-full md:w-80 p-4 shrink-0 shadow-sm bg-white border border-gray-200 rounded-xl">
                  <Heading size="3" className="mb-4 text-gray-800">Planificador de itinerario</Heading>
                  
                  {loadingSaved ? (
                    <p className="text-xs text-gray-500">Cargando tus actividades guardadas...</p>
                  ) : savedPlaces.length === 0 ? (
                    <p className="text-xs text-gray-400 italic">Primero debes guardar destinos turísticos en tus favoritos para poder agregarlos aquí.</p>
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

                      <Button type="submit" className="w-full mt-2 cursor-pointer text-white bg-[#2fa318]">
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
            </Box>
          )}

        </div>
      </Box>
    </Theme>
  );
}