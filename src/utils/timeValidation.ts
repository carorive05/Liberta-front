// Convierte un string "HH:MM" a minutos totales desde la medianoche para facilitar las matemáticas
const timeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

interface ActivityItem {
  dayNumber: number;
  startTime: string; // "09:00"
  durationMinutes: number; // 240
}

// Devuelve true si la nueva actividad choca con alguna ya existente en el itinerario
export const checkTimeCollision = (newAct: ActivityItem, existingActivities: ActivityItem[]): boolean => {
  const newStart = timeToMinutes(newAct.startTime);
  const newEnd = newStart + newAct.durationMinutes;

  // Filtrar solo las actividades que corresponden al mismo día del viaje
  const sameDayActivities = existingActivities.filter(act => act.dayNumber === newAct.dayNumber);

  for (const act of sameDayActivities) {
    const actStart = timeToMinutes(act.startTime);
    const actEnd = actStart + act.durationMinutes;

    // Regla matemática de solapamiento de rangos
    if (newStart < actEnd && newEnd > actStart) {
      return true; // 💥 ¡Colisión detectada!
    }
  }

  return false; // ✅ Lapso libre
};