import React, { useState } from "react";
import { Search, Settings } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { name: "Inicio", path: "/" },
  { name: "Buscar", path: "/search" },
  { name: "Guardados", path: "/keep" },
  { name: "Mi itinerario", path: "/itinerary" },
];

export function Navbar() {

  return (
    <nav className="bg-white border-b-2 border-[#085041] px-6 h-14 flex items-center justify-between">

      <span className="text-[#085041] font-medium text-xl">liberta</span>

      <ul className="flex gap-2">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm cursor-pointer transition-colors ${isActive
                  ? "bg-[#E1F5EE] text-[#085041] font-medium"
                  : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">

        <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 w-52">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            placeholder="Buscar actividades..."
            className="text-sm outline-none w-full text-gray-700 placeholder-gray-400"
          />
        </div>

        <Link
          to="/settings"
          className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#085041] text-[#085041] text-sm hover:bg-[#E1F5EE] transition-colors"
        >
          <Settings size={14} />
          Accesibilidad
        </Link>

      </div>
    </nav>
  );
}