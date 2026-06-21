import React from "react";

import { Theme, Box } from "@radix-ui/themes";
import { Search } from "lucide-react";

import { Navbar } from "../components/NavBar";

export default function SearchDisplay() {
    return (
        <Theme >
            <Navbar />
            <Box p="4" style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>

                <div className="flex flex-col justify-self-center-safe items-center gap-4 text-center pt-30">
                    <h1 className="font-semibold text-2xl"> Buscar actividades </h1>

                    <p className="font-ligth text-s text-[#6B6B68]">Encuentra actividades accesibles en todo Costa Rica </p>

                    <div className="flex items-center gap-2 border border-gray-400 bg-gray-50 rounded-4xl px-3 py-1.5 w-80 h-10">
                        <Search size={14} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar actividades..."
                            className="text-sm outline-none w-full text-gray-700 placeholder-gray-400"
                        />
                    </div>
                </div>
            </Box>
        </Theme >

    )

}