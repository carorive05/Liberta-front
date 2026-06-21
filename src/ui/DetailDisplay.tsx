import React from "react";

import { Link, MoveLeft } from "lucide-react";
import { Theme } from "@radix-ui/themes";
import { Box, Flex, Grid } from "@radix-ui/themes";

import { Navbar } from "../components/NavBar";
import ActivityTop from "../components/ActivityTop";
import ActivityInfo from "../components/ActivityInfo";
import RatingsReviews, { Review, RatingDistribution } from "../components/RatingsReviews";

import { useLocation, useNavigate } from "react-router-dom";
import { CardProps } from "../components/Card";


const DISTRIBUTION: RatingDistribution[] = [
    { stars: 5, percentage: 68 },
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
                        imageSrc={card.imageSrc}
                        title={card.title}
                        category={card.category}
                        distance={card.distance}
                        rating={card.rating}
                        ubication={card.ubication ?? "Costa Rica"}
                        accesibility={card.accesibility}
                        onSave={() => console.log("Guardado")}
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

    )

}