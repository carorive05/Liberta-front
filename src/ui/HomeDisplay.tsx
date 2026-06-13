import React from "react";

import { Theme } from "@radix-ui/themes";
import { Box, Flex } from "@radix-ui/themes";
import { Cards } from "../components/Card";
import { Navbar } from "../components/NavBar";

export default function HomeDisplay() {
    return (
        <Theme>
            <Navbar />

            <section className="bg-[#085041] px-10 h-20 text-white p-2 flex justify-between">
                <div>
                    <h1 className="font-semibold">Descubre Costa Rica de forma accesible</h1>
                    <p className="font-light">Encuentra actividades turisticas verificadas para personas con discapacidad visual, motora y auditiva</p>
                </div>

                <div className="flex p-2">
                    <div className="pl-2 ">
                        <p>340+</p>
                        <p>actividades</p>
                    </div>

                    <div className="pl-2 ">
                        <p>7</p>
                        <p>provincias</p>
                    </div>

                    <div className="pl-2 ">
                        <p>3</p>
                        <p>tipos de accesibilidad</p>
                    </div>
                </div>

            </section>

            <Box p="4" style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
                <Flex direction="column" gap="4">
                    <Cards
                        imageSrc="https://images.pexels.com/photos/37001452/pexels-photo-37001452.jpeg"
                        title="Parque Nacional Volcán Poás"
                        category="Naturaleza"
                        distance={12.5}
                        price={15000}
                        rating={4.5}
                        horizontal={false}
                        accesibility={{
                            visual: "high",
                            motor: "medium",
                            auditory: "low",
                        }}
                    />

                    <Cards
                        imageSrc="https://images.pexels.com/photos/37001452/pexels-photo-37001452.jpeg"
                        title="Playa Manuel Antonio"
                        category="Naturaleza"
                        distance={150}
                        price={12000}
                        rating={3.5}
                        horizontal={true}
                        accesibility={{
                            visual: "high",
                            motor: "medium",
                            auditory: "low",
                        }}
                    />
                </Flex>
            </Box>
        </Theme>
    )
}