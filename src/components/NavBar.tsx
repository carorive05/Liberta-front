import React,{ useState } from "react";
import { Search, Settings } from "lucide-react";

export function Navbar() {
  const [active, setActive] = useState("Inicio");

  const links = ["Inicio", "Buscar", "Guardados", "Mi Itinerario"];

  return (
    <nav className="bg-white border-b-2 border-[#085041] px-6 h-14 flex items-center justify-between">

      <span className="text-[#085041] font-bold text-xl">liberta</span>

      <ul className="flex items-center gap-1 list-none m-0 p-0">
        {links.map((link) => (
          <li key={link}>
            <button
              onClick={() => setActive(link)}
              className={`px-3 py-1.5 rounded-md text-sm cursor-pointer transition-colors
                ${active === link
                  ? "bg-[#E1F5EE] text-[#085041] font-medium"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {link}
            </button>
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

        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#085041] text-[#085041] text-sm hover:bg-[#E1F5EE] transition-colors">
          <Settings size={14} />
          Accesibilidad
        </button>

      </div>
    </nav>
  );
}