import React from "react";

import { Theme, Box, Flex } from "@radix-ui/themes";

import { Navbar } from "../components/NavBar";
import { Cards } from "../components/Card";
import { CardProps } from "../components/Card";

const cards: CardProps[] = [
    {
        id: 1,
        imageSrc: "https://images.pexels.com/photos/37001452/pexels-photo-37001452.jpeg",
        title: "Parque Nacional Volcán Poás",
        category: "Naturaleza",
        distance: 12.5,
        price: 15000,
        rating: 4.5,
        //horizontal: false,
        ubication: "Alajuela",
        description: "El Volcán Poás es uno de los volcanes más activos de Costa Rica. Su cráter principal alberga un lago de aguas ácidas único en el mundo, rodeado de una vegetación exuberante.",
        schedule: "8:00 am – 3:30 pm",
        reservation: "Con anticipación",
        maxGroup: 15,
        accesibility: { visual: "high", motor: "medium", auditory: "low" }
    },
    {
        id: 2,
        imageSrc: "https://images.pexels.com/photos/37001452/pexels-photo-37001452.jpeg",
        title: "Playa Manuel Antonio",
        category: "Naturaleza",
        distance: 150,
        price: 12000,
        rating: 3.5,
        //horizontal: false,
        ubication: "Alajuela",
        description: "El Volcán Poás es uno de los volcanes más activos de Costa Rica. Su cráter principal alberga un lago de aguas ácidas único en el mundo, rodeado de una vegetación exuberante.",
        schedule: "8:00 am – 3:30 pm",
        reservation: "Con anticipación",
        maxGroup: 15,
        accesibility: { visual: "high", motor: "medium", auditory: "low" }
    },
    {
        id: 3,
        imageSrc: "https://images.pexels.com/photos/37001452/pexels-photo-37001452.jpeg",
        title: "Parque Nacional Volcán Rincon de la vieja",
        category: "Naturaleza",
        distance: 250,
        price: 2000,
        rating: 4.5,
        //horizontal: false,
        ubication: "Alajuela",
        description: "El Volcán Poás es uno de los volcanes más activos de Costa Rica. Su cráter principal alberga un lago de aguas ácidas único en el mundo, rodeado de una vegetación exuberante.",
        schedule: "8:00 am – 3:30 pm",
        reservation: "Con anticipación",
        maxGroup: 15,
        accesibility: { visual: "high", motor: "high", auditory: "low" }
    },
    {
        id: 4,
        imageSrc: "https://images.pexels.com/photos/37001452/pexels-photo-37001452.jpeg",
        title: "Playa Calzon de pobre",
        category: "Naturaleza",
        distance: 150,
        price: 10000,
        rating: 2.5,
        //horizontal: false,
        ubication: "Alajuela",
        description: "El Volcán Poás es uno de los volcanes más activos de Costa Rica. Su cráter principal alberga un lago de aguas ácidas único en el mundo, rodeado de una vegetación exuberante.",
        schedule: "8:00 am – 3:30 pm",
        reservation: "Con anticipación",
        maxGroup: 15,
        accesibility: { visual: "low", motor: "low", auditory: "low" }
    },
];

export default function KeepDisplay() {
    return (
        <Theme>
            <Navbar />
            <Box p="6" style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
                <div className="pb-3">
                    <h1 className="font-semibold text-lg"> Actividades guardadas </h1>
                    <p className="text-gray-600">Tus destinos favoritos para explorar Costa Rica de manera accesible </p>
                </div>

                {/*
<Grid columns="1" gap="4">
  {cards.map(card => (
    <Cards key={card.id} horizontal={true} {...card} />
  ))}
</Grid>
*/}
                <Flex direction="column" gap="4">
                    {cards.map(card => (
                        <Cards key={card.id} horizontal={true} {...card} />
                    ))}
                </Flex>
            </Box>

        </Theme>

    )

}