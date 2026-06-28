import React, { useState, useEffect } from "react";
import { Theme, Box, Flex } from "@radix-ui/themes";
import { Navbar } from "../components/NavBar";
import { Cards } from "../components/Card";
import { CardProps } from "../components/Card";
import { tokenStorage } from "../utils/token"; 

export default function KeepDisplay() {
    const [savedPlaces, setSavedPlaces] = useState<CardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    
    const userRaw = tokenStorage.getUser();
    const currentUserId = userRaw ? JSON.parse(userRaw).id : null;

    useEffect(() => {
        if (!currentUserId) {
            setLoading(false);
            return;
        }

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
                        const formattedCards = result.data.map((place: any) => ({
                            id: place.id,
                            title: place.title,
                            description: place.description,
                            imageSrc: place.imageSrc, 
                            category: place.category,
                            distance: place.distance,
                            rating: place.rating,
                            ubication: place.location,
                            accessibility: place.accessibility,
                            price: place.price,
                            schedule: place.scheduled,
                            reservation: place.reservation,
                            maxGroup: place.maxGroup
                        }));

                        setSavedPlaces(formattedCards);
                    }
                }
            } catch (error) {
                console.error("Error al traer las actividades guardadas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedPlaces();
    }, [currentUserId]);

    return (
        <Theme>
            <Navbar />
            <Box p="6" style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
                <div className="pb-3">
                    <h1 className="font-semibold text-lg"> Actividades guardadas </h1>
                    <p className="text-gray-600">Tus destinos favoritos para explorar Costa Rica de manera accesible </p>
                </div>

                {loading ? (
                    <p className="text-gray-500 text-sm mt-4">Cargando tus actividades favoritas...</p>
                ) : savedPlaces.length === 0 ? (
                    <p className="text-gray-500 text-sm mt-4">No tienes actividades guardadas todavía.</p>
                ) : (
                    <Flex direction="column" gap="4">
                        {savedPlaces.map(place => (
                            <Cards key={place.id} horizontal={true} {...place} />
                        ))}
                    </Flex>
                )}
            </Box>
        </Theme>
    );
}