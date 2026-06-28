// HomeDisplay.tsx
import React, { useState, useEffect } from "react";

import { Theme } from "@radix-ui/themes";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { List, LayoutGrid } from 'lucide-react';

import { Cards } from "../components/Card";
import { CardProps } from "../components/Card";
import { Navbar } from "../components/NavBar";

type FilterName = "visual" | "motor" | "auditory";
type AccessLevel = "full" | "partial" | "none";

export default function HomeDisplay() {
    const [isGrid, setIsGrid] = useState(true);
    
    // 1. Estados para manejar los datos del backend, la carga y posibles errores
    const [activities, setActivities] = useState<CardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 2. useEffect para consumir el endpoint del backend al montar el componente
   useEffect(() => {
    const fetchActivities = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:3000/api/places"); 
            
            if (!response.ok) {
                throw new Error("Error al obtener las actividades del servidor");
            }
            
            const json = await response.json();
            const fetchedData = json.data || [];

            // 1. Mapeo inicial de los datos recibidos del backend
            const mappedActivities: CardProps[] = fetchedData.map((item: any) => ({
                id: item.id,
                imageSrc: item.imageSrc || item.image_src,
                title: item.title,
                category: item.category,
                distance: Number(item.distance),
                price: Number(item.price),
                rating: Number(item.rating),
                ubication: item.ubication || item.location,
                description: item.description,
                schedule: item.schedule,
                reservation: item.reservation,
                maxGroup: item.maxGroup || item.max_group,
                accessibility: item.accessibility
            }));

            // 2. Algoritmo de mezcla (Fisher-Yates) para aleatorizar el arreglo completo
            const shuffled = [...mappedActivities];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }

            // 3. Tomar únicamente los primeros 8 elementos del arreglo mezclado
            const randomSix = shuffled.slice(0, 6);

            setActivities(randomSix);
        } catch (err: any) {
            setError(err.message || "Hubo un problema de conexión.");
        } finally {
            setLoading(false);
        }
    };

    fetchActivities();
}, []);

    return (
        <Theme>
            <Navbar />

            <section className="bg-[#085041] px-10 h-20 text-white p-3 flex justify-between">
                <div>
                    <h1 className="font-semibold">Descubre Costa Rica de forma accesible</h1>
                    <p className="font-light">Encuentra actividades turísticas verificadas para personas con discapacidad visual, motora y auditiva</p>
                </div>

                <div className="flex p-2 text-center">
                    <div className="pl-2">
                        <p>{activities.length}+</p>
                        <p className="font-light text-xs">Actividades</p>
                    </div>
                    <div className="pl-2">
                        <p>7</p>
                        <p className="font-light text-xs">Provincias</p>
                    </div>
                    <div className="pl-2">
                        <p>3</p>
                        <p className="font-light text-xs">Accesibilidades</p>
                    </div>
                </div>
            </section>

            <section>
                <Box p="4" style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
                    <Flex gap="6" style={{ alignItems: "flex-start" }}>
                        <div className="w-full">
                            <div className="flex justify-between p-2 pb-4">
                                <div className="text-[#6B6B68]">
                                    <p>{activities.length} lugares disponibles</p>
                                </div>

                                <div className="flex justify-between gap-2">
                                    <LayoutGrid
                                        className={`border-2 cursor-pointer p-0.5 ${isGrid ? "bg-[#E1F5EE] border-[#1D9E75]" : "bg-white border-gray-200"}`}
                                        color="#1D9E75"
                                        onClick={() => setIsGrid(true)}
                                    />
                                    <List
                                        className={`border-2 cursor-pointer p-0.5 ${!isGrid ? "bg-[#E1F5EE] border-[#1D9E75]" : "bg-white border-gray-200"}`}
                                        color="#1D9E75"
                                        onClick={() => setIsGrid(false)}
                                    />
                                </div>
                            </div>

                            {/* 4. Renderizado condicional según el estado de la petición */}
                            {loading && (
                                <div className="text-center py-10 text-gray-500">Cargando actividades accesibles...</div>
                            )}

                            {error && (
                                <div className="text-center py-10 text-red-600 bg-red-50 rounded-lg p-4 border border-red-200">
                                    {error}
                                </div>
                            )}

                            {!loading && !error && activities.length === 0 && (
                                <div className="text-center py-10 text-gray-500">No se encontraron actividades disponibles.</div>
                            )}

                            {!loading && !error && (
                                <Grid columns={isGrid ? "2" : "1"} gap="4">
                                    {activities.map(card => (
                                        <Cards key={card.id} horizontal={!isGrid} {...card} />
                                    ))}
                                </Grid>
                            )}
                        </div>
                    </Flex>
                </Box>
            </section>
        </Theme>
    );
}