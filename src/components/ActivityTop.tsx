import React from "react";

import { Bookmark } from "lucide-react";
import { Eye, Ear, Accessibility } from "lucide-react";

type TypeAccesibility = "visual" | "motor" | "auditory";
type LevelAccesibility = "low" | "medium" | "high" | "no";
export type AccesibilityProps = Record<TypeAccesibility, LevelAccesibility>;

const accesibilityConfig: Record<
  TypeAccesibility,
  Record<LevelAccesibility, { label: string; levelLabel: string; icon: React.ElementType; color: string }>
> = {
  visual: {
    high:   { label: "Visual", levelLabel: "Acceso completo", icon: Eye, color: "bg-[#E1F5EE] text-[#085041]" },
    medium: { label: "Visual", levelLabel: "Acceso parcial", icon: Eye, color: "bg-[#faeeda] text-[#633806]" },
    low:    { label: "Visual", levelLabel: "Acceso bajo", icon: Eye, color: "bg-[#FCEBEB] text-[#791F1F]" },
    no:     { label: "Visual", levelLabel: "Sin acceso", icon: Eye, color: "bg-[#eeeeee] text-[#999999]" }

  },
  motor: {
    high:   { label: "Motora", levelLabel: "Acceso completo", icon: Accessibility, color: "bg-[#E1F5EE] text-[#085041]" },
    medium: { label: "Motora", levelLabel: "Acceso parcial", icon: Accessibility, color: "bg-[#faeeda] text-[#633806]" },
    low:    { label: "Motora", levelLabel: "Acceso bajo", icon: Accessibility, color: "bg-[#FCEBEB] text-[#791F1F]" },
    no:     { label: "Motora", levelLabel: "Sin acceso", icon: Accessibility, color: "bg-[#eeeeee] text-[#999999]" }
  },
  auditory: {
    high:   { label: "Auditiva", levelLabel: "Acceso completo", icon: Ear, color: "bg-[#E1F5EE] text-[#085041]" },
    medium: { label: "Auditiva", levelLabel: "Acceso parcial", icon: Ear, color: "bg-[#faeeda] text-[#633806]" },
    low:    { label: "Auditiva", levelLabel: "Acceso bajo", icon: Ear, color: "bg-[#FCEBEB] text-[#791F1F]" },
    no:     { label: "Auditiva", levelLabel: "Sin acceso", icon: Ear, color: "bg-[#eeeeee] text-[#999999]" }
  },
};

interface ActivityTopProps {
  id: number;
  imageSrc: string;
  title: string;
  category: string;
  distance: number;
  rating: number;
  ubication: string;
  accesibility?: AccesibilityProps;
  isSaved?: boolean;
  loading?: boolean;
  onSave?: () => void;
}

export default function ActivityTop({
  imageSrc,
  title,
  category,
  distance,
  rating,
  ubication,
  accesibility,
  isSaved = false,
  loading = false,
  onSave,
}: ActivityTopProps) {
  return (
    <section className="border-b-2 border-gray-200">

      <img
        src={imageSrc}
        alt={title}
        style={{ width: "100%", height: "400px", objectFit: "cover", display: "block" }}
      />

      <div className="flex flex-col p-3 gap-2">
        <p className="text-lg font-bold">{title}</p>

        <div className="flex items-center gap-5">
          <span className="text-sm text-gray-800">{ubication}</span>
          <span className="text-sm text-gray-800">{distance} km</span>
          <span className="text-sm text-gray-800">{category}</span>
          <span className="text-sm text-gray-800">⭐ {rating}</span>
        </div>

        <div className="flex gap-2 justify-between">
          {accesibility && (
            <div className="flex gap-2 flex-wrap">
              {(Object.entries(accesibility) as [TypeAccesibility, LevelAccesibility][]).map(
                ([type, level]) => {
                  const config = accesibilityConfig[type][level];
                  return (
                    <span
                      key={type}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium ${config.color}`}
                    >
                      <config.icon size={14} />
                      <span className="flex gap-2 leading-tight">
                        <span className="font-semibold">{config.label}</span>
                        <span className="font-normal">{config.levelLabel}</span>
                      </span>
                    </span>
                  );
                }
              )}
            </div>
          )}

          <button
            onClick={onSave} disabled={loading}
            className="flex gap-2 items-center bg-[#1D9E75] px-4 py-2 rounded-xl text-white text-sm font-medium disabled:opacity-50"
          >
            <Bookmark size={16} color="#ffffff" fill={isSaved ? "#ffffff" : "none"} />
            {loading ? "Procesando..." : isSaved ? "Guardado" : "Guardar"}
          </button>
        </div>
      </div>
    </section>
  );
}
