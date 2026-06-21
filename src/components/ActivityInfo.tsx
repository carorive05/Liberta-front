import React from "react";
import { CircleDollarSign, Clock, Calendar, UsersRound } from "lucide-react";

interface InfoCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function InfoCard({ icon: Icon, label, value }: InfoCardProps) {
  return (
    <div className="bg-gray-200 border-2 border-gray-200 rounded-2xl p-4 flex flex-col gap-1">
      <Icon color="#1D9E75" size={20} />
      <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">{label}</p>
      <p className="text-sm text-gray-800">{value}</p>
    </div>
  );
}

interface ActivityInfoProps {
  description: string;
  price: number;
  schedule: string;
  reservation: string;
  maxGroup: number;
}

export default function ActivityInfo({
  description,
  price,
  schedule,
  reservation,
  maxGroup,
}: ActivityInfoProps) {
  return (
    <section className="border-b-2 border-gray-200 p-3 mt-2">
      <h2 className="text-lg font-semibold mb-2">Sobre esta actividad</h2>
      <p className="text-sm text-gray-600">{description}</p>

      <div className="grid grid-cols-2 gap-3 mt-3 mb-2 text-[#6B6B68]">
        <InfoCard icon={CircleDollarSign} label="Precio"       value={`₡${price.toLocaleString()} / persona`} />
        <InfoCard icon={Clock}           label="Horario"       value={schedule} />
        <InfoCard icon={Calendar}        label="Reserva"       value={reservation} />
        <InfoCard icon={UsersRound}      label="Grupo máx."   value={`${maxGroup} personas`} />
      </div>
    </section>
  );
}
