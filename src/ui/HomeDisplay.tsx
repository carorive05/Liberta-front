import React from "react";

import { Theme } from "@radix-ui/themes";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { List, LayoutGrid } from 'lucide-react';

import { Cards } from "../components/Card";
import { CardProps } from "../components/Card";
import { Navbar } from "../components/NavBar";

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

export default function HomeDisplay() {
    return (
        <Theme>
            <Navbar />

            <section className="bg-[#085041] px-10 h-20 text-white p-3 flex justify-between">
                <div>
                    <h1 className="font-semibold">Descubre Costa Rica de forma accesible</h1>
                    <p className="font-light">Encuentra actividades turisticas verificadas para personas con discapacidad visual, motora y auditiva</p>
                </div>

                <div className="flex p-2 text-center">
                    <div className="pl-2 ">
                        <p>340+</p>
                        <p className="font-light text-s"> Actividades</p>
                    </div>

                    <div className="pl-2 ">
                        <p>7</p>
                        <p className="font-light text-s">Provincias</p>
                    </div>

                    <div className="pl-2 ">
                        <p>3</p>
                        <p className="font-light text-s">Tipos de accesibilidad</p>
                    </div>
                </div>

            </section>

            <section>
                <Box p="4" style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>

                    <div className="flex justify-between p-2 pb-4">
                        <div>
                            <p>47 lugares cerca de San Jose </p>
                        </div>

                        <div className="flex justify-between gap-2">
                            <LayoutGrid className="border-2 border-gray-300 bg-gray-300 " color="#1D9E75" />

                            <List color="#1D9E75" />
                        </div>
                    </div>


                    <Grid columns="2" gap="4">
                        {cards.map(card => (
                            <Cards key={card.id} horizontal={false} {...card} />

                        ))}
                    </Grid>



                </Box>
            </section>

        </Theme>
    )
}