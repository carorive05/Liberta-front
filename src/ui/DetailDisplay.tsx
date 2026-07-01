import React, { useState, useEffect } from "react";

import { Link, MoveLeft } from "lucide-react";
import { Theme } from "@radix-ui/themes";
import { Box, Flex, Grid } from "@radix-ui/themes";

import { Navbar } from "../components/NavBar";
import ActivityTop from "../components/ActivityTop";
import ActivityInfo from "../components/ActivityInfo";
import RatingsReviews, { Review, RatingDistribution } from "../components/RatingsReviews";

import { useLocation, useNavigate } from "react-router-dom";
import { CardProps } from "../components/Card";
import { tokenStorage } from "../utils/token"; // Asegúrate de que esta ruta a tus utils sea la correcta

const DISTRIBUTION: RatingDistribution[] = [
    { stars: 5, percentage: 50 },
    { stars: 4, percentage: 21 },
    { stars: 3, percentage: 8 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 0 },
];

const REVIEWS: Review[] = [
    {
        id: 1,
        name: "María González",
        badge: "Usuaria con discapacidad auditiva",
        avatarColor: "#6fa89a",
        rating: 5,
        timeAgo: "Hace 2 semanas",
        body: "Excelente experiencia. El guía dominaba LESCO y pudo explicarnos todo el recorrido con claridad. Las indicaciones visuales en el sendero son muy claras y nos sentimos completamente incluidos en la actividad.",
    },
    {
        id: 2,
        name: "Carlos Ramírez",
        badge: "Usuario con discapacidad motora",
        avatarColor: "#8a9fc2",
        rating: 5,
        timeAgo: "Hace 1 mes",
        body: "Las rampas y accesos están en perfecto estado. El personal fue muy atento y nos facilitaron todo lo necesario. La silla anfibia funcionó de maravilla. Definitivamente volveremos.",
    },
];

export default function DetailDisplay() {
    const { state } = useLocation();
    const card = state as CardProps;
    const navigate = useNavigate();

    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // Obtener datos del usuario logueado
    const userRaw = tokenStorage.getUser();
    const currentUserId = userRaw ? JSON.parse(userRaw).id : null;

    // Verificar si esta actividad específica ya fue guardada por el usuario al cargar la página
    useEffect(() => {
        if (!currentUserId || !card?.id) return;

        const checkSavedStatus = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/places/saved/${currentUserId}/${card.id}`, {
                    headers: {
                        "Authorization": `Bearer ${tokenStorage.getToken()}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setIsSaved(data.isSaved); 
                }
            } catch (error) {
                console.error("Error validando estado de guardado:", error);
            }
        };

        checkSavedStatus();
    }, [currentUserId, card?.id]);

    // Manejador para guardar / eliminar de favoritos
    const handleSaveToggle = async () => {
        if (!currentUserId) {
            alert("Debes iniciar sesión para guardar actividades en Liberta.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/places/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenStorage.getToken()}`
                },
                body: JSON.stringify({
                    userId: String(currentUserId),
                    activityId: String(card.id),
                }),
            });

            if (response.ok) {
                setIsSaved(!isSaved);
            } else {
                console.error("Error al procesar la solicitud en el servidor");
            }
        } catch (error) {
            console.error("Error de red al intentar guardar:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Theme>
            <Navbar />
            <Box p="6" style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
                <section className="border-b-2 border-gray-200 justify-end">
                    <div
                        className="flex justify-end items-center gap-2 cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                        <MoveLeft color="#1D9E75" />
                        <p className="font-light text-[#085041] text-sm">
                            Volver a todos los resultados
                        </p>
                    </div>
                </section>

                <div className="max-w-2xl mx-auto">
                   
                    <ActivityTop
                        id={card.id}
                        imageSrc={card.imageSrc}
                        title={card.title}
                        category={card.category}
                        distance={card.distance}
                        rating={card.rating}
                        ubication={card.ubication ?? "Costa Rica"}
                        accesibility={card.accessibility}
                        isSaved={isSaved}
                        loading={loading}
                        onSave={handleSaveToggle}
                    />

                    <ActivityInfo
                        description={card.description}
                        price={card.price}
                        schedule={card.schedule}
                        reservation={card.reservation}
                        maxGroup={card.maxGroup}
                    />

                    <div className="p-3 mt-2">
                        <RatingsReviews
                            averageRating={card.rating}
                            totalLabel="Basado en reseñas"
                            distribution={DISTRIBUTION}
                            reviews={REVIEWS}
                            viewAllLabel={`Ver todas las reseñas (${REVIEWS.length})`}
                            onViewAll={() => console.log("Ver todas")}
                        />
                    </div>
                </div>
            </Box>
        </Theme>
    );
}